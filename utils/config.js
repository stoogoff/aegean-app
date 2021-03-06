
export const STORAGE_CHARACTERS = 'characters'
export const STORAGE_FEEDBACK = 'feedback'

export const STAT_MIGHT = 'Might'
export const STAT_REFLEXES = 'Reflexes'
export const STAT_COOL = 'Cool'
export const STAT_INSIGHT = 'Insight'
export const STAT_CUNNING = 'Cunning'

export const CHARACTERISTIC_MIN = 1
export const CHARACTERISTIC_MAX = 5

export const SKILL_MIN = 0
export const SKILL_MAX = 5

export const STARTING_CREATION_POINTS = 15


export const DEFAULT_CHARACTER = {
	cp: STARTING_CREATION_POINTS,
	heritage: null,
	attributes: {
		[STAT_MIGHT]: CHARACTERISTIC_MIN,
		[STAT_REFLEXES]: CHARACTERISTIC_MIN,
		[STAT_COOL]: CHARACTERISTIC_MIN,
		[STAT_INSIGHT]: CHARACTERISTIC_MIN,
		[STAT_CUNNING]: CHARACTERISTIC_MIN,
	},
}
