<template>
	<card-view :title="divinity.title">
		<p>{{ divinity.description }} Your character gains 1 point in the {{ characteristicText }} and 1 point in each of the following skills:</p>
		<ul class="list">
			<li
				v-for="(skill, idx) in divinity.skills"
				:key="`skill_${divinity.title}_${idx}`"
			>{{ skill }}</li>
		</ul>
		<p>Your character gains the skill specialisation <strong>{{ divinity.specialisation }}</strong>. You may choose one of the following Gifts:</p>
		<ul>
			<li
				v-for="(gift, idx) in divinity.gifts"
				:key="`gift_${divinity.title}_${idx}`"
			>
				<info-button small outlined>
					{{ gift }}
					<template #info>
						<card-view :title="gift">
							<render-markdown :content="getGift(gift).description" />
						</card-view>
					</template>
				</info-button>
			</li>
		</ul>
		<button-action
			block
			:outlined="hasSelected"
			:type="buttonType"
			@click="$emit('click')"
		>Select</button-action>
	</card-view>
</template>
<script>
import Vue from 'vue'
import { data } from '~/state'

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
		hasSelected: {
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

	methods: {
		getGift(title) {
			return data.getGiftByTitle(title)
		},
	},
})
</script>