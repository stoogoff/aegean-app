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
				:next="`/characters/${character._id}/`"
				:previous="`/characters/${character._id}/skills`"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>
export default {
	name: 'CharacterAdvantagesPage',

	async fetch() {
		const { params } = this.$nuxt.context

		this.character = await this.$characters.byId(params.characterId)
	},
	fetchOnServer: false,

	data() {
		return {
			character: null,
		}
	},

	computed: {
		advantages() {
			return this.$advantages.all()
		},

		hasSelected() {
			return false
		},
	},

	methods: {
		isAdvantageSelected(title) {
			return this.character.advantages.map(adv => adv.title).includes(title)
		},

		canSelectAdvantage(advantage) {
			return this.isAdvantageSelected(advantage.title) || this.character.cp >= advantage.cost
		},

		toggleAdvantage(input) {
			input.value ? this.addAdvantage(input.data) : this.removeAdvantage(input.data)
		},

		addAdvantage(title) {
			const obj = this.$advantages.byTitle(title)

			this.character.advantages = [ ...this.character.advantages, {
				title,
			}]

			this.character.cp -= obj.cost
		},

		removeAdvantage(title) {
			const obj = this.$advantages.byTitle(title)

			this.character.advantages = [ ...this.character.advantages.filter(adv => adv.title !== title) ]

			this.character.cp += obj.cost
		},

		async save(done) {
			await this.$characters.save(this.character)
			done()
		},
	},
}
</script>
