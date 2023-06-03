<template>
	<div class="secondary-navigation">
		<character-progress :character="character" v-if="character" />
		<article>
			<markdown-content content="characters/careers" />
			<accordion-group v-if="character">
				<accordion-item
					v-for="(career, idx) in careers"
					:key="`career_${idx}`"
					:checked="character.startingCareer === career.title"
				>
					<template #trigger>
						<div>
							<strong class="text-xl">{{ career.title }}</strong>
						</div>
					</template>
					<template #content>
						<render-markdown :content="career.description" />
						<p>If you choose this career you gain the following skills: {{ join(career.skills, ', and ') }}.</p>
						<div class="flex justify-end mb-4">
							<info-button
								small outlined
								x="right"
							>
								More Info
								<template #info>
									<card-view :title="gift">
										<render-markdown :content="career.choose" />
										<render-markdown :content="career.works" />
									</card-view>
								</template>
							</info-button>
						</div>
						<div>
							<p>Choose one of the following talents or skill specialisations:</p>
							<ul>
								<li
									v-for
								>

								</li>
								<li
									v-for="(spec, sdx) in career.specialisations"
									:key="`specialisation_${sdx}`"
								>
									{{ spec }}
								</li>
							</ul>
						</div>
						<radio-action
							v-model="character.startingCareer"
							:data="career.title"
							block
							outlined
						>
							Select
						</radio-action>
					</template>
				</accordion-item>
			</accordion-group>
			<step-buttons
				v-if="character"
				:next="`/characters/${character._id}/`"
				:previous="`/characters/${character._id}/characteristics`"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>
import { join } from '~/utils/list'
import { addSkills, removeSkills } from '~/utils/character'

export default {
	name: 'CharacterCareersPage',

	async fetch() {
		const { params } = this.$nuxt.context

		this.character = await this.$characters.byId(params.characterId)

		this.$watch('character.startingCareer', (newValue, oldValue) => {
			if(oldValue !== null && oldValue !== undefined) {
				this.removeCareer(oldValue)
			}

			if(newValue !== null && newValue !== undefined) {
				this.addCareer(newValue)
			}
		})
	},
	fetchOnServer: false,

	data() {
		return {
			character: null,
		}
	},

	computed: {
		careers() {
			return this.$careers.all()
		},

		hasSelected() {
			return false
		},
	},

	methods: {
		join(arr, joiner) {
			return join(joiner)(arr)
		},

		addCareer(title) {
			const obj = this.$careers.byTitle(title)

			addSkills(obj.skills, this.character)
		},

		removeCareer(title) {
			const obj = this.$careers.byTitle(title)

			removeSkills(obj.skills, this.character)
		},

		getSelectedCareerStartingTalents() {
			if(!this.character.startingCareer) return []

			const obj = this.$careers.byTitle(this.character.startingCareer)
			const talents = obj.tracks.map(track => track.talents[0])

			// TODO load the actual talents

			return talents
		},

		async save(done) {
			await this.$characters.save(this.character)
			done()
		},
	},
}
</script>
