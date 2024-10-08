
//import Vue from 'vue'
import { DEFAULT_CHARACTER } from '~/utils/config'
import { createId } from 'we-ui/utils/string'
import { CHARACTER_ID_PREFIX } from '~/utils/config'

export default db => {
	return {
		async byId(id) {
			if(!id.startsWith(CHARACTER_ID_PREFIX)) id = CHARACTER_ID_PREFIX + id

			return await db.get(id)
		},

		async all() {
			// for some reason this returning all docs for me
			const response = await db.allDocs({
				include_docs: true,
				startKey: CHARACTER_ID_PREFIX,
				endKey: `${CHARACTER_ID_PREFIX}\u1111`,
			})

			return response.rows
				.filter(row => row.id.startsWith(CHARACTER_ID_PREFIX))
				.map(row => row.doc)
		},

		async create() {
			// TODO once the character is named this should be rewritten with the character
			// name instead of the random ID, then this doc deleted
			const id = createId()
			const character = {
				...DEFAULT_CHARACTER,
				_id: CHARACTER_ID_PREFIX + id,
				slug: id,
			}

			const response = await db.put(character)

			if(!response.ok) throw 'Unable to create character'

			return await this.byId(id)
		},

		async save(data) {
			return await db.put(data)
		},

		async delete(data) {
			return await db.remove(data)
		},
	}
}
