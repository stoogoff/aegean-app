
export const MENU = [
	{
		title: 'Home',
		href: '/',
		//icon: 'home',
	},
	{
		title: 'Characters',
		href: '/characters',
		//icon: 'characters',
	},
	{
		title: 'Adversaries',
		href: '/adversaries',
		//icon: 'characters',
	},
	{
		title: 'Account',
		href: '/account',
		//icon: 'account-circle',
	},
]

export const EQUIPMENT_COMMON = 'Common'
export const EQUIPMENT_UNCOMMON = 'Uncommon'
export const EQUIPMENT_RARE = 'Rare'

export const CAREER_COST = 3

export const HERITAGE_MORTAL = 'Mortal'
export const HERITAGE_DIVINE = 'Divine'

export const STAT_MIGHT = 'Might'
export const STAT_REFLEXES = 'Reflexes'
export const STAT_COOL = 'Cool'
export const STAT_INSIGHT = 'Insight'
export const STAT_CUNNING = 'Cunning'

export const CHARACTERISTICS = [
	STAT_MIGHT,
	STAT_REFLEXES,
	STAT_COOL,
	STAT_INSIGHT,
	STAT_CUNNING,
]

export const CHARACTERISTIC_MIN = 1
export const CHARACTERISTIC_MAX = 5
export const CHARACTERISTIC_START = 2

export const SKILL_MIN = 0
export const SKILL_STARTING_MAX = 3
export const SKILL_ADV_STARTING_MAX = 4
export const SKILL_MAX = 5

export const SKILLS_PER_CP = 3

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

const skillMap = {}

SKILLS.forEach(skill => skillMap[skill] = 0)

export const ATTR_RESOLVE = 'Resolve'
export const ATTR_RISK = 'Risk'
export const ATTR_ENDURANCE = 'Endurance'
export const ATTR_STANDING = 'Standing'
export const ATTR_HUBRIS = 'Hubris'
export const ATTR_GLORY = 'Glory'
export const ATTR_FATE = 'Fate'

export const STARTING_CREATION_POINTS = 10

export const DEFAULT_CHARACTER = {
	cp: STARTING_CREATION_POINTS,
	name: '',
	description: '',
	heritage: null,
	parent: null,
	background: null,
	characteristicPackage: null,
	characteristics: {
		[STAT_MIGHT]: CHARACTERISTIC_START,
		[STAT_REFLEXES]: CHARACTERISTIC_START,
		[STAT_COOL]: CHARACTERISTIC_START,
		[STAT_INSIGHT]: CHARACTERISTIC_START,
		[STAT_CUNNING]: CHARACTERISTIC_START,
	},
	skills: { ...skillMap },
	skillIncreases: { ...skillMap },
	gifts: [],
	careers: [],
	advantages: [],
	equipment: [],
}

export const CHARACTER_ID_PREFIX = 'character:'

