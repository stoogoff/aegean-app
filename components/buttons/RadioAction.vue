<template>
	<we-button-action :block="block" :outlined="outlined" :disabled="disabled" @click="toggle">
		<div class="flex">
			<span class="flex-grow-0"><we-icon-view :icon="icon" /></span>
			<span class="flex-grow"><slot /></span>
		</div>
	</we-button-action>
</template>
<script>
import Vue from 'vue'

export default Vue.component('RadioAction', {
	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
		outlined: {
			type: Boolean,
			default: false,
		},
		block: {
			type: Boolean,
			default: false,
		},
		value: {
			type: [String, Number, Boolean],
		},
		data: {
			type: [String, Number, Boolean],
			required: true,
		},
	},

	computed: {
		isChecked() {
			return this.value === this.data
		},

		icon() {
			return this.isChecked ? 'radio-checked' : 'radio-unchecked'
		},
	},

	methods: {
		toggle() {
			this.$emit('input', this.data)
		},
	},
})
</script>