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
				<we-tab-group>
					<we-tab-panel title="Stats">
						<h2 class="meander"><span>Characteristics</span></h2>
						<div class="grid grid-cols-2 md:grid-cols-5 gap-2">
							<box-view
								v-for="ch in characteristics"
								:key="`charcteristic_${ch}`"
							>
								<stat-view :label="ch">
									<strong class="text-xl pt-4 pb-3 block">
										{{ character.characteristics[ch] }}
									</strong>
								</stat-view>
							</box-view>
						</div>
						<div class="grid grid-cols-2 md:grid-cols-5 gap-2">
							<div class="md:col-span-3">
								<h2>Skills</h2>
								<!-- TODO specialisations -->
								<definition-term
									v-for="(value, key) in character.skills"
									:definition="key"
									:key="key"
								>{{ value }}</definition-term>
							</div>
							<div class="md:col-span-2">
								<h2>Attributes</h2>
								<div class="grid grid-cols-2 gap-2">
									<box-view
										v-for="attr in attributes"
										:key="`attr_${attr}`"
									>
										<stat-view :label="attr">
											<strong class="text-xl pt-4 pb-3 block">
												{{ character.attributes[attr] || 0 }}
											</strong>
										</stat-view>
									</box-view>
								</div>
							</div>
						</div>
					</we-tab-panel>
					<we-tab-panel title="Talents & Gifts">
						<div v-if="gifts.length" class="mb-8">
							<h3>Gifts</h3>
							<simple-accordion-group :items="gifts" />
						</div>
						<div>
							<h3>Talents</h3>
							<simple-accordion-group :items="talents" v-if="talents.length" />
							<p v-else><em>No talents selected.</em></p>
						</div>
					</we-tab-panel>
					<we-tab-panel title="Background">
						<h2 class="meander"><span>Background</span></h2>
						<div class="grid grid-cols-2 gap-x-4">
							<div>
								<definition-term definition="Heritage">{{ character.heritage }}</definition-term>
								<definition-term v-if="hasDivineHeritage" definition="Parent">{{ character.parent }}</definition-term>
								<definition-term definition="Background">{{ character.background }}</definition-term>
								<definition-term definition="Fate">{{ character.attributes.Fate }}</definition-term>
							</div>
							<p>{{ character.description }}</p>
						</div>
						<h2 class="meander"><span>Careers</span></h2>
						<simple-accordion-group :items="careers" />
					</we-tab-panel>
				</we-tab-group>

			</div>
		</div>
	</article>
</template>
<script>

import WithCharacterView from '~/mixins/WithCharacterView'

export default {
	name: 'CharacterViewPage',
	mixins: [ WithCharacterView ],

	async fetch() {
		const { params } = this.$nuxt.context

		this.character = await this.$characters.byId(params.characterId)
		console.log({ ...this.character })

		this.careers = (await this.$careers.all()).filter(career => this.character.careers.includes(career.title))
	},
	fetchOnServer: false,

	data() {
		return {
			careers: [],
		}
	},

	computed: {
		talents() {
			if(!this.character) return []

			return this.$talents.all().filter(item => this.character.talents.includes(item.title))
		},

		gifts() {
			if(!this.character) return []

			return this.$gifts.all().filter(item => this.character.gifts.includes(item.title))
		},
	}
}

</script>
