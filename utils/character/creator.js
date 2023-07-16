
import {
	SKILL_MAX,
	SKILL_MIN,
	CHARACTERISTIC_MIN,
	CHARACTERISTIC_MAX,
	HERITAGE_DIVINE,
	HERITAGE_MORTAL,
	CAREER_COST,
	SKILLS_PER_CP,
	SKILL_STARTING_MAX,
	CHARACTERISTIC_START,
} from '~/utils/config'


let character = null

export default {
	get character() {
		return character
	},

	set character(ch) {
		character = ch
	},

	get hasDivineHeritage() {
		return character && character.heritage === HERITAGE_DIVINE
	},

	get hasMortalHeritage() {
		return character && character.heritage === HERITAGE_MORTAL
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
		character.cp += chpack.cost

		// reset characteristics to minimum value
		Object.keys(character.characteristics).forEach(ch => character.characteristics[ch] = CHARACTERISTIC_MIN)
	},

	addCharacteristicPackage(chpack) {
		character.cp -= chpack.cost

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

			if(this.skillIncreases % SKILLS_PER_CP === 1) {
				character.cp -= 1
			}
		}
	},

	reduceSkill(skill) {
		if(this.canReduceSkill(skill)) {
			character.skillIncreases[skill]--

			if(this.skillIncreases % SKILLS_PER_CP === 0) {
				character.cp += 1
			}
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

	// backgrounds
	removeBackground(background) {
		this.removeSkills(background.skills, character)
		character.cp += background.cost
	},

	addBackground(background) {
		this.addSkills(background.skills, character)
		character.cp -= background.cost
	},

	// advantages
	addAdvantage(advantage) {
		character.advantages = [ ...character.advantages, {
			title: advantage.title,
		}]

		character.cp -= advantage.cost
	},

	removeAdvantage(advantage) {
		character.advantages = [ ...character.advantages.filter(adv => adv.title !== advantage.title) ]
		character.cp += advantage.cost
	},

	hasAdvantage(title) {
		return character.advantages.map(adv => adv.title).includes(title)
	},

	// careers
	get hasCareer() {
		return character.careers.length > 0
	},

	get canAffordNewCareer() {
		return character.cp >= CAREER_COST
	},

	addCareer(career) {
		// the character has a career already so subsequent careers cost
		if(character.careers.length > 0) {
			character.cp -= CAREER_COST
		}

		character.careers = [ ...character.careers, {
			title: career.title,
			chosenSpec: null,
		}]
		this.addSkills(career.skills)
	},

	removeCareer(career) {
		if(character.careers.length >= 2) {
			character.cp += CAREER_COST
		}

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
