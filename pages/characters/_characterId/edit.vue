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
							<h3>Background</h3>
							<validate-field
								:value="name"
								:rules="rules.name"
								v-slot="{ error, message }"
							>
								<we-text-input label="Name" v-model="name" :error="error" :message="message" />
							</validate-field>
							<we-text-area label="Description" v-model="character.description" />
							<we-text-area label="Fate" v-model="character.attributes.Fate" />
							<!-- TODO heritage, divine parent, background -->
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
									:rules="rules.numeric"
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
									:rules="rules.numeric"
									v-slot="{ error, message }"
									class="even:bg-gray-200 p-1 my-1"
								>
									<quick-input :label="sk" v-model="character.skills[sk]" :error="error" :message="message" />
								</validate-field>
							</section>
						</div>
					</we-tab-panel>
					<we-tab-panel title="Talents & Gifts">

					</we-tab-panel>
				</we-tab-group>
			</div>
		</div>
	</article>
</template>
<script>

import { required, validate, numeric } from 'we-ui/utils/validators'
import {
	ATTR_ENDURANCE,
	ATTR_GLORY,
	ATTR_HUBRIS,
	ATTR_RESOLVE,
	ATTR_RISK,
	ATTR_STANDING,
	CHARACTERISTICS,
	HERITAGE_DIVINE,
} from '~/utils/config'

export default {
	name: 'CharacterEditPage',

	async fetch() {
		const { params } = this.$nuxt.context

		this.character = await this.$characters.byId(params.characterId)
		this.name = this.character.name
		console.log({ ...this.character })
	},
	fetchOnServer: false,

	data() {
		return {
			character: null,
			name: '',
		}
	},

	computed: {
		rules() {
			return {
				name: [required()],
				numeric: [required(), numeric()],
			}
		},

		characteristics() {
			return CHARACTERISTICS
		},

		attributes() {
			return [
				ATTR_GLORY,
				ATTR_HUBRIS,
				ATTR_STANDING,
				ATTR_RESOLVE,
				ATTR_ENDURANCE,
			]
		},
	},

	methods: {
		async save() {
			const { params } = this.$nuxt.context

			await this.$characters.save(this.character)

			this.$router.push(`/characters/${params.characterId}`)
		},
	},
}

</script>