<template>
	<div
		class="relative z-1"
		:class="{
			'block w-full': block,
			'inline-block': !block,
		}"
		@focus="show"
		@focusout="hide"
		tabindex="0"
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
			<div
				v-show="isVisible"
				class="fixed md:absolute pt-2 z-10 top-24 left-4 right-4"
				:class="{
					'md:w-64': !wide,
					'md:w-96': wide,
					'md:bottom-12': y === 'bottom',
					'md:top-auto': y === 'bottom',
					'md:top-12': y === 'top',
					'md:top-bottom-auto': y === 'top',
					'md:left-0': x === 'left',
					'md:right-auto': x === 'left',
					'md:right-0': x === 'right',
					'md:left-auto': x === 'right',
				}"
			>
				<slot name="info" />
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
		wide: {
			type: Boolean,
			default: false,
		},
		y: {
			type: String,
			default: 'bottom',
		},
		x: {
			type: String,
			default: 'left'
		}
	},

	data() {
		return {
			isVisible: false
		}
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
