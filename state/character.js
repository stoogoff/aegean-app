
//import Vue from 'vue'
import { database } from '~/plugins/pouch'
import { DEFAULT_CHARACTER, STORAGE_CHARACTERS } from '~/utils/config'
//import { get, create, save, remove, convert } from '~/utils/db'
import { user, image } from '~/state'
import { createId } from '~/utils/string'

/*const state = Vue.observable({
	characters: [],
	fetched: false,
})*/


/*const fetch = async () => {
	if(state.fetched) {
		return
	}

	let data = []
	const loggedInUser = user.getLoggedInUser()

	if(loggedInUser) {
		const query = await database().collection(STORAGE_CHARACTERS).where('userId', '==', loggedInUser.uid).get()

		query.forEach(doc => data.push(convert(doc)))
	}

	state.characters = data
	state.fetched = true
}*/

export default {
	async byId(id) {
		const db = database()

		return await db.get(id)
	},

	async all() {
		const db = database()

		return await db.allDocs({ include_docs: true })
	},

	async create() {
		const loggedInUser = user.getLoggedInUser()

		if(!loggedInUser) throw 'User not found'

		const id = `character-${loggedInUser.name.toLowerCase()}-${createId()}`
		const character = {
			...DEFAULT_CHARACTER,
			userId: loggedInUser.uid,
			_id: id,
		}

		const db = database()
		const response = await db.put(character)

		if(!response.ok) throw 'Unable to create character'

		return id
	},

	async save(data) {
		const db = database()
		
		return await db.put(data)
	},

	async delete(id) {
		const db = database()

		return await db.remove(id)
	},

	/*async push({ character, attribute }) {
		await this.save(character)
	},

	async reset() {
		state.characters = []
		state.fetched = false
	},

	async fetch() {
		await fetch()
	}*/
}
