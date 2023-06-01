
import PouchDB from 'pouchdb'
import character from '~/state/character'

/*let _database

export default ({ env }) => {
	_database = new PouchDB(env.database)

	// TODO set up remote database connection
}

export const database = () => _database*/



//import products from '~/state/products'

export default ({ env }, inject) => {
	console.log(env)
	const database = new PouchDB(env.database)

	inject('db', database)
	inject('character', character(database))
}
