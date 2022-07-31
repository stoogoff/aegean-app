<template>
	<div class="flex">
		<button-action outlined block @click="previousClick" v-if="previous">Previous</button-action>
		<link-action block outlined :to="exit" v-else>Exit</link-action>
		<button-action block type="primary" :disabled="disabled" @click="nextClick">{{ label }}</button-action>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('StepButtons', {
	props: {
		next: {
			type: String,
			required: true,
		},
		previous: {
			type: String,
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		label: {
			type: String,
			default: 'Next',
		},
	},

	computed: {
		exit() {
			return this.next.substring(0, this.next.lastIndexOf('/'))
		},
	},

	methods: {
		async previousClick() {
			this.$emit('click', () => {
				this.$router.push(this.previous)
			})
		},

		async nextClick() {
			this.$emit('click', () => {
				this.$router.push(this.next)
			})
		}
	},
})
</script>