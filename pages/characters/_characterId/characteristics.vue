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

				<div class="grid grid-cols-5 gap-2">
					<div
						v-for="(ch, idx) in characteristics"
						:key="`charcteristic_${idx}`"
						class="border border-gray-200 rounded-md shadow-md"
					>
						<stat-view :label="ch">
							<span
								v-for="(value, jdx) in selectedPackage.values"
								:key="`charcteristic_${idx}_values_${jdx}`"
								class="mt-4 mr-2"
								:class="{
									'cursor-pointer': canClick(ch, jdx),
									'cursor-not-allowed': !canClick(ch, jdx),
								}"
								@click="toggleCharacteristic(ch, jdx)"
							>
								<tag-view :type="getValueLabel(ch, jdx)">{{value}}</tag-view>
							</span>
							<strong class="text-xl pt-4 pb-3 block">{{ character.characteristics[ch] }}</strong>
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
import {
	CHARACTERISTICS,
	CHARACTERISTIC_MIN,
	CHARACTERISTIC_MAX,
	CHARACTERISTIC_START
} from '~/utils/config'

// choose a characteristic package
// assign allotted points to characteristics
// add any bonus from parentage

const SELECTED_BY_SELF = 1
const SELECTED_BY_OTHER = 2
const NOT_SELECTED = 3
const NOT_SELECTED_BUT_HAS_CHOSEN_ANOTHER = 4


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
			selectedValues: {},
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
			this.selectedValues = {}

			// reset characteristics to starting values
			Object.keys(this.character.characteristics).forEach(ch => this.character.characteristics[ch] = CHARACTERISTIC_START)
		},

		canClick(ch, valueIndex) {
			const state = this.getValueState(ch, valueIndex)

			if(state === SELECTED_BY_SELF) return true
			if(state === SELECTED_BY_OTHER) return false
			if(state === NOT_SELECTED_BUT_HAS_CHOSEN_ANOTHER) return false

			return true
		},

		getValueLabel(ch, valueIndex) {
			const state = this.getValueState(ch, valueIndex)			

			if(state === SELECTED_BY_SELF) return 'success'
			if(state === SELECTED_BY_OTHER) return ''
			if(state === NOT_SELECTED_BUT_HAS_CHOSEN_ANOTHER) return ''

			return 'info'
		},

		getValueState(ch, valueIndex) {
			// the valueIndex has been selected and it's by this characteristic
			if(valueIndex in this.selectedValues && this.selectedValues[valueIndex] === ch) return SELECTED_BY_SELF

			// the valueIndex has been selected by a different characteristic
			if(valueIndex in this.selectedValues) return SELECTED_BY_OTHER

			// the valueIndex hasn't been selected but this characteristic has selected something
			if(Object.values(this.selectedValues).filter(v => v === ch).length > 0) return NOT_SELECTED_BUT_HAS_CHOSEN_ANOTHER

			// the valueIndex has not been selected
			return NOT_SELECTED
		},

		toggleCharacteristic(ch, valueIndex) {
			if(!this.canClick(ch, valueIndex)) return

			const value = this.selectedPackage.values[valueIndex]

			if(valueIndex in this.selectedValues) {
				this.character.characteristics[ch] = CHARACTERISTIC_START
				delete this.selectedValues[valueIndex]
			}
			else {
				this.character.characteristics[ch] = value
				this.selectedValues[valueIndex] = ch
			}
		},

		async save(done) {
			await this.$characters.save(this.character)
			done()
		},
	},
}
</script>
