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
				<we-tab-group>
					<we-tab-panel title="Stats">
						<h2 class="meander"><span>Characteristics</span></h2>
						<div class="grid grid-cols-2 md:grid-cols-5 gap-2">
							<div
								v-for="(ch, idx) in characteristics"
								:key="`charcteristic_${idx}`"
								class="border border-gray-200 rounded-md shadow-md"
							>
								<stat-view :label="ch">
									<strong class="text-xl pt-4 pb-3 block">
										{{ character.characteristics[ch] }}
									</strong>
								</stat-view>
							</div>
						</div>
					</we-tab-panel>
					<we-tab-panel title="Talents">
						<p><em>Talents</em></p>
					</we-tab-panel>
					<we-tab-panel title="Background">
						<h2 class="meander"><span>Background</span></h2>
						<div class="grid grid-cols-2 gap-x-4">
							<div>
								<definition-term definition="Heritage">{{ character.heritage }}</definition-term>
								<definition-term v-if="hasDivineParentage" definition="Parent">{{ character.parent }}</definition-term>
								<definition-term definition="Background">{{ character.background }}</definition-term>
								<definition-term definition="Fate">{{ character.attributes.Fate }}</definition-term>
							</div>
							<p>{{ character.description }}</p>
						</div>
						<h2 class="meander"><span>Careers</span></h2>
						<accordion-group>
							<accordion-item
								v-for="career in careers"
								:key="`career_${career.title}`"
							>
								<template #trigger>
									<div>
										<strong class="text-xl">{{ career.title }}</strong>
									</div>
								</template>
								<template #content>
									<render-markdown :content="career.description" />
								</template>
							</accordion-item>
						</accordion-group>
					</we-tab-panel>
				</we-tab-group>

			</div>
		</div>
	</article>
</template>
<script>

import { CHARACTERISTICS, HERITAGE_DIVINE } from '~/utils/config'

export default {
	name: 'CharacterViewPage',

	async fetch() {
		const { params } = this.$nuxt.context

		this.character = await this.$characters.byId(params.characterId)
		console.log({ ...this.character })

		this.careers = (await this.$careers.all()).filter(career => this.character.careers.includes(career.title))
	},
	fetchOnServer: false,

	data() {
		return {
			character: null,
			careers: [],
		}
	},

	computed: {
		characteristics() {
			return CHARACTERISTICS
		},

		hasDivineParentage() {
			return this.character && this.character.heritage === HERITAGE_DIVINE
		}
	},
}

</script>