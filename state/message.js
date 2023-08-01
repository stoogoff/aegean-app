
import Vue from 'vue'
import { notNull } from '~/utils/assert'

const state = Vue.observable({
	message: null,
})

export default () => {
	return {
		getMessage() {
			return state.message
		},

		hasMessage() {
			return notNull(state.message)
		},

		setMessage(text) {
			state.message = text

			window.setTimeout(() => state.message = null, 3000)
		},
	}
}
