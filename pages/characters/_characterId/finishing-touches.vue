<template>
	<div class="secondary-navigation">
		<character-progress :creator="creator" v-if="creator.character" />
		<article>
			<markdown-content content="characters/finishing-touches" />
			<validate-field
				:value="name"
				:rules="rules.name"
				v-slot="{ error, message }"
			>
				<we-text-input label="Name" v-model="name" :error="error" :message="message" />
			</validate-field>
			<we-text-area label="Description" v-model="description" />

			<step-buttons
				v-if="creator.character"
				next="/characters/"
				:previous="`/characters/${creator.character.slug}/equipment`"
				:disabled="!hasSelected"
				@click="saveComplete"
			/>
		</article>
	</div>
</template>
<script>
import WithCharacter from '~/mixins/WithCharacter'
import { required, validate } from 'we-ui/utils/validators'

export default {
	name: 'FinishingTouchesPage',
	mixins: [ WithCharacter ],

	data() {
		return {
			name: '',
			description: '',
		}
	},

	computed: {
		hasSelected() {
			return validate(this.rules.name, this.name).length === 0
		},

		rules() {
			return {
				name: [required()],
			}
		},
	},

	methods: {
		onCharacterLoad() {
			this.name = this.creator.character.name || ''
			this.description = this.creator.character.description || ''
		},

		async onBeforeSave() {


			await this.creator.finalise()
			// TODO prevent saving if has 1CP left
		},

		saveComplete(done) {
			this.creator.character.name = this.name
			this.creator.character.description = this.description

			const character = this.creator.finalise()

			try {
				this.$characters.delete(this.creator.character)
				this.$characters.save(character)
			}
			catch(err) {
				console.error(err)
				this.$messages.setMessage(err)
			}

			done()
		},
	},
}
</script>
