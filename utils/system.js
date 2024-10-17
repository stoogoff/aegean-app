
import { EQUIPMENT_CATEGORIES } from '~/utils/config'

export const isMeleeWeapon = category => category === EQUIPMENT_CATEGORIES.WEAPON_MELEE
export const isRangedWeapon = category => category === EQUIPMENT_CATEGORIES.WEAPON_RANGED
export const isShield = category => category === EQUIPMENT_CATEGORIES.SHIELD
export const isArmour = category => category === EQUIPMENT_CATEGORIES.ARMOUR
export const isWeapon = category =>
	isMeleeWeapon(category) || isRangedWeapon(category) || isShield(category)

// get object stats from a given container
export const getStats = (container, key, item) => {
	if(typeof item === 'object') return item

	// match by title with the key removed and any ranks removed
	const found = container.find(obj => obj.title === item.replace(key, '').replace(/\s\d$/, ''))

	if(!found) return null

	// replace the title with the searched for title, which adds any ranks to it
	return { ...found, title: item.replace(key, '') }
}
