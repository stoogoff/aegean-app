<template>
	<div>
		<message-view v-if="hasText">{{ text }}</message-view>
		<we-button-action @click="logCharacter">Character</we-button-action>
		<we-button-action @click="logCharacters">All Characters</we-button-action>
		<we-responsive-debug />
	</div>
</template>
<script>
import Vue from 'vue'
import CharacterCreator from  '~/utils/character/creator'

export default Vue.component('FooterSection', {
	computed: {
		text() {
			return this.$messages.getMessage()
		},

		hasText() {
			return this.$messages.hasMessage()
		}
	},

	methods: {
		logCharacter() {
			console.log('CharacterCreator.character=', CharacterCreator.character)
		},

		async logCharacters() {
			const characters = await this.$characters.all()
			console.log('$characters.all', characters)
		},
	},
})
</script>