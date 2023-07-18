<template>
	<div class="secondary-navigation">
		<character-progress :character="character" v-if="character" />
		<article>
			<markdown-content content="characters/background" />
			<accordion-group v-if="character">
				<accordion-item
					v-for="(bg, idx) in backgrounds"
					:key="`background_${idx}`"
					:checked="background === bg.title"
				>
					<template #trigger>
						<div>
							<strong class="text-xl">{{ bg.title }}</strong>
							<small>({{ bg.cost }} CP)</small>
						</div>
					</template>
					<template #content>
						<div class="grid grid-cols-3 mb-4">
							<stat-view label="Standing">{{ bg.standing }}</stat-view>
							<stat-view label="Skills">{{ bg.skills | join }}</stat-view>
							<stat-view label="CP">{{ bg.cost }}</stat-view>
						</div>
						<p>{{ bg.description }}</p>
						<radio-action
							v-model="background"
							:data="bg.title"
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

export default {
	name: 'CharacterBackgroundPage',
	mixins: [ WithCharacter ],

	data() {
		return {
			background: null,
		}
	},

	watch: {
		background(newValue, oldValue) {
			this.setBackground(newValue)
		},
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
		onCharacterLoad() {
			this.background = this.character.background
		},

		setBackground(title) {
			const obj = this.$backgrounds.byTitle(title)

			CharacterCreator.setBackground(obj)
		},
	},
}
</script>
