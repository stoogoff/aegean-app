<template>
	<div class="secondary-navigation">
		<character-progress :character="character" v-if="character" />
		<article>
			<markdown-content content="characters/background" />

			<step-buttons
				v-if="character"
				:next="`/characters/${character._id}/`"
				:previous="`/characters/${character._id}/heritage`"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>

// display equipment categories as accordions
// each category lists the equipment within it
// should have more information, including weapon or other stats
// only common equipment should be displayed, unless...
// the character has selected options which gives them access to uncommon items
// this is Noble (rich clothing only) and Merchant (one Uncommon item) backgrounds

export default {
	name: 'CharacterEquipmentPage',

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
		hasSelected() {
			return false
		},
	},

	methods: {
		async save(done) {
			await this.$characters.save(this.character)
			done()
		},
	},
}
</script>
