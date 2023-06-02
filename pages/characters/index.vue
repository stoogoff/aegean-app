<template>
	<article>
		<header class="marble">
			<h1>Characters</h1>
		</header>
		<div class="container">
			<we-loading-spinner v-if="$fetchState.pending" />
			<div
				v-else-if="characters.length > 0"
				v-for="(character, idx) in characters"
				:key="character._id"
				:title="character.id"
			>
				{{ character.id }}
				<we-link-action :to="`/characters/${character.id}/heritage`">Edit</we-link-action>
				<we-button-action @click="deleteCharacter(character.doc)">Delete</we-button-action>
			</div>
			<div v-else>
				<p>Use the button below to create a new character. Once you’ve created a character they will appear here.</p>
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