<template>
	<div class="mb-4">
		<h2>{{ divinity.title }}</h2>
		<p>{{ divinity.description }} Your character gains 1 point in the {{ characteristicText }} and 1 point in each of the following skills:</p>
		<ul class="list">
			<li
				v-for="(skill, idx) in divinity.skills"
				:key="`skill_${divinity.title}_${idx}`"
			>{{ skill }}</li>
		</ul>
		<p>Your character gains the skill specialisation <strong>{{ divinity.specialisation }}</strong>. You may choose one of the following Gifts:</p>
		<ul class="list">
			<li
				v-for="(gift, idx) in divinity.gifts"
				:key="`gift_${divinity.title}_${idx}`"
			>{{ gift }}</li>
		</ul>
		<button-action
			block
			:type="buttonType"
			@click="$emit('click')"
		>Select</button-action>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('DivinityView', {
	props: {
		divinity: {
			type: Object,
			required: true,
		},
		isSelected: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		buttonType() {
			return this.isSelected ? 'success' : 'primary'
		},

		characteristicText() {
			if(this.divinity.characteristics.length === 1)
				return `${this.divinity.characteristics[0]} characteristic`

			return `${this.divinity.characteristics.join(' and ')} characteristics`
		},
	},
})
</script>