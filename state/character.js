
//import Vue from 'vue'
import { database } from '~/plugins/pouch'
import { DEFAULT_CHARACTER } from '~/utils/config'
import { user, image } from '~/state'
import { createId } from '~/utils/string'

export const CHARACTER_ID_PREFIX = 'character:'
const db = database()

export default {
	async byId(id) {
		return await db.get(id)
	},

	async all() {
		// for some reason this returning all docs for me
		const response = await db.allDocs({
			include_docs: true,
			startKey: CHARACTER_ID_PREFIX,
			endKey: `${CHARACTER_ID_PREFIX}\u1111`,
		})

		response.rows = response.rows.filter(row => row.id.startsWith(CHARACTER_ID_PREFIX))
		response.total_rows = response.rows.length

		return response
	},

	async create() {
		const loggedInUser = user.getLoggedInUser()

		if(!loggedInUser) throw 'User not found'

		// TODO once the character is named this should be rewritten with the character
		// name instead of the random ID, then this doc deleted
		const id = `${CHARACTER_ID_PREFIX}${createId()}`
		const character = {
			...DEFAULT_CHARACTER,
			_id: id,
		}

		const response = await db.put(character)

		if(!response.ok) throw 'Unable to create character'

		return id
	},

	async save(data) {
		return await db.put(data)
	},

	async delete(data) {
		return await db.remove(data)
	},
}
