<template>
	<div class="secondary-navigation">
		<character-progress :character="character" v-if="character" />
		<article>
			<markdown-content content="characters/fate" />
			<validate-field
				v-if="character"
				:value="character.fate"
				:rules="rules.fate"
				v-slot="{ error, message }"
			>
				<we-text-area label="Fate" v-model="character.fate" :error="error" :message="message" />
			</validate-field>
			<step-buttons
				v-if="character"
				:next="`/characters/${character._id}/equipment`"
				:previous="`/characters/${character._id}/advantages`"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>
import { required, validate } from 'we-ui/utils/validators'

export default {
	name: 'CharacterFatePage',

	async fetch() {
		const { params } = this.$nuxt.context

		this.character = await this.$characters.byId(params.characterId)
	},
	fetchOnServer: false,

	data() {
		return {
			character: null,
		}
	},

	computed: {
		rules() {
			return {
				fate: [required()],
			}
		},

		hasSelected() {
			return validate(this.rules.fate, this.character.fate).length === 0
		},
	},

	methods: {
		async save(done) {
			await this.$characters.save(this.character)
			done()
		},
	},
}
</script>
