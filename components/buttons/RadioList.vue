<template>
	<li class="flex mb-2 cursor-pointer" @click="toggle">
		<span class="flex-grow-0 mr-2"><we-icon-view :icon="icon" /></span>
		<span class="flex-grow"><slot /></span>
	</li>
</template>
<script>
import Vue from 'vue'

export default Vue.component('RadioList', {
	props: {
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