
import { shallowMount } from '@vue/test-utils'
import TagView from '~/components/TagView'

describe('TagView', () => {
	it('displays slot text', () => {
		const wrapper = shallowMount(TagView, {
			slots: {
				default: 'Test'
			}
		})

		expect(wrapper.text()).toEqual('Test')
	})

	it('adds a type class', () => {
		const wrapper = shallowMount(TagView, {
			propsData: {
				type: 'warning',
			}
		})

		expect(wrapper.classes()).toContain('warning')
	})
})
