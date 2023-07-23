<template>
	<div class="secondary-navigation">
		<character-progress :creator="creator" v-if="creator.character" />
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
				v-if="creator.character"
				:next="`/characters/${creator.character.slug}/`"
				:previous="`/characters/${creator.character.slug}/fate`"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>
import WithCharacter from '~/mixins/WithCharacter'
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
	mixins: [ WithCharacter ],

	computed: {
		equipment() {
			return this.$equipment.all().sort(sortByProperties('category', 'title'))
		},

		standing() {
			if(!this.creator.character) return 0

			const background = this.$backgrounds.byTitle(this.creator.character.background)

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
			return this.creator.currentEncumbrance
		},

		totalEncumbrance() {
			return this.creator.totalEncumbrance
		},

		hasSelected() {
			return this.creator.character && this.creator.character.equipment.length > 0
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
			if(this.creator.character.background === 'Merchant') {
				const currentUncommon = this.creator.character.equipment.filter(
					({ availability, title }) => availability === EQUIPMENT_UNCOMMON && title !== item.title
				)

				return currentUncommon.length === 0
			}

			// nobles can always have rich clothing
			if(this.creator.character.background === 'Noble' && item.title === 'Rich Clothing') return true

			return false
		},

		isItemSelected(title) {
			this.creator.hasEquipmentItem(title)
		},

		toggleItem(item) {
			if(this.isItemSelected(item.title)) {
				this.creator.removeEquipmentItem(item)
			}
			else {
				this.creator.addEquipmentItem(item)
			}
		},
	},
}
</script>
