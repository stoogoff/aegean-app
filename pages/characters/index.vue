<template>
	<article>
		<header>
			<h1>Characters</h1>
		</header>
		<div class="container">
			<div
				v-for="(character, idx) in characters"
				:key="character._id"
				:title="character.id"
			>
				{{ character.id }}
				<we-link-action :to="`/characters/${character.id}/heritage`">Edit</we-link-action>
				<we-button-action @click="deleteCharacter(character.doc)">Delete</we-button-action>
			</div>
			<we-link-action to="/characters/new" type="primary" block outlined>Create Character</we-link-action>
		</div>
	</article>
</template>
<script>

export default {
	name: 'CharacterIndexPage',

	async fetch() {
		const response = await this.$characters.all()

		this.characters = response.rows
	},
	fetchOnServer: false,

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