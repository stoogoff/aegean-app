<template>
	<we-button-group>
		<we-button-action outlined block @click="previousClick" v-if="previous">Previous</we-button-action>
		<we-link-action block outlined :to="exit" v-else>Exit</we-link-action>
		<we-button-action block type="primary" :disabled="disabled" @click="nextClick">{{ label }}</we-button-action>
	</we-button-group>
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
		exit: {
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