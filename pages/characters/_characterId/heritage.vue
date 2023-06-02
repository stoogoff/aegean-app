<template>
	<div class="secondary-navigation">
		<character-progress :character="character" v-if="character" />
		<article>
			<markdown-content content="characters/heritage" />
			<accordion-group v-if="character">
				<accordion-item
					v-for="(heritage, idx) in heritages"
					:key="`heritage_${idx}`"
					:checked="character.heritage === heritage.title"
				>
					<template #trigger>
						<div>
							<strong class="text-lg">{{ heritage.title }}</strong>
							<small>({{ heritage.cost }} CP)</small>
						</div>
					</template>
					<template #content>
						<div class="grid grid-cols-3 mb-4">
							<stat-view label="Endurance"> {{ heritage.endurance }}</stat-view>
							<stat-view label="Glory"> {{ heritage.glory }}</stat-view>
							<stat-view label="CP"> {{ heritage.cost }}</stat-view>
						</div>
						<p>{{ heritage.description }}</p>
						<radio-action
							v-model="character.heritage"
							:data="heritage.title"
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
						v-for="(parent, idx) in divinities"
						:key="`parent_${idx}`"
						:checked="character.parent === parent.title"
					>
						<template #trigger>
							<strong class="text-lg">{{ parent.title }}</strong>
						</template>
						<template #content>
							<div class="flex my-4">
								<info-button
									v-for="(gift, idx) in parent.gifts"
									:key="`gift_${parent.title}_${idx}`"
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
								<stat-view label="Skills">{{ join(parent.skills, ', ') }}</stat-view>
								<stat-view label="Specialisation">{{ parent.specialisation }}</stat-view>
								<stat-view label="Characteristics">{{ join(parent.characteristics, ', and ') }}</stat-view>
							</div>
							<p>{{ parent.description }}</p>
							<radio-action
								v-model="character.parent"
								:data="parent.title"
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
				:next="`/characters/${character._id}/background`"
				exit="/characters"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>
import { data } from '~/state'
import { join } from '~/utils/list'
import { HERITAGE_MORTAL, HERITAGE_DIVINE } from '~/utils/config'
import {
	addSkills, removeSkills,
	addCharacteristics, removeCharacteristics,
	hasDivineHeritage
} from '~/utils/character'

// choose heritage:
// 1. mortal
// 2. divine, choose parentage:
// 	parent:
// 		3 skills
// 		1 characteristic
// 		1 specialisation
// 		choose 1 of 3 gifts
// with a variation for Zeus

export default {
	name: 'CharacterHeritagePage',

	async fetch() {
		const { params } = this.$nuxt.context

		this.character = await this.$characters.byId(params.characterId)

		// setup watchers here so they're not applied when the character is set
		this.$watch('character.heritage', (newValue, oldValue) => {
			const divine = this.$heritages.byTitle(HERITAGE_DIVINE)

			if(oldValue === HERITAGE_DIVINE || newValue === HERITAGE_MORTAL) {
				this.character.parent = null
				this.character.cp += divine.cost
			}

			if(oldValue === HERITAGE_MORTAL || newValue === HERITAGE_DIVINE) {
				this.character.cp -= divine.cost
			}
		})

		this.$watch('character.parent', (newValue, oldValue) => {
			if(oldValue !== null && oldValue !== undefined) {
				this.removeParent(oldValue)
			}

			if(newValue !== null && newValue !== undefined) {
				this.addParent(newValue)
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
		heritages() {
			return this.$heritages.all()
		},

		divinities() {
			return this.$divinities.all()
		},

		hasDivineHeritage() {
			return hasDivineHeritage(this.character)
		},

		isMortalHeritage() {
			return this.character && this.character.heritage === HERITAGE_MORTAL
		},

		hasSelected() {
			if(this.isMortalHeritage) return true
			if(this.hasDivineHeritage && this.character.parent !== null) return true

			return false
		},
	},

	methods: {
		join(arr, joiner) {
			return join(joiner)(arr)
		},

		removeParent(title) {
			const obj = this.$divinities.byTitle(title)

			removeSkills(obj.skills, this.character)
			removeCharacteristics(obj.characteristics, this.character)
		},

		addParent(title) {
			const obj = this.$divinities.byTitle(title)

			addSkills(obj.skills, this.character)
			addCharacteristics(obj.characteristics, this.character)
		},

		getGift(title) {
			return this.$gifts.byTitle(title)
		},

		async save(done) {
			await this.$characters.save(this.character)
			done()
		},
	}
}
</script>