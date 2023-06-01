
// data imports
import heritages from '~/static/data/chargen/heritages.json'
import divinities from '~/static/data/chargen/divinities.json'
import backgrounds from '~/static/data/chargen/backgrounds.json'
import gifts from '~/static/data/gifts.json'

export default () => {
	return {
		heritages() {
			return heritages
		},

		divinities() {
			return divinities
		},

		backgrounds() {
			return backgrounds
		},

		gifts() {
			return gifts
		},

		getGiftByTitle(title) {
			return gifts.find(g => g.title === title)
		},
	}
}
