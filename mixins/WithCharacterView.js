
import {
	ATTRIBUTES,
	CHARACTERISTICS,
	HERITAGE_DIVINE,
	HERITAGE_MORTAL,
} from '~/utils/config'

export default {
	data() {
		return {
			character: null,
		}
	},

	computed: {
		characteristics() {
			return CHARACTERISTICS
		},

		attributes() {
			return ATTRIBUTES
		},

		heritages() {
			return [
				HERITAGE_MORTAL,
				HERITAGE_DIVINE,
			]
		},

		parents() {
			return this.$divinities.all().map(({ title }) => title).sort()
		},

		backgrounds() {
			return this.$backgrounds.all().map(({ title }) => title).sort()
		},

		hasDivineHeritage() {
			return this.character && this.character.heritage === HERITAGE_DIVINE
		},
	},
}
