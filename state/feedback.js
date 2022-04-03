
import Vue from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import { database } from '~/plugins/firebase'
import { STORAGE_FEEDBACK } from '~/utils/config'
import { get, create, save, remove, convert } from '~/utils/db'
import { user } from '~/state'

const state = Vue.observable({
	feedback: [],
})


export default {
	all() {
		return state.feedback
	},

	async create(data) {
		const loggedInUser = user.getLoggedInUser()

		if(!loggedInUser) {
			return null
		}

		const feedback = await create(STORAGE_FEEDBACK, {
			description: data,
			userId: loggedInUser.uid,
			email: loggedInUser.email,
			date: (new Date()).toISOString(),
		})

		state.feedback = [ ...state.feedback, feedback]

		return feedback
	},

	async fetch() {
		let data = []
		const loggedInUser = user.getLoggedInUser()

		if(loggedInUser) {
			const query = await database().collection(STORAGE_FEEDBACK).where('userId', '==', loggedInUser.uid).get()

			query.forEach(doc => data.push(convert(doc)))
		}

		state.feedback = data
	}
}
