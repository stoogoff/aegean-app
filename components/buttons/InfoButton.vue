<template>
	<div
		class="relative"
		:class="{
			'block w-full': block,
			'inline-block': !block,
		}"
	>
		<button-action v-bind="$attrs" block :disabled="disabled" @click="toggle">
			<slot />
		</button-action>
		<transition
			enter-active-class="transition duration-300 ease-out transform"
			enter-class="translate-y-3 scale-95 opacity-0"
			enter-to-class="translate-y-0 scale-100 opacity-100"
			leave-active-class="transition duration-150 ease-in transform"
			leave-class="translate-y-0 opacity-100"
			leave-to-class="translate-y-3 opacity-0"
		>
			<div v-show="isVisible" :class="`absolute pt-2 z-10 w-64 ${positionClass}`">
				<div class="relative bg-white border border-gray-200 rounded-md shadow-md">
					<slot name="info" />
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('InfoButton', {
	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
		block: {
			type: Boolean,
			default: false,
		},
		position: {
			type: String,
			default: 'bottom',
		},
	},

	data() {
		return {
			isVisible: false
		}
	},

	computed: {
		positionClass() {
			return this.position === 'bottom' ? 'bottom-12' : 'top-12'
		},
	},

	methods: {
		show() {
			if(!this.disabled) {
				this.isVisible = true
			}
		},

		hide() {
			this.isVisible = false
		},

		toggle() {
			if(this.isVisible) {
				this.hide()
			}
			else {
				this.show()
			}
		},

		clickHandler(item) {
			if(item.click) {
				item.click()
			}
			else {
				this.$emit('click', item.key)
			}

			this.hide()
		},
	},
})
</script>
