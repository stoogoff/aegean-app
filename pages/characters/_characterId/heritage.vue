<template>
	<div class="secondary-navigation">
		<character-progress :character="character" v-if="character" />
		<article>
			<markdown-content content="characters/heritage" />
			<div v-if="character">
				<div
					class="mb-4 p-6 rounded-lg shadow-lg"
					v-for="(heritage, idx) in heritages"
					:key="`heritage_${idx}`"
				>
					<div class="grid grid-cols-5">
						<!--optional expander with paragraph in collapsed bit-->
						<div>expand</div>
						<strong class="text-xl">{{ heritage.title }}</strong>
						<div class="flex flex-col text-center">
							<span>{{ heritage.endurance }}</span>
							<span class="text-sm text-gray-500 uppercase">Endurance</span>
						</div>
						<div class="flex flex-col text-center">
							<span>{{ heritage.glory }}</span>
							<span class="text-sm text-gray-500 uppercase">Glory</span>
						</div>
						<radio-group v-model="character.heritage" :data="heritage.title" :label="`${heritage.cost} CP`" />
					</div>
					<p>{{ heritage.description }}</p>
				</div>
			</div>
			<div v-if="isDivineHeritage">
				<h3>Divine Parent</h3>
				<div
					class="mb-4 p-6 rounded-lg shadow-lg"
					v-for="(parent, idx) in divinities"
					:key="`parent_${idx}`"
				>
					<div class="grid grid-cols-5">
						<!--optional expander with paragraph in collapsed bit-->
						<div>expand</div>
						<strong class="text-xl">{{ parent.title }}</strong>
						<div class="col-span-2">
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
						<radio-group v-model="character.parent" :data="parent.title" />
					</div>
					<div class="grid grid-cols-5">
						<div class="col-start-2 flex flex-col text-center">
							<span class="text-sm text-gray-500 uppercase">Skills</span>
							<span>{{ parent.skills | join }}</span>
						</div>
						<div class="flex flex-col text-center">
							<span class="text-sm text-gray-500 uppercase">Specialisation</span>
							<span>{{ parent.specialisation }}</span>
						</div>
						<div class="flex flex-col text-center">
							<span class="text-sm text-gray-500 uppercase">Characteristics</span>
							<span>{{ parent.characteristics | join-and }}</span>
						</div>
					</div>
					<p>{{ parent.description }}</p>
				</div>
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
import { character, data } from '~/state'

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

		this.character = await character.byId(params.characterId)
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
		findDivinityByTitle(title) {
			return this.divinities.find(divinity => divinity.title === title)
		},

		removeSkills(title) {
			const divinity = this.findDivinityByTitle(title)

			divinity.skills.forEach(skill =>
				this.character.skills[skill] = Math.max(this.character.skills[skill] - 1, 0)
			)
		},

		addSkills(title) {
			const divinity = this.findDivinityByTitle(title)

			divinity.skills.forEach(skill =>
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