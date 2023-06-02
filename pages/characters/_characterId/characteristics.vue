<template>
	<div class="secondary-navigation">
		<character-progress :character="character" v-if="character" />
		<article>
			<markdown-content content="characters/characteristics" />
			<accordion-group v-if="character">
				<accordion-item
					v-for="(characteristic, idx) in characteristicPackages"
					:key="`package_${idx}`"
					:checked="character.characteristicPackage === characteristic.title"
				>
					<template #trigger>
						<div>
							<strong class="text-xl">{{ characteristic.title }}</strong>
							<small>({{ characteristic.cost }} CP)</small>
						</div>
					</template>
					<template #content>
						<render-markdown :content="characteristic.description" />
						<radio-action
							v-model="character.characteristicPackage"
							:data="characteristic.title"
							block
							outlined
						>
							Select
						</radio-action>
					</template>
				</accordion-item>
			</accordion-group>
			<div v-if="hasPackage" class="my-8">
				<h3>Characteristics</h3>

				<div class="mb-2">
					<span
						v-for="(value, idx) in selectedPackage.values"
						:key="`values_${idx}`"
						class="mr-2"
					>
						<tag-view>{{value}}</tag-view>
					</span>
				</div>

				<div class="grid grid-cols-5 gap-2">
					<div
						v-for="(characteristic, idx) in characteristics"
						:key="`charcteristic_${idx}`"
						class="border border-gray-200 rounded-md shadow-md"
					>
						<stat-view :label="characteristic">
							<strong class="text-xl pt-4 pb-3 block">{{ character.characteristics[characteristic] }}</strong>
						</stat-view>
					</div>
				</div>
			</div>
			<step-buttons
				v-if="character"
				:next="`/characters/${character._id}/`"
				:previous="`/characters/${character._id}/background`"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>

import { hasDivineHeritage } from '~/utils/character'
import { CHARACTERISTICS, CHARACTERISTIC_MIN, CHARACTERISTIC_MAX } from '~/utils/config'

// choose a characteristic package
// assign allotted points to characteristics
// add any bonus from parentage

export default {
	name: 'CharacterBackgroundPage',

	async fetch() {
		const { params } = this.$nuxt.context

		this.character = await this.$characters.byId(params.characterId)
console.log(this.character)
		this.$watch('character.characteristicPackage', (newValue, oldValue) => {
			if(oldValue !== null && oldValue !== undefined) {
				this.removePackage(oldValue)
			}

			if(newValue !== null && newValue !== undefined) {
				this.addPackage(newValue)
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
		characteristicPackages() {
			return this.$characteristics.all()
		},

		characteristics() {
			return CHARACTERISTICS
		},

		hasDivineHeritage() {
			return hasDivineHeritage(this.character)
		},

		selectedPackage() {
			return this.$characteristics.byTitle(this.character.characteristicPackage)
		},

		hasPackage() {
			return this.character && !!this.character.characteristicPackage && this.character.characteristicPackage !== 'Average'
		},

		hasSelected() {
			return false
		},
	},

	methods: {
		removePackage(title) {
			const obj = this.$characteristics.byTitle(title)

			this.character.cp += obj.cost
		},

		addPackage(title) {
			const obj = this.$characteristics.byTitle(title)

			this.character.cp -= obj.cost
		},

		async save(done) {
			await this.$characters.save(this.character)
			done()
		},
	},
}
</script>
