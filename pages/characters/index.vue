<template>
	<main>
		<card-view
			v-for="(character, idx) in characters"
			:key="character._id"
			:title="character.id"
		>
			{{ character.id }}
			<we-link-action :to="`/characters/${character.id}/heritage`">Edit</we-link-action>
			<we-button-action @click="deleteCharacter(character.doc)">Delete</we-button-action>
		</card-view>
		<we-link-action to="/characters/new" primary block>Create Character</we-link-action>
	</main>
</template>
<script>

export default {
	name: 'CharacterIndexPage',

	async fetch() {
		const response = await this.$characters.all()

		this.characters = response.rows
	},

	data() {
		return {
			characters: []
		}
	},

	methods: {
		async deleteCharacter(current) {
			await this.$characters.delete(current)
			await this.$fetch()
		},
	},
}
</script>