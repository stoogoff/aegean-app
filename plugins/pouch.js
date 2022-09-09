
import PouchDB from 'pouchdb'

let _database

export default ({ env }) => {
	_database = new PouchDB(env.database)

	// TODO set up remote database connection
}

export const database = () => _database
