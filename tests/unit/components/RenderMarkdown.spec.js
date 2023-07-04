
import { shallowMount } from '@vue/test-utils'
import RenderMarkdown from '~/components/RenderMarkdown'

describe('RenderMarkdown', () => {
	it('it renders basic markdown', () => {
		const wrapper = shallowMount(RenderMarkdown, {
			propsData: {
				content: 'This *is* a __test__'
			}
		})

		expect(wrapper.html()).toContain('<p>This <em>is</em> a <strong>test</strong></p>')
	})

	it('removes the containing tag', () => {
		const wrapper = shallowMount(RenderMarkdown, {
			propsData: {
				content: 'This *is* a __test__',
				stripOuterTag: true
			}
		})

		expect(wrapper.html()).toContain('This <em>is</em> a <strong>test</strong>')
	})
})
