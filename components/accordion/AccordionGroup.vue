<template>
	<ul class="relative bg-white border border-gray-200 rounded-md shadow-md mb-4">
		<slot />
	</ul>
</template>
<script>
import Vue from 'vue'

export default Vue.component('AccordionGroup', {
	props: {
		multiple: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			items: []
		}
	},

	mounted() {
		this.items = this.$slots.default
			.filter(item => item.componentInstance !== undefined)
			.map(item => item.componentInstance)

		this.items.forEach(item => item.$on('toggle', () => this.toggleItems(item)))
	},

	methods: {
		toggleItems(currentItem) {
			if(currentItem.active && !this.multiple) {
				this.items
					.filter(item => item !== currentItem)
					.forEach(item => item.active = false)
			}
		},
	},
})
</script>
