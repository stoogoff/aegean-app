<template>
	<main>
		<card-view
			v-for="(character, idx) in characters"
			:key="character._id"
			:title="character.id"
		>
			{{ character.id }}
			<link-action :to="`/characters/${character.id}/heritage`">Edit</link-action>
			<button-action @click="deleteCharacter(character.doc)">Delete</button-action>
		</card-view>
		<link-action to="/characters/new" primary block>Create Character</link-action>
	</main>
</template>
<script>
import { character } from '~/state'
export default {
	name: 'CharacterIndexPage',

	async fetch() {
		const response = await character.all()

		this.characters = response.rows
	},

	data() {
		return {
			characters: []
		}
	},

	methods: {
		async deleteCharacter(current) {
			await character.delete(current)
			await this.$fetch()
		},
	},
}
</script>