
import Vue from 'vue'
import { data } from '~/state'
import {
	CAREER_COST,
	CHARACTERISTIC_MAX,
	CHARACTERISTIC_MIN,
	CHARACTERISTIC_START,
	HERITAGE_DIVINE,
	HERITAGE_MORTAL,
	SKILL_MAX,
	SKILL_MIN,
	SKILL_STARTING_MAX,
	SKILLS_PER_CP,
	STARTING_CREATION_POINTS,
	ATTR_GLORY,
	ATTR_ENDURANCE,
	ATTR_STANDING,
} from '~/utils/config'
import { sum } from '~/utils/list'
import { notNull } from '~/utils/assert'
import { findByProperty } from 'we-ui/utils/list'

let dataManager = data()


export default Vue.component('character-creator', {
	render() {
		return null
	},

	data() {
		return {
			character: null,
		}
	},

	computed: {
		cp() {
			let cp = STARTING_CREATION_POINTS

			if(!this.character) return cp

			const map = {
				'heritage' : 'heritages',
				'background' : 'backgrounds',
				'characteristicPackage' : 'characteristics',
				'advantages' : 'advantages',
			}

			Object.keys(map).forEach(key => {
				if(notNull(this.character[key])) {
					if(Array.isArray(this.character[key])) {
						cp -= this.character[key].map(a => a.cost).reduce(sum, 0)
					}
					else {
						const obj = dataManager[map[key]].byTitle(this.character[key])

						cp -= obj.cost
					}
				}
			})

			// first career is free, the rest cost 3CP
			cp -= Math.max(0, this.character.careers.length - 1) * CAREER_COST

			//skill increases are 1CP for 3 skill points
			cp -= Math.ceil(this.totalSkillIncreases / SKILLS_PER_CP)

			return cp
		},

		// generate attributes from heritage, background, and advantages
		attributes() {
			const attr = {}

			// add attribute data from heritage
			if(notNull(this.character.heritage)) {
				const heritage = dataManager.heritages.byTitle(this.character.heritage)

				if(notNull(heritage)) {
					attr[ATTR_GLORY] = heritage.glory
					attr[ATTR_ENDURANCE] = heritage.endurance
				}
			}

			// add attribute data from background
			if(notNull(this.character.background)) {
				const background = dataManager.backgrounds.byTitle(this.character.background)

				if(notNull(background)) {
					attr[ATTR_STANDING] = background.standing
				}
			}

			// add attribute data from any advantages that have them
			this.character.advantages.forEach(adv => {
				// add attribute info if set
				if('attributes' in adv) {
					Object.keys(adv.attributes).forEach(key => {
						if(!(key in attr)) {
							attr[key] = 0
						}

						attr[key] += adv.attributes[key]
					})
				}
			})

			return attr
		},

		totalSkillIncreases() {
			if(!this.character) return 0

			return Object.values(this.character.skillIncreases || {}).reduce(sum, 0)
		},

		// heritage
		hasDivineHeritage() {
			return this.character && this.character.heritage === HERITAGE_DIVINE
		},

		hasMortalHeritage() {
			return this.character && this.character.heritage === HERITAGE_MORTAL
		},

		hasSelectedCareer() {
			return this.character.careers.length > 0
		},

		canAffordNewCareer() {
			return !this.hasSelectedCareer || this.cp >= CAREER_COST
		},

		currentEncumbrance() {
			if(!this.character) return 0

			return this.character.equipment.map(({ weight }) => weight || 0).reduce(sum, 0)
		},

		totalEncumbrance() {
			if(!this.character) return 0

			return this.character.characteristics.Might + 2
		},
	},

	methods: {
		// characteristics
		removeCharacteristics(characteristics) {
			characteristics.forEach(ch => {
				if(ch in this.character.characteristics) {
					this.character.characteristics[ch] = Math.max(this.character.characteristics[ch] - 1, CHARACTERISTIC_MIN)
				}
			})	
		},

		addCharacteristics(characteristics) {
			characteristics.forEach(ch => {
				if(ch in this.character.characteristics) {
					this.character.characteristics[ch] = Math.min(this.character.characteristics[ch] + 1, CHARACTERISTIC_MAX)
				}
			})	
		},

		// reset characteristics to minimum value
		removeCharacteristicPackage(chpack) {
			Object.keys(this.character.characteristics).forEach(ch => this.character.characteristics[ch] = CHARACTERISTIC_MIN)
		},

		// reset characteristics to starting values
		addCharacteristicPackage(chpack) {
			Object.keys(this.character.characteristics).forEach(ch => this.character.characteristics[ch] = CHARACTERISTIC_START)
		},

		// skills
		removeSkills(skills) {
			skills.forEach(skill => {
				if(skill in this.character.skills) {
					this.character.skills[skill] = Math.max(this.character.skills[skill] - 1, SKILL_MIN)
				}
			})
		},

		// TODO this needs to check for any advantages which modify the skill cap
		addSkills(skills) {
			skills.forEach(skill => {
				if(skill in this.character.skills) {
					this.character.skills[skill] = Math.min(this.character.skills[skill] + 1, SKILL_MAX)
				}
			})	
		},

		increaseSkill(skill) {
			if(this.canIncreaseSkill(skill)) {
				this.character.skillIncreases[skill]++
			}
		},

		reduceSkill(skill) {
			if(this.canReduceSkill(skill)) {
				this.character.skillIncreases[skill]--
			}
		},

		// TODO needs to account for advantages which increase the skill cap for
		// certain skills
		canIncreaseSkill(skill) {
			if(this.cp === 0 && this.totalSkillIncreases % SKILLS_PER_CP === 0) {
				return false
			}

			return (this.character.skills[skill] + this.character.skillIncreases[skill]) < SKILL_STARTING_MAX
		},

		canReduceSkill(skill) {
			return this.character && this.character.skillIncreases[skill] > 0
		},

		setHeritage(heritage) {
			// the character has divine heritage and a selected parent, so remove it
			if(this.hasDivineHeritage && notNull(this.character.parent)) {
				const parent = dataManager.divinities.byTitle(this.character.parent)

				this.setParent(parent)
			}

			this.character.heritage = heritage.title
		},

		setParent(parent) {
			if(notNull(this.character.parent)) {
				const current = dataManager.divinities.byTitle(this.character.parent)

				if(current) {
					this.removeSkills(current.skills)
				}
			}

			this.character.parent = parent.title

			if(notNull(this.character.parent)) {
				this.addSkills(parent.skills)
			}
		},

		// backgrounds
		setBackground(background) {
			if(notNull(this.character.background)) {
				const obj = dataManager.backgrounds.byTitle(this.character.background)

				this.removeSkills(obj.skills)
			}

			this.character.background = background.title
			this.addSkills(background.skills)
		},

		// advantages
		addAdvantage(advantage) {
			this.character.advantages = [...this.character.advantages, { ...advantage }]

			if('skills' in advantage) {
				this.addSkills(advantage.skills)
			}
		},

		removeAdvantage(advantage) {
			this.character.advantages = [ ...this.character.advantages.filter(adv => adv.title !== advantage.title) ]

			if('skills' in advantage) {
				this.removeSkills(advantage.skills)
			}
		},

		hasAdvantage(title) {
			return this.character.advantages.map(adv => adv.title).includes(title)
		},

		// careers
		addCareer(career) {
			this.character.careers = [ ...this.character.careers, {
				title: career.title,
				chosenSpec: null,
			}]
			this.addSkills(career.skills)
		},

		removeCareer(career) {
			this.character.careers = [ ...this.character.careers.filter(cr => cr.title !== career.title) ]
			
			this.removeSkills(career.skills)
		},

		hasCareer(title) {
			return this.character.careers.map(career => career.title).includes(title)
		},

		// equipment
		hasEquipmentItem(title) {
			return this.character && this.character.equipment.find(findByProperty('title', title)) !== undefined
		},

		addEquipmentItem(item) {
			this.character.equipment = [...this.character.equipment, item]
		},

		removeEquipmentItem(item) {
			this.character.equipment = [...this.character.equipment.filter(({ title }) => title !== item.title)]
		},
	}
})
