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
import WithCharacter from '~/mixins/WithCharacter'
import CharacterCreator from '~/utils/character/creator'
import { join } from '~/utils/list'

export default {
	name: 'CharacterBackgroundPage',
	mixins: [ WithCharacter ],

	mounted() {
		this.$watch('character.background', (newValue, oldValue) => {
			if(oldValue !== null && oldValue !== undefined) {
				this.removeBackground(oldValue)
			}

			if(newValue !== null && newValue !== undefined) {
				this.addBackground(newValue)
			}
		})
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

			CharacterCreator.removeBackground(obj)
		},

		addBackground(title) {
			const obj = this.$backgrounds.byTitle(title)

			CharacterCreator.addBackground(obj)
		},
	},
}
</script>
