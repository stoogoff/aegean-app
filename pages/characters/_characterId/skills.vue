<template>
	<div class="secondary-navigation">
		<character-progress :creator="creator" v-if="creator.character" />
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
				v-if="creator.character"
				:next="`/characters/${creator.character.slug}/advantages`"
				:previous="`/characters/${creator.character.slug}/careers`"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>
import WithCharacter from '~/mixins/WithCharacter'
import { SKILLS_PER_CP, SKILLS, SKILL_STARTING_MAX } from '~/utils/config'

export default {
	name: 'CharacterSkillsPage',
	mixins: [ WithCharacter ],

	computed: {
		skills() {
			if(!this.creator.character) return []

			return SKILLS.map(skill => (
				{
					title: skill,
					value: 
						(this.creator.character.skills[skill] || 0) +
						(this.creator.character.skillIncreases[skill] || 0)
				}
			))
		},

		skillIncreases() {
			return this.creator.totalSkillIncreases
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
			this.creator.increaseSkill(skill)
		},

		reduceSkill(skill) {
			this.creator.reduceSkill(skill)
		},

		canIncrease(skill) {
			return this.creator.canIncreaseSkill(skill)
		},

		canReduce(skill) {
			return this.creator.canReduceSkill(skill)
		},
	},
}
</script>
