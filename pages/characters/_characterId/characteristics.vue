<template>
	<div class="secondary-navigation">
		<character-progress :creator="creator" v-if="creator.character" />
		<article>
			<markdown-content content="characters/characteristics" />
			<accordion-group v-if="creator.character">
				<accordion-item
					v-for="(characteristic, idx) in characteristicPackages"
					:key="`package_${idx}`"
					:checked="creator.character.characteristicPackage === characteristic.title"
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
							v-model="creator.character.characteristicPackage"
							:data="characteristic.title"
							block
							outlined
						>
							Select
						</radio-action>
					</template>
				</accordion-item>
			</accordion-group>
			<div v-if="mustChooseCharacteristics" class="my-8">
				<h3>Characteristics</h3>
				<p>Use the buttons by each characteristic to choose its value. If your character has divine heritage the bonus is noted next to the value and will be applied later.</p>
				<div class="grid grid-cols-2 md:grid-cols-5 gap-2">
					<div
						v-for="(ch, idx) in characteristics"
						:key="`charcteristic_${idx}`"
						class="border border-gray-200 rounded-md shadow-md"
					>
						<stat-view :label="ch">
							<div class="btn-group">
								<we-button-action
									v-for="(value, jdx) in selectedPackage.values"
									:key="`characteristic_${idx}_values_${jdx}`"
									:disabled="!canClick(ch, jdx)"
									small
									:type="getValueLabel(ch, jdx)"
									@click="toggleCharacteristic(ch, jdx)"
								>
									{{value}}
								</we-button-action>
							</div>
							<strong class="text-xl pt-4 pb-3 block">
								{{ creator.character.characteristics[ch] }}
								<span v-if="hasDivineHeritageBonus(ch)">+ {{ divineHeritageBonus(ch) }}</span>
							</strong>
						</stat-view>
					</div>
				</div>
			</div>
			<step-buttons
				v-if="creator.character"
				:next="`/characters/${creator.character.slug}/careers`"
				:previous="`/characters/${creator.character.slug}/background`"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>
import WithCharacter from '~/mixins/WithCharacter'
import {
	CHARACTERISTICS,
	CHARACTERISTIC_MIN,
	CHARACTERISTIC_MAX,
	CHARACTERISTIC_START
} from '~/utils/config'
import { notNull } from '~/utils/assert'

// choose a characteristic package
// assign allotted points to characteristics
// add any bonus from parentage
// selectedValues array:
// [index matching the selectedPackage.values array] = characteristic name

const SELECTED_BY_SELF = 1
const SELECTED_BY_OTHER = 2
const NOT_SELECTED = 3
const NOT_SELECTED_BUT_HAS_CHOSEN_ANOTHER = 4


export default {
	name: 'CharacterCharacteristicsPage',
	mixins: [ WithCharacter ],

	data() {
		return {
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

		selectedPackage() {
			return this.$characteristics.byTitle(this.creator.character.characteristicPackage)
		},

		hasPackage() {
			return this.creator.character && !!this.creator.character.characteristicPackage
		},

		mustChooseCharacteristics() {
			return this.hasPackage && this.creator.character.characteristicPackage !== 'Average'
		},

		hasSelected() {
			return this.hasPackage && Object.keys(this.selectedValues).length === this.selectedPackage.values.length
		},
	},

	methods: {
		onCharacterLoad() {
			// a characteristic package has been chosen so prefill values
			if(notNull(this.creator.character.characteristicPackage)) {
				// get values from selected package
				const values = [ ...this.selectedPackage.values ]

				// go through the values in the package
				Object.keys(this.creator.character.characteristics).forEach(ch => {
					if(this.creator.character.characteristics[ch] > CHARACTERISTIC_START) {
						// if there's a match in the characteristics set it
						const index = values.indexOf(this.creator.character.characteristics[ch])

						if(index !== -1) {
							this.selectedValues[index] = ch
							values[index] = 0
						}
					}
				})
			}

			this.$watch('character.characteristicPackage', (newValue, oldValue) => {
				if(notNull(oldValue)) {
					this.removePackage(oldValue)
				}

				if(notNull(newValue)) {
					this.addPackage(newValue)
				}
			})
		},

		hasDivineHeritageBonus(ch) {
			return this.divineHeritageBonus(ch) > 0
		},

		divineHeritageBonus(ch) {
			if(!this.creator.hasDivineHeritage) return 0

			const obj = this.$divinities.byTitle(this.creator.character.parent)

			return obj.characteristics.includes(ch) ? 1 : 0
		},

		removePackage(title) {
			const obj = this.$characteristics.byTitle(title)

			this.creator.removeCharacteristicPackage(obj)
		},

		addPackage(title) {
			const obj = this.$characteristics.byTitle(title)

			this.creator.addCharacteristicPackage(obj)
			this.selectedValues = {}
		},

		canClick(ch, valueIndex) {
			const state = this.getValueState(ch, valueIndex)

			switch(state) {
				case SELECTED_BY_SELF: return true
				case SELECTED_BY_OTHER: return false
				case NOT_SELECTED_BUT_HAS_CHOSEN_ANOTHER: return false
				default: return true
			}
		},

		getValueLabel(ch, valueIndex) {
			const state = this.getValueState(ch, valueIndex)			

			switch(state) {
				case SELECTED_BY_SELF: return 'success'
				case SELECTED_BY_OTHER: return ''
				case NOT_SELECTED_BUT_HAS_CHOSEN_ANOTHER: return ''
				default: return 'info'
			}
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
				this.creator.character.characteristics[ch] = CHARACTERISTIC_START
				delete this.selectedValues[valueIndex]
				this.selectedValues = { ...this.selectedValues }
			}
			else {
				this.creator.character.characteristics[ch] = value
				this.selectedValues = { ...this.selectedValues, [valueIndex]: ch }
			}
		},
	},
}
</script>
