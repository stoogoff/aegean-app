<template>
	<div class="secondary-navigation">
		<character-progress :creator="creator" v-if="creator.character" />
		<article>
			<markdown-content content="characters/advantages" />
			<accordion-group v-if="creator.character">
				<accordion-item
					v-for="(advantage, idx) in advantages"
					:key="`advantage_${idx}`"
					:checked="isAdvantageSelected(advantage.title)"
				>
					<template #trigger>
						<div>
							<strong class="text-xl">{{ advantage.title }}</strong>
							<small>({{ advantage.cost }} CP)</small>
						</div>
					</template>
					<template #content>
						<render-markdown :content="advantage.description" />
						<checkbox-action
							:value="isAdvantageSelected(advantage.title)"
							:data="advantage.title"
							@input="toggleAdvantage"
							block
							outlined
							:disabled="!canSelectAdvantage(advantage)"
						>
							Select
						</checkbox-action>
					</template>
				</accordion-item>
			</accordion-group>
			<step-buttons
				v-if="creator.character"
				:next="`/characters/${creator.character.slug}/fate`"
				:previous="`/characters/${creator.character.slug}/skills`"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>
import WithCharacter from '~/mixins/WithCharacter'

export default {
	name: 'CharacterAdvantagesPage',
	mixins: [ WithCharacter ],

	computed: {
		advantages() {
			return this.$advantages.all()
		},

		hasSelected() {
			return true
		},
	},

	methods: {
		isAdvantageSelected(title) {
			return this.creator.hasAdvantage(title)
		},

		canSelectAdvantage(advantage) {
			return this.isAdvantageSelected(advantage.title) || this.creator.cp >= advantage.cost
		},

		toggleAdvantage(input) {
			input.value ? this.addAdvantage(input.data) : this.removeAdvantage(input.data)
		},

		addAdvantage(title) {
			const obj = this.$advantages.byTitle(title)

			this.creator.addAdvantage(obj)
		},

		removeAdvantage(title) {
			const obj = this.$advantages.byTitle(title)

			this.creator.removeAdvantage(obj)
		},
	},
}
</script>
