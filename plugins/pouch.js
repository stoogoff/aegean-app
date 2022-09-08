
import PouchDB from 'pouchdb'

let _database

export default ({ env }) => {
	_database = new PouchDB(env.database)
}

export const database = () => _database
