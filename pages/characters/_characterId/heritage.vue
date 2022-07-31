<template>
	<div class="two-column">
		<character-progress :character="character" v-if="character" />
		<article>
			<markdown-content content="characters/heritage" />
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
			<step-buttons
				v-if="character"
				:next="`/characters/${character.id}/finish`"
				:previous="`/characters/${character.id}/abilities`"
				:disabled="!canContinue"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>

import { character, chargen } from '~/state'

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
		this.heritages = chargen.heritage()
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
		canContinue() {
			return this.hasSelected
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
			return this.character.heritage === heritage
		},

		toggleSelected(heritage) {
			if(this.isSelected(heritage)) {
				this.character.heritage = null
				this.character.cp = this.startingCP
			}
			else {
				this.character.heritage = heritage
				this.character.cp = this.startingCP - heritage.cost
			}
		},

		save() {

		},
	}
}
</script>