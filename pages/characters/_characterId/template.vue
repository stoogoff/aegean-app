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
import { character, data } from '~/state'

export default {
	name: 'CharacterBackgroundPage',
	layout: 'full-width',

	async fetch() {
		const { params } = this.$nuxt.context

		this.character = await character.byId(params.characterId)
	},

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
			await character.save(this.character)
			done()
		},
	},
}
</script>
