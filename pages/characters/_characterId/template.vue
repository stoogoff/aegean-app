<template>
	<div class="secondary-navigation">
		<character-progress :creator="creator" v-if="creator.character" />
		<article>
			<markdown-content content="characters/background" />

			<step-buttons
				v-if="creator.character"
				:next="`/characters/${creator.character.slug}/`"
				:previous="`/characters/${creator.character.slug}/heritage`"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>
import WithCharacter from '~/mixins/WithCharacter'

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
