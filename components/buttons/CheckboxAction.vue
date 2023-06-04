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

export default Vue.component('CheckboxAction', {
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
			type: [Boolean],
		},
		data: {
			type: [String, Number, Boolean],
			required: true,
		},
	},

	computed: {
		icon() {
			return this.value === true ? 'checkbox-checked' : 'checkbox-unchecked'
		},
	},

	methods: {
		toggle() {
			this.$emit('input', { data: this.data, value: !this.value})
		},
	},
})
</script>