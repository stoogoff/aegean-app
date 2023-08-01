<template>
	<div class="secondary-navigation">
		<character-progress :creator="creator" v-if="creator.character" />
		<article>
			<markdown-content content="characters/background" />
			<accordion-group v-if="creator.character">
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
				v-if="creator.character"
				:next="`/characters/${creator.character.slug}/characteristics`"
				:previous="`/characters/${creator.character.slug}/heritage`"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>
import WithCharacter from '~/mixins/WithCharacter'
import { notNull } from '~/utils/assert'

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
			const obj = this.$backgrounds.byTitle(newValue)

			this.creator.setBackground(obj)
		},
	},

	computed: {
		backgrounds() {
			return this.$backgrounds.all()
		},

		hasSelected() {
			return this.creator.character && notNull(this.creator.character.background)
		},
	},

	methods: {
		onCharacterLoad() {
			this.background = this.creator.character.background
		},
	},
}
</script>
