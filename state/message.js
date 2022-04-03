
import Vue from 'vue'

const state = Vue.observable({
	message: null,
})

export default {
	getMessage() {
		return state.message
	},

	hasMessage() {
		return state.message !== null
	},

	setMessage(text) {
		state.message = text

		window.setTimeout(() => state.message = null, 3000)
	},
}
