<template>
	<div class="secondary-navigation">
		<character-progress :character="character" v-if="character" />
		<article>
			<div class="grid grid-cols-2 gap-4">
				<divinity-view
					v-for="(divinity, idx) in divinities"
					:key="`divinity_${idx}`"
					:divinity="divinity"
					:isSelected="isSelected(divinity)"
					:hasSelected="hasSelected"
					@click="toggleSelected(divinity)"
				/>
			</div>
			<step-buttons
				v-if="character"
				:next="`/characters/${character._id}/background`"
				:previous="`/characters/${character._id}/heritage`"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>
import { character, data } from '~/state'

export default {
	name: 'CharacterDivinePage',
	layout: 'full-width',

	async fetch() {
		const { params } = this.$nuxt.context

		this.character = await character.byId(params.characterId)
		this.parent = this.character.parent
		this.divinities = data.divinities()
	},

	data() {
		return {
			character: null,
			parent: null,
			divinities: [],
		}
	},

	computed: {
		hasSelected() {
			return this.parent !== null
		},
	},

	methods: {
		isSelected(divinity) {
			return this.parent === divinity.title
		},

		toggleSelected(divinity) {
			if(this.isSelected(divinity)) {
				this.parent = null
				this.removeSkills(divinity)
			}
			else {
				if(this.parent !== null) this.removeSkills(this.findDivinityByTitle(this.parent))

				this.parent = divinity.title
				this.addSkills(divinity)
			}
		},

		findDivinityByTitle(title) {
			return this.divinities.find(divinity => divinity.title === title)
		},

		removeSkills(divinity) {
			divinity.skills.forEach(skill =>
				this.character.skills[skill] = Math.max(this.character.skills[skill] - 1, 0)
			)
		},

		addSkills(divinity) {
			divinity.skills.forEach(skill =>
				this.character.skills[skill] += 1
			)
		},

		async save(done) {
			this.character.parent = this.parent
			await character.save(this.character)
			done()
		},
	},
}

</script>