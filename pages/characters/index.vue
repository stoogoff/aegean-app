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
			>
				<h2>{{ character.name }}</h2>
				<p v-if="character.description">{{ character.description }}</p>
				<we-link-action :to="`/characters/${character.slug}`">View</we-link-action>
				<!-- TODO edit should only be available for in progress characters -->
				<we-link-action :to="`/characters/${character.slug}/heritage`">Edit</we-link-action>
				<we-button-action type="warning" @click="deleteCharacter(character)">Delete</we-button-action>
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
		this.characters = await this.$characters.all()
	},
	fetchOnServer: false,

	data() {
		return {
			characters: []
		}
	},

	methods: {
		// TODO modal
		async deleteCharacter(current) {
			await this.$characters.delete(current)
			await this.$fetch()
		},
	},
}
</script>