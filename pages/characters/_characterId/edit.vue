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
				<we-tab-group>
					<we-tab-panel title="Background">
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
							<!-- TODO careers, mystery cults -->
						</section>
					</we-tab-panel>
					<we-tab-panel title="Stats">
						<div class="grid gap-8 grid-cols-2">
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
					</we-tab-panel>
					<we-tab-panel title="Gifts">
						<section>
							<h3>Gifts</h3>
							<filtered-talents :all="allGifts" :selected="selectedGifts" @add="addGift" @remove="removeGift" />
						</section>
					</we-tab-panel>
					<we-tab-panel title="Talents">
						<section>
							<h3>Talents</h3>
							<filtered-talents :all="allTalents" :selected="selectedTalents" @add="addTalent" @remove="removeTalent" />
						</section>
					</we-tab-panel>
				</we-tab-group>
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

		allGifts() {
			return this.$gifts.all()
		},

		allTalents() {
			return this.$talents.all()
		},

		selectedTalents() {
			if(!this.character) return []

			return this.allTalents.filter(item => this.character.talents.includes(item.title))
		},
	},

	methods: {
		addGift(title) {
			this.character.gifts = [...this.character.gifts, title]
		},
		removeGift(title) {
			this.character.gifts = this.character.gifts.filter(item => item !== title)
		},
		addTalent(title) {
			this.character.talents = [...this.character.talents, title]
		},
		removeTalent(title) {
			this.character.talents = this.character.talents.filter(item => item !== title)
		},

		validateCharacter(character) {
			const stringFields = ['name', 'description', 'heritage', 'parent', 'background', 'fate']

			stringFields.forEach(field => character[field] = character[field] || '')

			CHARACTERISTICS.forEach(ch => character.characteristics[ch] = character.characteristics[ch] || CHARACTERISTIC_START)
			SKILLS.forEach(sk => character.skills[sk] = character.skills[sk] || SKILL_MIN)
			ATTRIBUTES.forEach(attr => character.attributes[attr] = character.attributes[attr] || 0)

			const arrayFields = ['gifts', 'talents', 'careers', 'advantages', 'equipment', 'favour', 'disfavour']

			arrayFields.forEach(field => character[field] = character[field] || [])

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