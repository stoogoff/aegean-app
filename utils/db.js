
import { database } from '~/plugins/firebase'


// convert the object in the query to its data and ID
export const convert = (query) => ({ ...query.data(), id: query.id })


// database CRUD helpers
export const create = async (collection, data) => {
	const ref = await database().collection(collection).add(data)
	const created = await ref.get()

	return convert(created)
}

export const get = async (collection, id) => {
	const ref = await database().collection(collection).doc(id)
	const retrieved = await ref.get()

	return convert(retrieved)
}

export const list = async (collection) => {
	let data = []
	const query = await database().collection(collection).get()

	query.forEach(doc => data.push(convert(doc)))

  return data
}

export const save = async (collection, data) => {
	return await database().collection(collection).doc(data.id).set(data)
}

export const remove = async (collection, id) => {
	await database().collection(collection).doc(id).delete()
}
