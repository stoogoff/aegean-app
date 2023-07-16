<template>
	<div class="secondary-navigation">
		<character-progress :character="character" v-if="character" />
		<article>
			<markdown-content content="characters/background" />
			<accordion-group v-if="character">
				<accordion-item
					v-for="(background, idx) in backgrounds"
					:key="`background_${idx}`"
					:checked="character.background === background.title"
				>
					<template #trigger>
						<div>
							<strong class="text-xl">{{ background.title }}</strong>
							<small>({{ background.cost }} CP)</small>
						</div>
					</template>
					<template #content>
						<div class="grid grid-cols-3 mb-4">
							<stat-view label="Standing">{{ background.standing }}</stat-view>
							<stat-view label="Skills">{{ join(background.skills, ', ') }}</stat-view>
							<stat-view label="CP">{{ background.cost }}</stat-view>
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
				:next="`/characters/${character.slug}/characteristics`"
				:previous="`/characters/${character.slug}/heritage`"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>
import { join } from '~/utils/list'
import { addSkills, removeSkills } from '~/utils/character'

export default {
	name: 'CharacterBackgroundPage',

	async fetch() {
		const { params } = this.$nuxt.context

		this.character = await this.$characters.byId(params.characterId)

		this.$watch('character.background', (newValue, oldValue) => {
			if(oldValue !== null && oldValue !== undefined) {
				this.removeBackground(oldValue)
			}

			if(newValue !== null && newValue !== undefined) {
				this.addBackground(newValue)
			}
		})
	},
	fetchOnServer: false,

	data() {
		return {
			character: null,
		}
	},

	computed: {
		backgrounds() {
			return this.$backgrounds.all()
		},

		hasSelected() {
			return this.character && this.character.background !== null
		},
	},

	methods: {
		join(arr, joiner) {
			return join(joiner)(arr)
		},

		removeBackground(title) {
			const obj = this.$backgrounds.byTitle(title)

			removeSkills(obj.skills, this.character)
			this.character.cp += obj.cost
		},

		addBackground(title) {
			const obj = this.$backgrounds.byTitle(title)

			addSkills(obj.skills, this.character)
			this.character.cp -= obj.cost
		},

		async save(done) {
			await this.$characters.save(this.character)
			done()
		},
	},
}
</script>
