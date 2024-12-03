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
				<we-button-action @click="save">Save</we-button-action>
				<tab-group>
					<tab-panel title="Background" icon="account">
						<section>
							<validate-field
								:value="name"
								:rules="rules.name"
								v-slot="{ error, message }"
							>
								<we-text-input label="Name" v-model="name" :error="error" :message="message" />
							</validate-field>
							<we-text-area label="Description" v-model="character.description" />
							<we-text-area label="Fate" v-model="character.fate" />
							<select-input label="Heritage" v-model="character.heritage" :items="heritages" />
							<select-input v-if="hasDivineHeritage" label="Parent" v-model="character.parent" :items="parents" />
							<select-input label="Background" v-model="character.background" :items="backgrounds" />
						</section>
					</tab-panel>
					<tab-panel title="Stats" icon="dice-d10">
						<div class="md:grid gap-8 grid-cols-2">
							<section>
								<h3>Characteristics</h3>
								<validate-field
									v-for="ch in characteristics"
									:key="`characteristic_${ch}`"
									:value="character.characteristics[ch]"
									:rules="rules.characteristics"
									v-slot="{ error, message }"
									class="even:bg-gray-200 p-1 my-1"
								>
									<quick-input :label="ch" v-model="character.characteristics[ch]" :error="error" :message="message" />
								</validate-field>

								<h3 class="mt-8">Attributes</h3>
								<validate-field
									v-for="attr in attributes"
									:key="`attributes_${attr}`"
									:value="character.attributes[attr]"
									:rules="rules.numeric"
									v-slot="{ error, message }"
									class="even:bg-gray-200 p-1 my-1"
								>
									<quick-input :label="attr" v-model="character.attributes[attr]" :error="error" :message="message" />
								</validate-field>
							</section>
							<section>
								<h3>Skills</h3>
								<validate-field
									v-for="(_, sk) in character.skills"
									:key="`skills_${sk}`"
									:value="character.skills[sk]"
									:rules="rules.skills"
									v-slot="{ error, message }"
									class="even:bg-gray-200 p-1 my-1"
								>
									<quick-input :label="sk" v-model="character.skills[sk]" :error="error" :message="message" />
								</validate-field>
							</section>
						</div>
					</tab-panel>
					<tab-panel title="Equipment" icon="sword">
						<section class="mt-4">
							<h3>Equipment</h3>
							<filtered-items :all="$equipment.all()" :character="character" property="equipment" />
						</section>
					</tab-panel>
					<tab-panel title="Talents" icon="script-outline">
						<section class="mt-4">
							<h3>Gifts</h3>
							<filtered-items :all="$gifts.all()" :character="character" property="gifts" />
						</section>
						<section class="my-8 py-8 border-t">
							<h3>Talents</h3>
							<filtered-items :all="$talents.all()" :character="character" property="talents" multiple />
						</section>
					</tab-panel>
					<tab-panel title="Careers" icon="crystal-ball">
						<section class="mt-4">
							<h3>Careers</h3>
							<filtered-items :all="$careers.all()" :character="character" property="careers" />
						</section>
						<section class="my-8 py-8 border-t">
							<h3>Mystery Cults</h3>
							<filtered-items :all="$cults.all()" :character="character" property="cults" />
						</section>
					</tab-panel>
					<tab-panel title="Favour & Disfavour" icon="flash">
						<section class="mt-4">
							<h3>Favour</h3>
							<filtered-items :all="$deities.all()" :character="character" subtitle="pantheon" property="favour" />
						</section>
						<section class="my-8 py-8 border-t">
							<h3>Disfavour</h3>
							<filtered-items :all="$deities.all()" :character="character" subtitle="pantheon" property="disfavour" />
						</section>
					</tab-panel>
				</tab-group>
			</div>
		</div>
	</article>
</template>
<script>

import { required, validate, numeric, maxVal } from 'we-ui/utils/validators'
import WithCharacterView from '~/mixins/WithCharacterView'
import {
	ATTRIBUTES,
	CHARACTERISTICS,
	CHARACTERISTIC_MAX,
	CHARACTERISTIC_START,
	SKILLS,
	SKILL_MAX,
	SKILL_MIN,
} from '~/utils/config'

export default {
	name: 'CharacterEditPage',
	mixins: [ WithCharacterView ],

	async fetch() {
		const { params } = this.$nuxt.context
		const character = await this.$characters.byId(params.characterId)

		this.character = this.validateCharacter(character)
		this.name = this.character.name
		console.log({ ...this.character })
	},
	fetchOnServer: false,

	data() {
		return {
			name: '',
		}
	},

	computed: {
		rules() {
			return {
				name: [required()],
				numeric: [required(), numeric()],
				characteristics: [required(), numeric(), maxVal(CHARACTERISTIC_MAX)],
				skills: [required(), numeric(), maxVal(SKILL_MAX)],
			}
		},

		selectedGifts() {
			if(!this.character) return []

			return this.allGifts.filter(item => this.character.gifts.includes(item.title))
		},

		selectedTalents() {
			if(!this.character) return []

			return this.allTalents.filter(item => this.character.talents.includes(item.title))
		},
	},

	methods: {
		validateCharacter(character) {
			const stringFields = ['name', 'description', 'heritage', 'parent', 'background', 'fate']

			stringFields.forEach(field => character[field] = character[field] || '')

			CHARACTERISTICS.forEach(ch => character.characteristics[ch] = character.characteristics[ch] || CHARACTERISTIC_START)
			SKILLS.forEach(sk => character.skills[sk] = character.skills[sk] || SKILL_MIN)
			ATTRIBUTES.forEach(attr => character.attributes[attr] = character.attributes[attr] || 0)

			const arrayFields = ['gifts', 'talents', 'careers', 'cults', 'advantages', 'equipment', 'favour', 'disfavour']

			arrayFields.forEach(field => character[field] = character[field] || [])

			character.specialisations = character.specialisations || {}

			return character
		},

		async save() {
			const { params } = this.$nuxt.context

			await this.$characters.save(this.character)

			this.$router.push(`/characters/${params.characterId}`)
		},
	},
}

</script>
