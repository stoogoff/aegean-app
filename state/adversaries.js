
import { unique, sortByProperty } from '~/utils/list'
import { id } from '~/utils/string'
import {
	STAT_MIGHT,
	STAT_REFLEXES,
	STAT_INSIGHT,
	STAT_CUNNING,
} from '~/utils/config'

// data imports
import abilities from '~/static/data/abilities.json'
import properties from '~/static/data/properties.json'
import weapons from '~/static/data/weapons.json'
import people from '~/static/data/adversaries/people.json'
import animals from '~/static/data/adversaries/animals.json'
import monsters from '~/static/data/adversaries/monsters.json'

const KEY_ABILITY  = 'ability:'
const KEY_PROPERTY = 'property:'
const KEY_WEAPON   = 'weapon:'

// merge all adversaries
const ADVERSARIES = [
	...people.map(adv => ({ id: id(adv.title), category: 'Human', ...adv})),
	...animals.map(adv => ({ id: id(adv.title), category: 'Animal', ...adv})),
	...monsters.map(adv => ({ id: id(adv.title), category: 'Monster', ...adv})),
].sort(sortByProperty('title'))


// get object stats from a given container
const getStats = (container, key, item) => {
	if(typeof item === 'object') return item

	return container.find(obj => obj.title === item.replace(key, ''))
}

const getWeaponProperties = property => getStats(properties, KEY_PROPERTY, property)
const getAbilityStats = ability => getStats(abilities, KEY_ABILITY, ability)
const getAttackStats = attack => {
	const stats = getStats(weapons, KEY_WEAPON, attack)

	stats.properties = stats.properties.map(property => getWeaponProperties(property)).filter(weapon => !!weapon)

	// set the correct characteristic for the weapon
	const charProps = [STAT_CUNNING, STAT_INSIGHT, STAT_REFLEXES]
	const characteristics = stats.properties.filter(prop => charProps.indexOf(prop.title) !== -1)

	stats.characteristic = characteristics.length > 0 ? characteristics[0].title : STAT_MIGHT

	if(stats.thrown) {
		// all thrown weapons use Might
		stats.thrown.characteristic = STAT_MIGHT
		stats.thrown.properties = stats.thrown.properties.map(property => getWeaponProperties(property)).filter(weapon => !!weapon)
	}

	return stats
}

export default () => {
	return {
		byId(id) {
			const adversary = ADVERSARIES.find(adv => adv.id === id)

			if(!adversary) return null

			adversary.attacks = adversary.attacks.map(attack => getAttackStats(attack)).filter(attack => !!attack)
			adversary.abilities = (adversary.abilities || []).map(ability => getAbilityStats(ability)).filter(ability => !!ability)

			return adversary
		},

		forCategory(category) {
			return ADVERSARIES.filter(adv => adv.category === category)
		},

		categories() {
			return unique(ADVERSARIES.map(adv => adv.category))
		},

		all() {
			return ADVERSARIES
		},
	}
}
