<template>
	<ul class="card mb-4">
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

		this.items.forEach(item => item.$on('click', () => this.activate(item)))
	},

	methods: {
		activate(currentItem) {
			currentItem.active = !currentItem.active

			if(currentItem.active && !this.multiple) {
				this.items
					.filter(item => item !== currentItem)
					.forEach(item => item.active = false)
			}
		},
	},
})
</script>
