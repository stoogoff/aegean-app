
import { id } from '~/utils/db'

describe('utils/db', () => {
	describe('id', () => {
		it('returns the database id', () => {
			expect(id({
				_id: 'test'
			})).toEqual('test')
		})

		it('converts upper case to title case', () => {
			expect(id({})).toEqual(undefined)
		})
	})
})
