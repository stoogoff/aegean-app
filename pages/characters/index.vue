<template>
	<main>
		<card-view
			v-for="(character, idx) in characters"
			:key="character._id"
			:title="character.id"
		>
			{{ character.id }}
			<link-action :to="`/characters/${character.id}/heritage`">Edit</link-action>
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

		console.log(response)

		this.characters = response.rows
	},

	data() {
		return {
			characters: []
		}
	},
}
</script>