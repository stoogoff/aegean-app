<template>
	<div class="secondary-navigation">
		<character-progress :character="character" v-if="character" />
		<article>
			<markdown-content content="characters/heritage" />
			<accordion-group v-if="character">
				<accordion-item
					v-for="(htg, idx) in heritages"
					:key="`heritage_${idx}`"
					:checked="heritage === htg.title"
				>
					<template #trigger>
						<div>
							<strong class="text-lg">{{ htg.title }}</strong>
							<small>({{ htg.cost }} CP)</small>
						</div>
					</template>
					<template #content>
						<div class="grid grid-cols-3 mb-4">
							<stat-view label="Endurance"> {{ htg.endurance }}</stat-view>
							<stat-view label="Glory"> {{ htg.glory }}</stat-view>
							<stat-view label="CP"> {{ htg.cost }}</stat-view>
						</div>
						<p>{{ htg.description }}</p>
						<radio-action
							v-model="heritage"
							:data="htg.title"
							block
							outlined
						>
							Select
						</radio-action>
					</template>
				</accordion-item>
			</accordion-group>
			<div v-if="hasDivineHeritage" class="mt-8">
				<h3>Divine Parent</h3>
				<p>Choose your divine parent from those below.</p>
				<accordion-group>
					<accordion-item
						v-for="(prt, idx) in divinities"
						:key="`parent_${idx}`"
						:checked="parent === prt.title"
					>
						<template #trigger>
							<strong class="text-lg">{{ prt.title }}</strong>
						</template>
						<template #content>
							<div class="flex my-4">
								<info-button
									v-for="(gift, idx) in prt.gifts"
									:key="`gift_${prt.title}_${idx}`"
									small outlined
								>
									{{ gift }}
									<template #info>
										<card-view :title="gift">
											<render-markdown :content="getGift(gift).description" />
										</card-view>
									</template>
								</info-button>
							</div>
							<div class="grid grid-cols-3 mb-4">
								<stat-view label="Skills">{{ prt.skills | join }}</stat-view>
								<stat-view label="Specialisation">{{ prt.specialisation }}</stat-view>
								<stat-view label="Characteristics">{{ prt.characteristics | join-and }}</stat-view>
							</div>
							<p>{{ prt.description }}</p>
							<radio-action
								v-model="parent"
								:data="prt.title"
								block
								outlined
							>
								Select
							</radio-action>
						</template>
					</accordion-item>
				</accordion-group>
			</div>
			<step-buttons
				v-if="character"
				:next="`/characters/${character.slug}/background`"
				exit="/characters"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>
import WithCharacter from '~/mixins/WithCharacter'
import CharacterCreator from '~/utils/character/creator'
import { HERITAGE_MORTAL, HERITAGE_DIVINE } from '~/utils/config'

// choose heritage:
// 1. mortal
// 2. divine, choose parentage:
// 	parent:
// 		3 skills
// 		1 characteristic
// 		1 specialisation
// 		choose 1 of 3 gifts TODO
// with a variation for Zeus TODO

export default {
	name: 'CharacterHeritagePage',
	mixins: [ WithCharacter ],

	data() {
		return {
			heritage: null,
			parent: null,
		}
	},

	watch: {
		heritage(newValue, oldValue) {
			const obj = this.$heritages.byTitle(newValue)

			CharacterCreator.setHeritage(obj)
		},

		parent(newValue, oldValue) {
			if(oldValue !== null && oldValue !== undefined) {
				this.removeParent(oldValue)
			}

			if(newValue !== null && newValue !== undefined) {
				this.addParent(newValue)
			}
		},
	},

	computed: {
		heritages() {
			return this.$heritages.all()
		},

		divinities() {
			return this.$divinities.all()
		},

		hasDivineHeritage() {
			//return CharacterCreator.hasDivineHeritage
			return this.character && this.character.heritage === HERITAGE_DIVINE
		},

		hasSelected() {
			if(CharacterCreator.hasMortalHeritage) return true
			if(CharacterCreator.hasDivineHeritage && this.character.parent !== null) return true

			return false
		},
	},

	methods: {
		onCharacterLoad() {
			this.heritage = this.character.heritage
			this.parent = this.character.parent
		},

		removeParent(title) {
			const obj = this.$divinities.byTitle(title)

			CharacterCreator.removeParent(obj)
		},

		addParent(title) {
			const obj = this.$divinities.byTitle(title)

			CharacterCreator.addParent(obj)
		},

		getGift(title) {
			return this.$gifts.byTitle(title)
		},
	}
}
</script>