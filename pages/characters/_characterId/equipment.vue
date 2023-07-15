<template>
	<div class="secondary-navigation">
		<character-progress :character="character" v-if="character" />
		<article>
			<markdown-content content="characters/equipment" />

			<div class="columns-2 pb-2">
				<definition-term definition="Encumbrance">
					{{ currentEncumbrance | fraction }} of {{ totalEncumbrance }}
				</definition-term>
				<tag-view v-if="currentEncumbrance > totalEncumbrance" type="warning">Over-encumbered</tag-view>
			</div>

			<accordion-group>
				<accordion-item
					v-for="(category, idx) in categories"
					:key="`category_${idx}`"
				>
					<template #trigger>
						<strong class="text-xl">{{ category.title }}</strong>
					</template>
					<template #content>
						<table class="table-auto w-full">
							<thead>
								<tr>
									<th>Name</th>
									<th>Price</th>
									<th>Weight</th>
									<th>Availability</th>
									<th>&nbsp;</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="(item, jdx) in category.equipment"
									:key="`category_${idx}_${jdx}`"
								>
									<td>
										<we-check-box
											:value="isItemSelected(item.title)"
											:label="item.title"
											:disabled="!canPurchase(item)"
											@input="toggleItem(item)"
										/>
									</td>
									<td>{{ item.price }}</td>
									<td v-if="'weight' in item">{{ item.weight | fraction }}</td>
									<td v-else>&mdash;</td>
									<td>{{ item.availability }}</td>
									<td>
										<info-button
											small outlined wide
											x="right"
										>
											More Info
											<template #info>
												<card-view :title="item.title">
													<render-markdown :content="item.description" />
												</card-view>
											</template>
										</info-button>
									</td>
								</tr>
							</tbody>
						</table>
					</template>
				</accordion-item>
			</accordion-group>

			<step-buttons
				v-if="character"
				:next="`/characters/${character._id}/`"
				:previous="`/characters/${character._id}/fate`"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>

import { findByProperty, sortByProperties } from 'we-ui/utils/list'
import { sum } from '~/utils/list'
import { EQUIPMENT_COMMON, EQUIPMENT_UNCOMMON, EQUIPMENT_RARE } from '~/utils/config'

// display equipment categories as accordions
// each category lists the equipment within it
// should have more information, including weapon or other stats
// only common equipment should be displayed, unless...
// the character has selected options which gives them access to uncommon items
// this is Noble (rich clothing only) and Merchant (one Uncommon item) backgrounds

export default {
	name: 'CharacterEquipmentPage',

	async fetch() {
		const { params } = this.$nuxt.context

		this.character = await this.$characters.byId(params.characterId)
	},
	fetchOnServer: false,

	data() {
		return {
			character: null,
		}
	},

	computed: {
		equipment() {
			return this.$equipment.all().sort(sortByProperties('category', 'title'))
		},

		standing() {
			if(!this.character) return 0

			const background = this.$backgrounds.byTitle(this.character.background)

			// TODO factor in Rich or other background

			return background.standing
		},

		categories() {
			const byCategory = {}

			this.equipment.forEach(item => {
				if(!(item.category in byCategory)) {
					byCategory[item.category] = {
						title: item.category,
						equipment: [],
					}
				}

				byCategory[item.category].equipment.push(item)
			})

			return Object.values(byCategory)
		},

		currentEncumbrance() {
			if(!this.character) return 0

			return this.character.equipment.map(({ weight }) => weight).reduce(sum, 0)
		},

		totalEncumbrance() {
			if(!this.character) return 0

			return this.character.characteristics.Might + 2
		},

		hasSelected() {
			return this.character && this.character.equipment.length > 0
		},
	},

	methods: {
		canPurchase(item) {
			// can't afford
			if(item.price > this.standing) return false

			// no-one can begin with a rare item
			if(item.availability === EQUIPMENT_RARE) return false

			// common availability can be taken by anyone
			if(item.availability === EQUIPMENT_COMMON) return true

			// merchants can have one uncommon item
			if(this.character.background === 'Merchant') {
				const currentUncommon = this.character.equipment.filter(
					({ availability, title }) => availability === EQUIPMENT_UNCOMMON && title !== item.title
				)

				return currentUncommon.length === 0
			}

			// nobles can always have rich clothing
			if(this.character.background === 'Noble' && item.title === 'Rich Clothing') return true

			return false
		},

		isItemSelected(item) {
			if(!this.character) return false

			return this.character.equipment.find(findByProperty('title', item)) !== undefined
		},

		toggleItem(item) {
			if(this.isItemSelected(item.title)) {
				this.character.equipment = [...this.character.equipment.filter(({ title }) => title !== item.title)]
			}
			else {
				this.character.equipment = [...this.character.equipment, item]
			}
		},

		async save(done) {
			await this.$characters.save(this.character)
			done()
		},
	},
}
</script>
