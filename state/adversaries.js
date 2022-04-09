
import Vue from 'vue'
import properties from '~/static/data/properties.json'
import weapons from '~/static/data/weapons.json'
import people from '~/static/data/adversaries/people.json'

// merge all adversaries
const ADVERSARIES = [
	...people,
	// ...monsters,
]


// get object stats from a given cnotainer
const getStats = (container, key, item) => {
	if(typeof item === 'object') return item

	return container.find(obj => obj.title === item.replace(key, ''))
}

const getWeaponProperties = property => getStats(properties, 'property:', property)
const getAttackStats = attack => {
	const stats = getStats(weapons, 'weapon:', attack)

	// set the correct characteristic for the weapon
	const charProps = ['Cunning', 'Inisght', 'Reflexes']
	const characteristics = stats.properties.filter(prop => charProps.indexOf(prop.title) !== -1)

	stats.characteristic = characteristics.length > 0 ? characteristics[0] : 'Might'

	// all thrown weapons use Might
	if(stats.thrown) stats.thrown.characteristic = 'Might'

	return stats
}


// state management
const state = Vue.observable({
	adversaries: ADVERSARIES,
})

// add full properties to weapons
weapons.forEach(weapon => {
	weapon.properties = weapon.properties.map(property => getWeaponProperties(property)).filter(weapon => !!weapon)

	if(weapon.thrown) {
		weapon.thrown.properties = weapon.thrown.properties.map(property => getWeaponProperties(property)).filter(weapon => !!weapon)
	}
})


export default {
	byId(id) {
		const adversary = state.adversaries.find(adv => adv.id === id)

		adversary.attacks = adversary.attacks.map(attack => getAttackStats(attack)).filter(attack => !!attack)
		//adversary.abilities = adversary.abilities.map(ability => getAbility(ability)).filter(ability => !!ability)

		return adversary
	},

	all() {
		return state.adversaries
	}
}
