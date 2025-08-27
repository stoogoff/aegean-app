
export type Heritage = 'Mortal' | 'Divine'

// Characteristics
export const CHAR_MIGHT = 'Might'
export const CHAR_REFLEXES = 'Reflexes'
export const CHAR_COOL = 'Cool'
export const CHAR_INSIGHT = 'Insight'
export const CHAR_CUNNING = 'Cunning'

export const CHARACTERISTICS = [
	CHAR_MIGHT,
	CHAR_REFLEXES,
	CHAR_COOL,
	CHAR_INSIGHT,
	CHAR_CUNNING,
]

export type Characteristic = typeof CHARACTERISTICS

export const CHARACTERISTIC_MIN = 1
export const CHARACTERISTIC_MAX = 5
export const CHARACTERISTIC_START = 2

// Skills
export const SKILL_MIN = 0
export const SKILL_MAX = 5

export const SKILLS = [
	'Accuracy',
	'Athletics',
	'Awareness',
	'Brawl',
	'Craft',
	'Diplomacy',
	'Knowledge',
	'Lore',
	'Manipulation',
	'Medicine',
	'Melee',
	'Perform',
	'Ride',
	'Survival',
	'Vigour',
]

export type Skill = typeof SKILLS

// Attributes
export const ATTR_RESOLVE = 'Resolve'
export const ATTR_RISK = 'Risk'
export const ATTR_ENDURANCE = 'Endurance'
export const ATTR_STANDING = 'Standing'
export const ATTR_HUBRIS = 'Hubris'
export const ATTR_GLORY = 'Glory'

export  const ATTRIBUTES = [
	ATTR_RESOLVE,
	ATTR_RISK,
	ATTR_ENDURANCE,
	ATTR_STANDING,
	ATTR_HUBRIS,
	ATTR_GLORY,
]
