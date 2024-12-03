<template>
	<article>
		<we-loading-spinner v-if="$fetchState.pending" />
		<div v-else-if="character === null">
			Character not found.
		</div>
		<div v-else>
			<header class="marble small">
				<h1>{{ character.name }}</h1>
			</header>
			<div class="container">
				<we-link-action :to="`/characters/${character.slug}/edit`">Edit</we-link-action>
				<tab-group>
					<tab-panel title="Stats" icon="dice-d10">
						<h2 class="meander"><span>Characteristics</span></h2>
						<div class="grid grid-cols-2 md:grid-cols-5 gap-2">
							<box-view
								v-for="ch in characteristics"
								:key="`characteristic_${ch}`"
							>
								<stat-view :label="ch">
									<strong>
										{{ character.characteristics[ch] }}
									</strong>
								</stat-view>
							</box-view>
						</div>
						<div class="md:grid grid-cols-2 md:grid-cols-5 gap-4">
							<div class="md:col-span-2">
								<h2 class="mb-0 mt-8">Attributes</h2>
								<div class="grid grid-cols-2 gap-2">
									<box-view
										v-for="attr in attributes"
										:key="`attr_${attr}`"
									>
										<stat-view :label="attr">
											<strong>
												{{ character.attributes[attr] || 0 }}
											</strong>
										</stat-view>
									</box-view>
								</div>
							</div>
							<div class="md:col-span-3">
								<h2 class="meander"><span>Skills</span></h2>
								<!-- TODO specialisations -->
								<definition-term
									v-for="(value, key) in character.skills"
									:definition="key"
									:key="key"
									class="even:bg-gray-100"
								>{{ value }}</definition-term>
							</div>
						</div>
					</tab-panel>
					<tab-panel title="Equipment" icon="sword">
						<section class="mt-4 mb-8 md:grid md:grid-cols-5 gap-4">
							<div class="md:col-span-4">
								<h2>Weapons</h2>
								<weapons-table :weapons="weapons" />
							</div>
							<aside>
								<h2>Defence</h2>
								<div class="grid grid-cols-2 md:grid-cols-1 gap-2">
									<box-view>
										<stat-view label="Armour"><strong>{{ armour }}</strong></stat-view>
									</box-view>
									<box-view>
										<stat-view label="Shield"><strong>{{ shield }}</strong></stat-view>
									</box-view>
									<box-view>
										<stat-view label="Parry"><strong>{{ parry }}</strong></stat-view>
									</box-view>
									<box-view v-if="dodge > 0">
										<stat-view label="Dodge"><strong>{{ dodge }}</strong></stat-view>
									</box-view>
								</div>
							</aside>
						</section>
						<section>
							<h2>Equipment</h2>
							<equipment-table :equipment="equipment" />
						</section>
					</tab-panel>
					<tab-panel title="Talents" icon="script-outline">
						<section v-if="gifts.length" class="mt-4 mb-8">
							<h3>Gifts</h3>
							<simple-accordion-group :items="gifts" />
						</section>
						<section>
							<h3>Talents</h3>
							<simple-accordion-group :items="talents" v-if="talents.length" />
							<p v-else><em>No talents selected.</em></p>
						</section>
					</tab-panel>
					<tab-panel title="Background" icon="account">
						<h2 class="meander"><span>Background</span></h2>
						<section class="md:grid grid-cols-2 gap-x-4">
							<div>
								<definition-term definition="Heritage">{{ character.heritage }}</definition-term>
								<definition-term v-if="hasDivineHeritage" definition="Parent">{{ character.parent }}</definition-term>
								<definition-term definition="Background">{{ character.background }}</definition-term>
								<definition-term definition="Fate">{{ character.attributes.Fate }}</definition-term>
							</div>
							<p class="px-1 py-2 md:px-0 md:py-1">{{ character.description }}</p>
						</section>
						<section class="my-8">
							<h2 class="meander"><span>Careers</span></h2>
							<simple-accordion-group :items="careers" v-if="careers.length" />
							<p v-else><em>No careers selected.</em></p>
						</section>
						<section v-if="cults.length" class="my-8">
							<h2 class="meander"><span>Mystery Cults</span></h2>
							<simple-accordion-group :items="cults" />
						</section>
					</tab-panel>
					<tab-panel title="The Gods" v-if="favour.length > 0 || disfavour.length > 0" icon="flash">
						<section v-if="favour.length" class="mt-4 mb-8">
							<h3>Favour</h3>
							<simple-accordion-group :items="favour" />
						</section>
						<section  v-if="disfavour.length">
							<h3>Disfavour</h3>
							<simple-accordion-group :items="disfavour" />
						</section>
					</tab-panel>
				</tab-group>
			</div>
		</div>
	</article>
</template>
<script>

import { sortByProperty } from 'we-ui/utils/list'
import WithCharacterView from '~/mixins/WithCharacterView'
import { KEY_PROPERTY } from '~/utils/config'
import { sum } from '~/utils/list'
import { isArmour, isShield, isWeapon, getStats } from '~/utils/system'

export default {
	name: 'CharacterViewPage',
	mixins: [ WithCharacterView ],

	async fetch() {
		const { params } = this.$nuxt.context

		this.character = await this.$characters.byId(params.characterId)
	},
	fetchOnServer: false,

	computed: {
		talents() {
			return this.getObjectFromTitle('talents')
		},

		gifts() {
			return this.getObjectFromTitle('gifts')
		},

		careers() {
			return this.getObjectFromTitle('careers')
		},

		cults() {
			return this.getObjectFromTitle('cults')
		},

		weapons() {
			return this.getObjectFromTitle('equipment')
				.filter(({ category }) => isWeapon(category))
				.map(weapon => ({
					...weapon,
					properties: weapon.stats.properties
						.map(property => getStats(this.$properties, KEY_PROPERTY, property)),
				}))
				.sort(sortByProperty('title'))
		},

		equipment() {
			return this.getObjectFromTitle('equipment')
				.filter(({ category }) => !isWeapon(category))
				.sort(sortByProperty('title'))
		},

		armour() {
			return this.equipment
				.filter(({ category }) => isArmour(category))
				.map(armour => armour.stats.armour)
				.reduce(sum, 0)
		},

		shield() {
			return this.getObjectFromTitle('equipment')
				.filter(({ category }) => isShield(category))
				.map(shield => shield.stats.properties.find(prop => prop.indexOf('Shield') !== -1))
				.map(shield => parseInt(shield.replace(/\D+/, '')))
				.reduce(sum, 0)
		},

		parry() {
			return this.getObjectFromTitle('equipment')
				.filter(({ category }) => isWeapon(category))
				.map(weapon => weapon.stats.properties.find(prop => prop.indexOf('Parry') !== -1))
				.filter(weapon => !!weapon)
				.map(weapon => parseInt(weapon.replace(/\D+/, '')))
				.reduce(sum, 0)
		},

		dodge() {
			return this.talents.find(({ title }) => title === 'Dodge') ? 1 : 0
		},

		favour() {
			return this.getObjectFromTitle('deities', 'favour')
		},

		disfavour() {
			return this.getObjectFromTitle('deities', 'disfavour')
		},
	},

	methods: {
		getObjectFromTitle(listKey, objectKey) {
			if(!this.character) return []
			if(!objectKey) objectKey = listKey

			return this['$' + listKey].filter(({ title }) => this.character[objectKey].includes(title))
		},
	}
}

</script>
<style scoped>

strong {
	@apply text-xl pt-4 pb-3 block;
}

</style>
