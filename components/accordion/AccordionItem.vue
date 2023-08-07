<template>
	<li class="mb-4 border-b border-gray-200 last:border-0">
		<div
			class="flex cursor-pointer ml-4 mr-6 my-4"
			@click="toggleActive"
			@keypress.enter="toggleActive"
			@keypress.space.prevent="toggleActive"
		>
			<span class="text-green-600 mr-4 w-6">
				<icon-view v-show="checked" icon="check" />
			</span>
			<slot name="trigger" />
			<div class="ml-auto"><icon-view :icon="icon" /></div>
		</div>
		<transition
			name="accordion"
			@enter="start"
			@after-enter="end"
			@before-leave="start"
			@after-leave="end"
		>
			<div v-show="active" class="mx-6 my-4">
				<slot name="content" />
			</div>
		</transition>
	</li>
</template>
<script>
import Vue from 'vue'

export default Vue.component('AccordionItem', {
	props: {
		open: {
			type: Boolean,
			default: false,
		},
		checked: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			active: this.open
		}
	},

	computed: {
		icon() {
			return this.active ? 'chevron-up' : 'chevron-down'
		},
	},

	methods: {
		start(el) {
			el.style.height = el.scrollHeight + 'px'
		},

		end(el) {
			el.style.height = ''
		},

		toggleActive() {
			this.active = !this.active
			this.$emit('toggle')
		}
	},
})
</script>
<style scoped>
.accordion-enter-active, .accordion-leave-active {
	will-change: height, opacity;
	transition: height 0.3s ease, opacity 0.3s ease;
	overflow: hidden;
}

.accordion-enter, .accordion-leave-to {
	height: 0 !important;
	opacity: 0;
}
</style>
