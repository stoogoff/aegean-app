
import { toTitleCase } from '~/utils/string'

describe('utils/string', () => {
	describe('toTitleCase', () => {
		it('converts lower case to title case', () => {
			const text = 'lowercase text'

			expect(toTitleCase(text)).toEqual('Lowercase text')
		})

		it('converts upper case to title case', () => {
			const text = 'LOWERCASE TEXT'

			expect(toTitleCase(text)).toEqual('Lowercase text')
		})
	})
})
