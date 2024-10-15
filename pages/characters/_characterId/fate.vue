<template>
	<div class="secondary-navigation">
		<character-progress :creator="creator" v-if="creator.character" />
		<article>
			<markdown-content content="characters/fate" />
			<validate-field
				:value="fate"
				:rules="rules.fate"
				v-slot="{ error, message }"
			>
				<we-text-area label="Fate" v-model="fate" :error="error" :message="message" />
			</validate-field>
			<step-buttons
				v-if="creator.character"
				:next="`/characters/${creator.character.slug}/equipment`"
				:previous="`/characters/${creator.character.slug}/advantages`"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>
import WithCharacter from '~/mixins/WithCharacter'
import { required, validate } from 'we-ui/utils/validators'

export default {
	name: 'CharacterFatePage',
	mixins: [ WithCharacter ],

	data() {
		return {
			fate: '',
		}
	},

	computed: {
		rules() {
			return {
				fate: [required()],
			}
		},

		hasSelected() {
			return validate(this.rules.fate, this.fate).length === 0
		},
	},

	methods: {
		onCharacterLoad() {
			this.fate = this.creator.character.fate
		},

		onBeforeSave() {
			this.creator.character.fate = this.fate
		},
	},
}
</script>
