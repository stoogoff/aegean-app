
import Vue from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import { database } from '~/plugins/firebase'
import { DEFAULT_CHARACTER, STORAGE_CHARACTERS } from '~/utils/config'
//import { get, create, save, remove, convert } from '~/utils/db'
import { user, image } from '~/state'

const state = Vue.observable({
	characters: [],
	fetched: false,
})


const fetch = async () => {
	if(state.fetched) {
		return
	}

	let data = []
	/*const loggedInUser = user.getLoggedInUser()

	if(loggedInUser) {
		const query = await database().collection(STORAGE_CHARACTERS).where('userId', '==', loggedInUser.uid).get()

		query.forEach(doc => data.push(convert(doc)))
	}*/

	state.characters = data
	state.fetched = true
}

export default {
	async byId(id) {
		let character = state.characters.find(character => character.id === id)

		/*if(!character) {
			character = await get(STORAGE_CHARACTERS, id)

			state.characters = [ ...state.characters, character ]
		}*/

		return cloneDeep(character)
	},

	all() {
		return state.characters
	},

	async create() {
		const loggedInUser = user.getLoggedInUser()

		if(!loggedInUser) {
			return null
		}

		//const character = await create(STORAGE_CHARACTERS, { ...DEFAULT_CHARACTER, userId: loggedInUser.uid })
		const character = { ...DEFAULT_CHARACTER, userId: loggedInUser.uid, id: '1' }

		state.characters = [ ...state.characters, character ]

		return character
	},

	/*async*/ save(data) {
		//await save(STORAGE_CHARACTERS, data)

		state.characters = [ ...state.characters.filter(character => character.id !== data.id), data ]
	},

	async delete(id) {
		//await remove(STORAGE_CHARACTERS, id)

		const toRemove = state.characters.find(character => character.id === id)

		/*if(toRemove && toRemove.image) {
			await image.delete(toRemove.image)
		}*/

		state.characters = state.characters.filter(character => character.id !== id)
	},

	async push({ character, attribute }) {
		await this.save(character)
	},

	async reset() {
		state.characters = []
		state.fetched = false
	},

	async fetch() {
		await fetch()
	}
}
