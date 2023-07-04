
import { join, sum } from '~/utils/list'

describe('utils/list', () => {
	describe('sum', () => {
		it('adds two numbers together', () => {
			expect(sum(2, 4)).toEqual(6)
		})
	})

	describe('join', () => {
		const joinerDefault = join()
		const joinerEmpty = join('')
		const joinerAnd = join(' and ')

		it('returns an empty string if no value is specified', () => {
			expect(joinerDefault()).toEqual('')
			expect(joinerEmpty()).toEqual('')
			expect(joinerAnd()).toEqual('')
		})

		it('returns a single value for a one element array', () => {
			expect(joinerAnd(['One'])).toEqual('One')
		})

		it('uses the parameter to join two values', () => {
			expect(joinerAnd(['One', 'Two'])).toEqual('One and Two')
		})

		it('comma separates multiple values and uses the parameter between the final two', () => {
			expect(joinerAnd(['One', 'Two', 'Three'])).toEqual('One, Two and Three')
		})

		it('remove the comma for two parameters', () => {
			const joiner = join(', ')

			expect(joiner(['One', 'Two'])).toEqual('One Two')
		})
	})
})
