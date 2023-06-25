<template>
	<div class="secondary-navigation">
		<character-progress :character="character" v-if="character" />
		<article>
			<markdown-content content="characters/skills" />
			<div class="grid grid-cols-2 gap-4 py-4">
				<definition-term
					definition="Skill Increases"
					:term="skillIncreases"
				/>
				<definition-term
						definition="Cost"
						:term="`${cost} CP`"
				/>
			</div>
			<ul class="mb-4">
				<li
					v-for="(skill, idx) in skills"
					:key="`skill_${idx}`"
					class="grid grid-cols-3 py-1 px-2 even:bg-gray-100"
				>
					<strong>{{ skill.title }}</strong>
					<span>{{ skill.value }}</span>
					<span class="btn-group">
						<we-button-action
							small
							type="success"
							:disabled="!canIncrease(skill.title)"
							@click="increaseSkill(skill.title)"
						>+</we-button-action>
						<we-button-action
							small
							type="warning"
							:disabled="!canReduce(skill.title)"
							@click="reduceSkill(skill.title)"
						>-</we-button-action>
					</span>
				</li>
			</ul>
			<step-buttons
				v-if="character"
				:next="`/characters/${character._id}/`"
				:previous="`/characters/${character._id}/careers`"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>

import { SKILLS, SKILL_STARTING_MAX } from '~/utils/config'
import { sum } from '~/utils/list'

const SKILL_PER_CP = 3

export default {
	name: 'CharacterSkillsPage',

	async fetch() {
		const { params } = this.$nuxt.context

		this.character = await this.$characters.byId(params.characterId)
		this.currentSkills = { ...this.character.skills }
	},
	fetchOnServer: false,

	data() {
		return {
			character: null,
			currentSkills: {},
		}
	},

	computed: {
		skills() {
			return SKILLS.map(skill => ({ title: skill, value: this.currentSkills[skill] || 0 }))
		},

		skillIncreases() {
			if(!this.character) return 0

			return Object.values(this.currentSkills).reduce(sum, 0)
				- Object.values(this.character.skills).reduce(sum, 0)
		},

		cost() {
			return Math.ceil(this.skillIncreases / SKILL_PER_CP)
		},

		hasSelected() {
			return true
		},
	},

	methods: {
		increaseSkill(skill) {
			if(this.canIncrease(skill)) {
				this.currentSkills[skill]++

				if(this.skillIncreases % SKILL_PER_CP === 1) {
					this.character.cp -= 1
				}
			}
		},

		reduceSkill(skill) {
			if(this.canReduce(skill)) {
				this.currentSkills[skill]--

				if(this.skillIncreases % SKILL_PER_CP === 0) {
					this.character.cp += 1
				}
			}
		},

		canIncrease(skill) {
			if(
				this.character &&
				this.character.cp - 1 < 0 &&
				this.skillIncreases % SKILL_PER_CP === 0
			) {
				return false
			}

			return this.character && this.currentSkills[skill] < SKILL_STARTING_MAX
		},

		canReduce(skill) {
			return this.character && this.currentSkills[skill] > this.character.skills[skill]
		},

		async save(done) {
			await this.$characters.save(this.character)
			done()
		},
	},
}
</script>
