
import { normalise } from '~/utils/string'

export default {
	props: {
		list: {
			type: Array,
			default: [],
		},
		property: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			default: 'Filter',
		},
	},

	data() {
		return {
			filter: '',
			filtered: [],
		}
	},

	watch: {
		filter(text) {
			text = normalise(text)

			const list = this.list.filter(a => normalise(a[this.property]).indexOf(text) !== -1)

			this.filtered = list
			this.$emit('filter', list)
		}
	},

	methods: {
		clear() {
			this.filter = ''
		}
	},
}
