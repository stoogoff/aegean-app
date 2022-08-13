<template>
	<div class="two-column">
		<character-progress :character="character" v-if="character" />
		<article>
			<div class="grid grid-cols-2 gap-4">
				<divinity-view
					v-for="(divinity, idx) in divinities"
					:key="`divinity_${idx}`"
					:divinity="divinity"
					:isSelected="isSelected(divinity)"
					@click="toggleSelected(divinity)"
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

import { character, chargen } from '~/state'

export default {
	name: 'CharacterDivinePage',
	layout: 'full-width',

	async fetch() {
		const { params } = this.$nuxt.context

		this.character = await character.byId(params.characterId)
		this.divinities = chargen.divinities()
	},

	data() {
		return {
			character: null,
			divinities: [],
		}
	},

	computed: {
		hasSelected() {
			return this.character.parent !== null
		},
	},

	methods: {
		isSelected(divinity) {
			return this.character.parent === divinity
		},

		toggleSelected(divinity) {
			console.log('toggleSelected', divinity.title)

			if(this.isSelected(divinity)) {
				this.character.parent = null
			}
			else {
				this.character.parent = divinity
			}
		},

		save(done) {
			/*await*/ character.save(this.character)
			done()
		},
	},
}

</script>