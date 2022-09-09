<template>
	<div class="secondary-navigation">
		<character-progress :character="character" v-if="character" />
		<article>
			<markdown-content content="characters/heritage" />
			<div class="grid grid-cols-2 gap-4">
				<div
					class="mb-4"
					v-for="(heritage, idx) in heritages"
					:key="`heritage_${idx}`"
				>
					<h2>{{ heritage.title }}</h2>
					<small>Cost: {{ heritage.cost }}CP</small>
					<p>{{ heritage.description }} A {{ heritage.title | lower }} character starts with the following:</p>
					<ul>
						<li><strong>Endurance:</strong> {{ heritage.endurance }}</li>
						<li><strong>Glory:</strong> {{ heritage.glory }}</li>
					</ul>
					<button-action
						block
						:outlined="hasSelected"
						:type="getButtonType(heritage)"
						@click="toggleSelected(heritage)"
					>{{ heritage.title }} Heritage ({{ heritage.cost }})</button-action>
				</div>
			</div>
			<step-buttons
				v-if="character"
				:next="nextPage"
				exit="/characters"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>
import { character, data } from '~/state'

// choose heritage:
// 1. mortal
// 2. divine, choose parentage:
// 	parent:
// 		3 skills
// 		1 characteristic
// 		1 specialisation
// 		choose 1 of 3 gifts
// with a variation for Zeus

export default {
	name: 'CharacterHeritagePage',
	layout: 'full-width',

	async fetch() {
		const { params } = this.$nuxt.context

		this.character = await character.byId(params.characterId)
		this.heritages = data.heritage()
		this.startingCP = this.character.cp
	},

	data() {
		return {
			character: null,
			heritages: [],
			startingCP: 0,
		}
	},

	computed: {
		nextPage() {
			if(!this.hasSelected) return ''

			const suffix = this.character.heritage === 'Mortal' ? 'background' : 'divine'

			return `/characters/${this.character._id}/${suffix}`
		},

		hasSelected() {
			return this.character.heritage !== null
		},
	},

	methods: {
		getButtonType(heritage) {
			if(this.isSelected(heritage)) return 'success'
			if(this.hasSelected) return 'default'

			return 'primary'
		},

		isSelected(heritage) {
			console.log('isSelected?', this.character.heritage === heritage)
			return this.character.heritage === heritage.title
		},

		toggleSelected(heritage) {
			if(this.isSelected(heritage)) {
				this.character.heritage = null
				this.character.cp = this.startingCP
			}
			else {
				this.character.heritage = heritage.title
				this.character.cp = this.startingCP - heritage.cost
			}
		},

		async save(done) {
			await character.save(this.character)
			done()
		},
	}
}
</script>