
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
} from '~/utils/config'

let character = null
let dataManager = data()

export default {
	get character() {
		return character
	},

	set character(ch) {
		character = ch
	},

	get cp() {
		let cp = STARTING_CREATION_POINTS

		if(!character) return cp

		const map = {
			'heritage' : 'heritages',
			'background' : 'backgrounds',
			'characteristicPackage' : 'characteristics',
			'advantages' : 'advantages',
		}

		Object.keys(map).forEach(key => {
			if(character[key] !== null) {
				if(Array.isArray(character[key])) {
					// TODO advantages
				}
				else {
					const obj = dataManager[map[key]].byTitle(character[key])

					cp -= obj.cost
				}
			}
		})



//skillIncreases
//careers


		return cp
	},

	// characteristics
	removeCharacteristics(characteristics) {
		characteristics.forEach(ch => {
			if(ch in character.characteristics) {
				character.characteristics[ch] = Math.max(character.characteristics[ch] - 1, CHARACTERISTIC_MIN)
			}
		})	
	},

	addCharacteristics(characteristics) {
		characteristics.forEach(ch => {
			if(ch in character.characteristics) {
				character.characteristics[ch] = Math.min(character.characteristics[ch] + 1, CHARACTERISTIC_MAX)
			}
		})	
	},

	removeCharacteristicPackage(chpack) {
		// reset characteristics to minimum value
		Object.keys(character.characteristics).forEach(ch => character.characteristics[ch] = CHARACTERISTIC_MIN)
	},

	addCharacteristicPackage(chpack) {
		// reset characteristics to starting values
		Object.keys(character.characteristics).forEach(ch => character.characteristics[ch] = CHARACTERISTIC_START)
	},

	// skills
	removeSkills(skills) {
		skills.forEach(skill => {
			if(skill in character.skills) {
				character.skills[skill] = Math.max(character.skills[skill] - 1, SKILL_MIN)
			}
		})
	},

	addSkills(skills) {
		skills.forEach(skill => {
			if(skill in character.skills) {
				character.skills[skill] = Math.min(character.skills[skill] + 1, SKILL_MAX)
			}
		})	
	},

	increaseSkill(skill) {
		if(this.canIncreaseSkill(skill)) {
			character.skillIncreases[skill]++

			/*if(this.skillIncreases % SKILLS_PER_CP === 1) {
				character.cp -= 1
			}*/
		}
	},

	reduceSkill(skill) {
		if(this.canReduceSkill(skill)) {
			character.skillIncreases[skill]--

			/*if(this.skillIncreases % SKILLS_PER_CP === 0) {
				character.cp += 1
			}*/
		}
	},

	canIncreaseSkill(skill) {
		if(character.cp - 1 < 0 && this.skillIncreases % SKILLS_PER_CP === 0) {
			return false
		}

		return (character.skills[skill] + character.skillIncreases[skill]) < SKILL_STARTING_MAX
	},

	canReduceSkill(skill) {
		return character && character.skillIncreases[skill] > 0
	},

	// heritage
	get hasDivineHeritage() {
		return character && character.heritage === HERITAGE_DIVINE
	},

	get hasMortalHeritage() {
		return character && character.heritage === HERITAGE_MORTAL
	},

	setHeritage(heritage) {
		// if heritage is null do nothing
		// if heritage doesn't equal current heritage, remove the old heritage

		// the character has divine heritage and a selected parent, so remove it
		if(this.hasDivineHeritage && character.parent !== null) {
			const parent = dataManager.divinities.byTitle(character.parent)

			this.removeParent(parent)
		}

		character.heritage = heritage.title
	},

	removeParent(parent) {
		character.parent = null
		this.removeSkills(parent.skills)
	},

	addParent(parent) {
		character.parent = parent.title
		this.addSkills(parent.skills)
	},

	// backgrounds
	setBackground(background) {
		if(character.background !== null) {
			const obj = dataManager.backgrounds.byTitle(character.background)

			this.removeSkills(obj.skills)
		}

		character.background = background.title
		this.addSkills(background.skills)
	},

	// advantages
	addAdvantage(advantage) {
		character.advantages = [ ...character.advantages, {
			title: advantage.title,
		}]
	},

	removeAdvantage(advantage) {
		character.advantages = [ ...character.advantages.filter(adv => adv.title !== advantage.title) ]
	},

	hasAdvantage(title) {
		return character.advantages.map(adv => adv.title).includes(title)
	},

	// careers
	get hasSelectedCareer() {
		return character.careers.length > 0
	},

	get canAffordNewCareer() {
		return this.cp >= CAREER_COST
	},

	addCareer(career) {
		character.careers = [ ...character.careers, {
			title: career.title,
			chosenSpec: null,
		}]
		this.addSkills(career.skills)
	},

	removeCareer(career) {
		character.careers = [ ...character.careers.filter(cr => cr.title !== career.title) ]
		
		this.removeSkills(career.skills)
	},

	hasCareer(title) {
		return character.careers.map(career => career.title).includes(title)
	},

	// equipment
	get currentEncumbrance() {
		if(!character) return 0

		return character.equipment.map(({ weight }) => weight).reduce(sum, 0)
	},

	get totalEncumbrance() {
		if(!character) return 0

		return character.characteristics.Might + 2
	},

	hasEquipmentItem(title) {
		return character.equipment.find(findByProperty('title', title)) !== undefined
	},

	addEquipmentItem(item) {
		character.equipment = [...character.equipment, item]
	},

	removeEquipmentItem(item) {
		character.equipment = [...character.equipment.filter(({ title }) => title !== item.title)]
	},
}
