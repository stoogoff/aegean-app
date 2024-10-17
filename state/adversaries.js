
import { unique, sortByProperty } from 'we-ui/utils/list'
import { id } from 'we-ui/utils/string'
import {
	STAT_MIGHT,
	STAT_REFLEXES,
	STAT_INSIGHT,
	STAT_CUNNING,
	KEY_ABILITY,
	KEY_PROPERTY,
	KEY_WEAPON,
} from '~/utils/config'
import { getStats, isWeapon } from '~/utils/system'

// data imports
import abilities from '~/static/data/abilities.json'
import all from '~/static/data/adversaries/all.json'
import attacks from '~/static/data/attacks.json'
import equipment from '~/static/data/equipment.json'
import properties from '~/static/data/properties.json'

// merge all adversaries
const ADVERSARIES = [
	...all.map(adv => ({ id: id(adv.title), ...adv }))
].sort(sortByProperty('title'))

const weapons = [...attacks, equipment.filter(({ category }) => isWeapon(category))]

const getWeaponProperties = property => getStats(properties, KEY_PROPERTY, property)
const getAbilityStats = ability => getStats(abilities, KEY_ABILITY, ability)
const getAttackStats = attack => {
	const item = getStats(weapons, KEY_WEAPON, attack)

	if(!item) return

	item.stats.properties = (item.stats.properties || []).map(property => getWeaponProperties(property)).filter(weapon => !!weapon)

	// set the correct characteristic for the weapon
	const charProps = [STAT_CUNNING, STAT_INSIGHT, STAT_REFLEXES]
	const characteristics = item.stats.properties.filter(prop => charProps.indexOf(prop.title) !== -1)

	item.stats.characteristic = characteristics.length > 0 ? characteristics[0].title : STAT_MIGHT

	if(item.stats.thrown) {
		// all thrown weapons use Might
		item.stats.thrown.characteristic = STAT_MIGHT
		item.stats.thrown.properties = stats.thrown.properties.map(property => getWeaponProperties(property)).filter(weapon => !!weapon)
	}

	return item
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
