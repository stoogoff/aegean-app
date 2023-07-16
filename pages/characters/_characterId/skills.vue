<template>
	<div class="secondary-navigation">
		<character-progress :character="character" v-if="character" />
		<article>
			<markdown-content content="characters/skills" />
			<div class="grid grid-cols-2 gap-4 py-4">
				<definition-term definition="Skill Increases">{{ skillIncreases }}</definition-term>
				<definition-term definition="Cost">{{ cost }} CP</definition-term>
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
				:next="`/characters/${character.slug}/advantages`"
				:previous="`/characters/${character.slug}/careers`"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>
import WithCharacter from '~/mixins/WithCharacter'
import CharacterCreator from '~/utils/character/creator'
import { SKILLS_PER_CP, SKILLS, SKILL_STARTING_MAX } from '~/utils/config'
import { sum } from '~/utils/list'

export default {
	name: 'CharacterSkillsPage',
	mixins: [ WithCharacter ],

	computed: {
		skills() {
			if(!this.character) return []

			return SKILLS.map(skill => (
				{
					title: skill,
					value: 
						(this.character.skills[skill] || 0) +
						(this.character.skillIncreases[skill] || 0)
				}
			))
		},

		skillIncreases() {
			if(!this.character) return 0

			return Object.values(this.character.skillIncreases).reduce(sum, 0)
		},

		cost() {
			return Math.ceil(this.skillIncreases / SKILLS_PER_CP)
		},

		hasSelected() {
			return true
		},
	},

	methods: {
		increaseSkill(skill) {
			CharacterCreator.increaseSkill(skill)
		},

		reduceSkill(skill) {
			CharacterCreator.reduceSkill(skill)
		},

		canIncrease(skill) {
			return CharacterCreator.canIncreaseSkill(skill)
		},

		canReduce(skill) {
			return CharacterCreator.canReduceSkill(skill)
		},
	},
}
</script>
