
import {
	SKILL_MIN,
	SKILL_MAX,
	CHARACTERISTIC_MIN,
	CHARACTERISTIC_MAX,
	HERITAGE_DIVINE,
	HERITAGE_MORTAL,
} from '~/utils/config'

import { 
	removeSkills,
	addSkills,
	removeCharacteristics,
	addCharacteristics,
	hasDivineHeritage,
} from '~/utils/character'

describe('utils/character', () => {
	let character

	beforeEach(() => {
		character = {
			skills: {
				SkillAtMin: SKILL_MIN,
				SkillAtOne: 1,
				SkillAtTwo: 2,
				SkillAtMax: SKILL_MAX,
			},
			characteristics: {
				ChAtMin: CHARACTERISTIC_MIN,
				ChAtTwo: 2,
				ChAtMax: CHARACTERISTIC_MAX,
			},
		}
	})

	describe('removeSkills', () => {
		it('reduces a skill by 1', () => {
			removeSkills(['SkillAtTwo'], character)

			expect(character.skills.SkillAtTwo).toEqual(1)
		})

		it('doesn\'t reduce a skill below minimum starting value', () => {
			removeSkills(['SkillAtMin'], character)

			expect(character.skills.SkillAtMin).toEqual(SKILL_MIN)
		})

		it('only reduces the affected skill', () => {
			removeSkills(['SkillAtTwo'], character)

			expect(character.skills.SkillAtOne).toEqual(1)
		})

		it('reduces multiple skills', () => {
			removeSkills(['SkillAtOne', 'SkillAtTwo'], character)

			expect(character.skills.SkillAtOne).toEqual(0)
			expect(character.skills.SkillAtTwo).toEqual(1)
		})

		it('doesn\'t create a new skill', () => {
			removeSkills(['UnknownSkill'], character)

			expect(character.skills.UnknownSkill).toBe(undefined)
		})
	})

	describe('addSkills', () => {
		it('increases a skill by 1', () => {
			addSkills(['SkillAtOne'], character)

			expect(character.skills.SkillAtOne).toEqual(2)
		})

		it('doesn\'t increase a skill above maximum value', () => {
			addSkills(['SkillAtMax'], character)

			expect(character.skills.SkillAtMax).toEqual(SKILL_MAX)
		})

		it('only increases the affected skill', () => {
			addSkills(['SkillAtTwo'], character)

			expect(character.skills.SkillAtOne).toEqual(1)
		})

		it('increase multiple skills', () => {
			addSkills(['SkillAtOne', 'SkillAtTwo'], character)

			expect(character.skills.SkillAtOne).toEqual(2)
			expect(character.skills.SkillAtTwo).toEqual(3)
		})

		it('doesn\'t create a new skill', () => {
			addSkills(['UnknownSkill'], character)

			expect(character.skills.UnknownSkill).toBe(undefined)
		})
	})

	describe('removeCharacteristics', () => {
		it('reduces a characteristic by 1', () => {
			removeCharacteristics(['ChAtTwo'], character)

			expect(character.characteristics.ChAtTwo).toEqual(1)
		})

		it('doesn\'t reduce a characteristic below minimum starting value', () => {
			removeCharacteristics(['ChAtMin'], character)

			expect(character.characteristics.ChAtMin).toEqual(CHARACTERISTIC_MIN)
		})

		it('only reduces the affected characteristic', () => {
			removeCharacteristics(['ChAtMax'], character)

			expect(character.characteristics.ChAtTwo).toEqual(2)
		})

		it('reduces multiple characteristics', () => {
			removeCharacteristics(['ChAtMax', 'ChAtTwo'], character)

			expect(character.characteristics.ChAtMax).toEqual(4)
			expect(character.characteristics.ChAtTwo).toEqual(1)
		})

		it('doesn\'t create a new characterstic', () => {
			removeCharacteristics(['UnknownCh'], character)

			expect(character.characteristics.UnknownCh).toBe(undefined)
		})
	})

	describe('addCharacteristics', () => {
		it('increases a characteristic by 1', () => {
			addCharacteristics(['ChAtTwo'], character)

			expect(character.characteristics.ChAtTwo).toEqual(3)
		})

		it('doesn\'t increase a characteristic above maximum value', () => {
			addCharacteristics(['ChAtMax'], character)

			expect(character.characteristics.ChAtMax).toEqual(CHARACTERISTIC_MAX)
		})

		it('only increases the affected characteristic', () => {
			addCharacteristics(['ChAtTwo'], character)

			expect(character.characteristics.ChAtMax).toEqual(5)
		})

		it('increase multiple characteristics', () => {
			addCharacteristics(['ChAtMin', 'ChAtTwo'], character)

			expect(character.characteristics.ChAtMin).toEqual(2)
			expect(character.characteristics.ChAtTwo).toEqual(3)
		})

		it('doesn\'t create a new characterstic', () => {
			addCharacteristics(['UnknownCh'], character)

			expect(character.characteristics.UnknownCh).toBe(undefined)
		})
	})

	describe('hasDivineHeritage', () => {
		it('returns true if the character has divine heritage', () => {
			const result = hasDivineHeritage({ heritage: HERITAGE_DIVINE })

			expect(result).toBe(true)
		})

		it('returns false if the character has mortal heritage', () => {
			const result = hasDivineHeritage({ heritage: HERITAGE_MORTAL })

			expect(result).toBe(false)
		})
	})
})
