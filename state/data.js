
// data imports
import heritage from '~/static/data/chargen/heritage.json'
import divinities from '~/static/data/chargen/divinities.json'
import background from '~/static/data/chargen/background.json'
import gifts from '~/static/data/gifts.json'


export default {
	heritage() {
		return heritage
	},

	divinities() {
		return divinities
	},

	backgrounds() {
		return background
	},

	gifts() {
		return gifts
	},

	getGiftByTitle(title) {
		return gifts.find(g => g.title === title)
	},
}
