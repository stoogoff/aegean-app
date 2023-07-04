
import {
	SKILL_MAX,
	SKILL_MIN,
	CHARACTERISTIC_MIN,
	CHARACTERISTIC_MAX,
	HERITAGE_DIVINE
} from '~/utils/config'

export const removeSkills = (skills, character) => {
	skills.forEach(skill => {
		if(skill in character.skills) {
			character.skills[skill] = Math.max(character.skills[skill] - 1, SKILL_MIN)
		}
	})
}

export const addSkills = (skills, character) => {
	skills.forEach(skill => {
		if(skill in character.skills) {
			character.skills[skill] = Math.min(character.skills[skill] + 1, SKILL_MAX)
		}
	})	
}

export const removeCharacteristics = (characteristics, character) => {
	characteristics.forEach(ch => {
		if(ch in character.characteristics) {
			character.characteristics[ch] = Math.max(character.characteristics[ch] - 1, CHARACTERISTIC_MIN)
		}
	})	
}

export const addCharacteristics = (characteristics, character) => {
	characteristics.forEach(ch => {
		if(ch in character.characteristics) {
			character.characteristics[ch] = Math.min(character.characteristics[ch] + 1, CHARACTERISTIC_MAX)
		}
	})	
}


export const hasDivineHeritage = (character) => character && character.heritage === HERITAGE_DIVINE
