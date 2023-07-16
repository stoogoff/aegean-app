<template>
	<div class="secondary-navigation">
		<character-progress :character="character" v-if="character" />
		<article>
			<markdown-content content="characters/background" />

			<step-buttons
				v-if="character"
				:next="`/characters/${character.slug}/`"
				:previous="`/characters/${character.slug}/heritage`"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>
export default {
	name: 'CharacterBackgroundPage',

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
