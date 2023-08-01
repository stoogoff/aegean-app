<template>
	<aside class="pt-16">
		<h3>Progress</h3>
		<section>
			<strong>Creation Points:</strong> {{ currentCreationPoints }} / {{ startingCreationPoints }}
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
				<li v-for="(talent, idx) in creator.character.talents" :key="`talent_${idx}`">{{ talent }}</li>
			</ul>
		</section>
		<section v-if="hasGifts">
			<h4>Gifts</h4>
			<ul class="list">
				<li v-for="(gift, idx) in creator.character.gifts" :key="`gift_${idx}`">{{ gift }}</li>
			</ul>
		</section>
	</aside>
</template>
<script>
import Vue from 'vue'
import { toTitleCase } from '~/utils/string'
import {
	STARTING_CREATION_POINTS,
	CHARACTERISTIC_MIN, SKILL_MIN,
} from '~/utils/config'
import { notNull } from '~/utils/assert'

export default Vue.component('CharacterProgress', {
	props: {
		creator: {
			type: Object,
			required: true,
		},
	},

	computed: {
		startingCreationPoints() {
			return STARTING_CREATION_POINTS
		},

		currentCreationPoints() {
			return this.creator.cp
		},

		hasBackgroundInfo() {
			if(!this.creator.character) return false

			return ['heritage', 'parent', 'background', 'careers']
				.map(key => this.creator.character[key])
				.filter(prop => !!prop).length > 0
		},

		backgroundInfo() {
			const info = {}
			const properties = ['heritage', 'parent', 'background']

			properties.forEach(key => {
				if(this.creator.character && this.creator.character[key]) {
					info[toTitleCase(key)] = this.creator.character[key]
				}
			})

			if(this.creator.character && this.creator.character.careers && this.creator.character.careers.length > 0) {
				info['Careers'] = this.creator.character.careers.map(career => career.title).join(', ')
			}

			return info
		},

		hasSkills() {
			return Object.values(this.creator.character.skills).filter(skill => skill > SKILL_MIN).length > 0
		},

		skills() {
			const skills = {}

			Object.keys(this.creator.character.skills).forEach(sk => {
				skills[sk] = (this.creator.character.skills[sk] || 0) + (this.creator.character.skillIncreases[sk] || 0)
			})

			return skills
		},

		hasCareer() {
			return this.creator.character && this.creator.character.careers.length > 0
		},

		hasCharacteristics() {
			return notNull(this.creator.character.characteristicPackage)
		},

		characteristics() {
			// get the character's characteristics and apply any divine bonus to them
			if(this.creator.hasDivineHeritage) {
				const parent = this.$divinities.byTitle(this.creator.character.parent)
				const clone = {}

				clone.characteristics = { ...this.creator.character.characteristics }

				return clone.characteristics
			}

			return this.creator.character.characteristics
		},

		hasTalents() {
			return this.creator.character && this.creator.character.talents.length > 0
		},

		hasGifts() {
			return this.creator.character && this.creator.character.gifts.length > 0
		},
	},
})
</script>