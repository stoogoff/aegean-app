<template>
	<div class="secondary-navigation">
		<character-progress :character="character" v-if="character" />
		<article>
			<!-- markdown-content content="characters/background" / -->
			<accordion-group v-if="character">
				<accordion-item
					v-for="(background, idx) in backgrounds"
					:key="`background_${idx}`"
					:checked="character.background === background.title"
				>
					<template #trigger>
						<strong class="text-xl">{{ background.title }}</strong>
					</template>
					<template #content>
						<div class="grid grid-cols-3 mb-4">
							<stat-view label="Standing" :value="background.standing" />
							<stat-view label="Skills" :value="join(background.skills, ', ')" />
							<stat-view label="CP" :value="background.cost" />
						</div>
						<p>{{ background.description }}</p>
						<radio-action
							v-model="character.background"
							:data="background.title"
							block
							outlined
						>
							Select
						</radio-action>
					</template>
				</accordion-item>
			</accordion-group>
			<step-buttons
				v-if="character"
				:next="`/characters/${character._id}/`"
				:previous="`/characters/${character._id}/heritage`"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>
import { data } from '~/state'
import { join } from '~/utils/list'

export default {
	name: 'CharacterBackgroundPage',
	layout: 'full-width',

	async fetch() {
		const { params } = this.$nuxt.context

		this.character = await this.$character.byId(params.characterId)

		this.$watch('character.background', (newValue, oldValue) => {
			if(oldValue !== null && oldValue !== undefined) {
				this.removeSkills(oldValue)
			}

			if(newValue !== null && newValue !== undefined) {
				this.addSkills(newValue)
			}
		})
	},

	data() {
		return {
			character: null,
		}
	},

	computed: {
		backgrounds() {
			return data.backgrounds()
		},

		hasSelected() {
			return this.character && this.character.background !== null
		},
	},

	methods: {
		join(arr, joiner) {
			return join(joiner)(arr)
		},

		findByTitle(list, title) {
			return list.find(item => item.title === title)
		},

		removeSkills(title) {
			const obj = this.findByTitle(this.backgrounds, title)

			obj.skills.forEach(skill =>
				this.character.skills[skill] = Math.max(this.character.skills[skill] - 1, 0)
			)
		},

		addSkills(title) {
			const obj = this.findByTitle(this.backgrounds, title)

			obj.skills.forEach(skill =>
				this.character.skills[skill] += 1
			)
		},

		async save(done) {
			await character.save(this.character)
			done()
		},
	},
}
</script>
