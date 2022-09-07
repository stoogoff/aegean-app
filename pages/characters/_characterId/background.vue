<template>
	<div class="secondary-navigation">
		<character-progress :character="character" v-if="character" />
		<article>
			<markdown-content content="characters/background" />
			<div class="grid grid-cols-2 gap-4">
				<background-view
					v-for="(background, idx) in backgrounds"
					:key="`background_${idx}`"
					:background="background"
					:isSelected="isSelected(background)"
					:hasSelected="hasSelected"
					@click="toggleSelected(background)"
				/>
			</div>
			<step-buttons
				v-if="character"
				:next="`/characters/${character.id}/`"
				:previous="`/characters/${character.id}/heritage`"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>
import { character, data } from '~/state'

export default {
	name: 'CharacterBackgroundPage',
	layout: 'full-width',

	async fetch() {
		const { params } = this.$nuxt.context

		this.character = await character.byId(params.characterId)
		this.background = this.character.background
		this.backgrounds = data.backgrounds()
	},

	data() {
		return {
			character: null,
			background: null,
			backgrounds: [],
		}
	},

	computed: {
		hasSelected() {
			return false
		},
	},

	methods: {
		isSelected(background) {
			return this.background === background
		},

		toggleSelected(background) {
			if(this.isSelected(background)) {
				this.background = null
			}
			else {
				this.background = background
			}
		},

		save(done) {
			this.character.background = this.background
			/*await*/ character.save(this.character)
			done()
		},
	},
}
</script>
