<template>
	<aside>
		<h3>Progress</h3>
		<section>
			<strong>Creation Points:</strong> {{ character.cp }} / {{ startingCreationPoints }}
		</section>
		<section v-if="hasBackgroundInfo">
			<h4>Background</h4>
			<definition-term
				v-for="(value, key) in backgroundInfo"
				:definition="key"
				:key="key"
			>{{ value }}</definition-term>
		</section>
		<section v-if="hasCharacteristics">
			<h4>Characterisics</h4>
			<definition-term
				v-for="(value, key) in characteristics"
				:definition="key"
				:key="key"
			>{{ value }}</definition-term>
		</section>
		<section v-if="hasSkills">
			<h4>Skills</h4>
			<definition-term
				v-for="(value, key) in skills"
				v-if="value > 0"
				:definition="key"
				:key="key"
			>{{ value }}</definition-term>
		</section>
		<section v-if="hasTalents">
			<h4>Talents</h4>
			<ul class="list">
				<li v-for="(talent, idx) in character.talents" :key="`talent_${idx}`">{{ talent }}</li>
			</ul>
		</section>
		<section v-if="hasGifts">
			<h4>Gifts</h4>
			<ul class="list">
				<li v-for="(gift, idx) in character.gifts" :key="`gift_${idx}`">{{ gift }}</li>
			</ul>
		</section>
	</aside>
</template>
<script>
import Vue from 'vue'
import { toTitleCase } from '~/utils/string'
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

		hasBackgroundInfo() {
			if(!this.character) return false

			return ['heritage', 'parent', 'background', 'careers']
				.map(key => this.character[key])
				.filter(prop => !!prop).length > 0
		},

		backgroundInfo() {
			const info = {}
			const properties = ['heritage', 'parent', 'background']

			properties.forEach(key => {
				if(this.character && this.character[key]) {
					info[toTitleCase(key)] = this.character[key]
				}
			})

			if(this.character && this.character.careers) {
				info['Careers'] = this.character.careers.map(career => career.title).join(', ')
			}

			return info
		},

		hasSkills() {
			return Object.values(this.character.skills).filter(skill => skill > SKILL_MIN).length > 0
		},

		skills() {
			const skills = {}

			Object.keys(this.character.skills).forEach(sk => {
				skills[sk] = (this.character.skills[sk] || 0) + (this.character.skillIncreases[sk] || 0)
			})

			return skills
		},

		hasCareer() {
			return this.character && this.character.careers.length > 0
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

		hasTalents() {
			return this.character && this.character.talents.length > 0
		},

		hasGifts() {
			return this.character && this.character.gifts.length > 0
		},
	},
})
</script>