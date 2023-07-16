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
import WithCharacter from '~/mixins/WithCharacter'
import CharacterCreator from '~/utils/character/creator'

export default {
	name: 'CharacterBackgroundPage',
	mixins: [ WithCharacter ],

	computed: {
		hasSelected() {
			return false
		},
	},
}
</script>
