<template>
	<div class="secondary-navigation">
		<character-progress :character="character" v-if="character" />
		<article>
			<markdown-content content="characters/equipment" />
			<definition-term
				definition="Encumbrance"
				:term="encumbrance"
			/>

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
									<th>Notes</th>
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
											@input="toggleItem(item)"
										/>
									</td>
									<td>{{ item.price }}</td>
									<td v-if="'weight' in item">{{ item.weight }}</td>
									<td v-else>&mdash;</td>
									<td>{{ item.availability }}</td>
									<td>.</td>
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

import { findByProperty } from 'we-ui/utils/list'
import { sum } from '~/utils/list'

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
			return this.$equipment.all()
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

			// TODO filter out rare items
			// TODO filter out uncommon items unless Merchant
			// TODO filter out stuff they can't afford
			// OR disable these items so they can see them and look at info
			// but can't add them

			return Object.values(byCategory)
		},

		encumbrance() {
			if(!this.character) return ' 0 of 0'

			const current = this.character.equipment.map(({ weight }) => weight).reduce(sum, 0)
			const max = this.character.characteristics.Might + 2

			return `${current} of ${max}`
		},

		hasSelected() {
			return false
		},
	},

	methods: {
		isItemSelected(item) {
			if(!this.character) return false

			// TODO Noble background starts with Rich Clothing

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
