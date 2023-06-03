<template>
	<aside>
		<h3>Progress</h3>
		<section>
			<strong>Creation Points:</strong> {{ character.cp }} / {{ startingCreationPoints }}
		</section>
		<section v-if="character.heritage">
			<div><strong>Heritage:</strong> {{ character.heritage }}</div>
			<div v-if="character.parent"><strong>Parent:</strong> {{ character.parent }}</div>
			<div>
				<we-link-action
					small
					outline
					:to="`/characters/${character._id}/heritage`"
				>Edit</we-link-action>
			</div>
		</section>
		<section>
			<div v-if="character.background"><strong>Background:</strong> {{ character.background }}</div>
			<div v-if="character.startingCareer"><strong>Career:</strong> {{ character.startingCareer }}</div>
		</section>
		<section v-if="hasCharacteristics">
			<div><strong>Characterisics</strong></div>
			<definition-term
				v-for="(value, key) in characteristics"
				:definition="key"
				:term="value"
				:key="key"
			/>
		</section>
		<section v-if="hasSkills">
			<div><strong>Skills</strong></div>
			<definition-term
				v-for="(value, key) in character.skills"
				v-if="value > 0"
				:definition="key"
				:term="value"
				:key="key"
			/>
		</section>
	</aside>
</template>
<script>
import Vue from 'vue'
import { hasDivineHeritage, addCharacteristics } from '~/utils/character'
import { STARTING_CREATION_POINTS, CHARACTERISTIC_MIN, SKILL_MIN } from '~/utils/config'

export default Vue.component('CharacterProgress', {
	props: {
		character: {
			type: Object,
			required: true,
		},
	},

	computed: {
		startingCreationPoints() {
			return STARTING_CREATION_POINTS
		},

		hasSkills() {
			return Object.values(this.character.skills).filter(skill => skill > SKILL_MIN).length > 0
		},

		hasCharacteristics() {
			return Object.values(this.character.characteristics).filter(ch => ch > CHARACTERISTIC_MIN).length > 0
		},

		characteristics() {
			// get the character's characteristics and apply any divine bonus to them
			if(hasDivineHeritage(this.character)) {
				const parent = this.$divinities.byTitle(this.character.parent)
				const clone = {}

				clone.characteristics = { ...this.character.characteristics }
				addCharacteristics(parent.characteristics, clone)

				return clone.characteristics
			}

			return this.character.characteristics
		},
	},
})
</script>