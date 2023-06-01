<template>
	<div class="secondary-navigation">
		<character-progress :character="character" v-if="character" />
		<article>
			<!--markdown-content content="characters/heritage" /-->
			<accordion-group v-if="character">
				<accordion-item
					v-for="(heritage, idx) in heritages"
					:key="`heritage_${idx}`"
					:checked="character.heritage === heritage.title"
				>
					<template #trigger>
						<strong class="text-xl">{{ heritage.title }}</strong>
					</template>
					<template #content>
						<div class="grid grid-cols-3 mb-4">
							<stat-view label="Endurance" :value="heritage.endurance" />
							<stat-view label="Glory" :value="heritage.glory" />
							<stat-view label="CP" :value="heritage.cost" />
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
			<div v-if="isDivineHeritage">
				<h3>Divine Parent</h3>
				<p>Choose your divine parent from those below.</p>
				<accordion-group>
					<accordion-item
						v-for="(parent, idx) in divinities"
						:key="`parent_${idx}`"
						:checked="character.parent === parent.title"
					>
						<template #trigger>
							<strong class="text-xl">{{ parent.title }}</strong>
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
								<stat-view label="Skills" :value="join(parent.skills, ', ')" />
								<stat-view label="Specialisation" :value="parent.specialisation" />
								<stat-view
									label="Characteristics"
									:value="join(parent.characteristics, ', and ')"
								/>
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
	layout: 'full-width',

	async fetch() {
		const { params } = this.$nuxt.context

		this.character = await this.$character.byId(params.characterId)
		this.startingCP = this.character.cp

		// setup watchers here so they're not applied when the character is set
		this.$watch('character.heritage', (newValue, oldValue) => {
			if(oldValue === 'Divine' && newValue === 'Mortal') {
				this.character.parent = null
			}
		})

		this.$watch('character.parent', (newValue, oldValue) => {
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
			startingCP: 0,
		}
	},

	computed: {
		heritages() {
			return data.heritages()
		},

		divinities() {
			return data.divinities()
		},

		isDivineHeritage() {
			return this.character && this.character.heritage === 'Divine'
		},

		isMortalHeritage() {
			return this.character && this.character.heritage === 'Mortal'
		},

		hasSelected() {
			if(this.isMortalHeritage) return true
			if(this.isDivineHeritage && this.character.parent !== null) return true

			return false
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
			const obj = this.findByTitle(this.divinities, title)

			obj.skills.forEach(skill =>
				this.character.skills[skill] = Math.max(this.character.skills[skill] - 1, 0)
			)
		},

		addSkills(title) {
			const obj = this.findByTitle(this.divinities, title)

			obj.skills.forEach(skill =>
				this.character.skills[skill] += 1
			)
		},

		getGift(title) {
			return data.getGiftByTitle(title)
		},

		async save(done) {
			await character.save(this.character)
			done()
		},
	}
}
</script>