<template>
	<div class="secondary-navigation">
		<character-progress :character="character" v-if="character" />
		<article>
			<markdown-content content="characters/advantages" />
			<accordion-group v-if="character">
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
				v-if="character"
				:next="`/characters/${character.slug}/fate`"
				:previous="`/characters/${character.slug}/skills`"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>
import WithCharacter from '~/mixins/WithCharacter'
import CharacterCreator from '~/utils/character/creator'

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
			return CharacterCreator.hasAdvantage(title)
		},

		canSelectAdvantage(advantage) {
			return this.isAdvantageSelected(advantage.title) || this.character.cp >= advantage.cost
		},

		toggleAdvantage(input) {
			input.value ? this.addAdvantage(input.data) : this.removeAdvantage(input.data)
		},

		addAdvantage(title) {
			const obj = this.$advantages.byTitle(title)

			CharacterCreator.addAdvantage(obj)
		},

		removeAdvantage(title) {
			const obj = this.$advantages.byTitle(title)

			CharacterCreator.removeAdvantage(obj)
		},
	},
}
</script>
