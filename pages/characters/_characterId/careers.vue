<template>
	<div class="secondary-navigation">
		<character-progress :character="character" v-if="character" />
		<article>
			<markdown-content content="characters/careers" />
			<accordion-group v-if="character">
				<accordion-item
					v-for="(career, idx) in careers"
					:key="`career_${idx}`"
					:checked="isCareerSelected(career.title)"
				>
					<template #trigger>
						<div>
							<strong class="text-xl">{{ career.title }}</strong>
							<small v-if="hasCareer">(3 CP)</small>
						</div>
					</template>
					<template #content>
						<render-markdown :content="career.description" />
						<p>If you choose this career you gain the following skills:</p>
						<p>{{ join(career.skills, ', and ') }}.</p>
						<div class="flex justify-end mb-4">
							<info-button
								small outlined
								x="right"
							>
								More Info
								<template #info>
									<card-view>
										<render-markdown :content="career.choose" />
										<render-markdown :content="career.works" />
									</card-view>
								</template>
							</info-button>
						</div>
						<checkbox-action
							:value="isCareerSelected(career.title)"
							:data="career.title"
							@input="toggleCareer"
							block
							outlined
							:disabled="!canAffordNewCareer && !isCareerSelected(career.title)"
						>
							Select
						</checkbox-action>
						<div
							v-if="isCareerSelected(career.title)"
							class="my-4 py-4 border-t border-gray-300"
						>
							<p>Choose one of the following talents or skill specialisations:</p>
							<h4>Talents</h4>
							<ul>
								<radio-list
									v-for="(talent, tdx) in getCareerStartingTalents(career)"
									:key="`talent_${tdx}`"
									v-model="getSelectedCareer(career.title).chosenSpec"
									:data="talent.title"
								>
									<div class="flex">
										<span class="flex-grow">{{ talent.title }}</span>
										<span class="flex-grow-0">
										<info-button
												small outlined
												x="right"
											>
												More Info
												<template #info>
													<card-view :title="talent.title">
														<render-markdown :content="talent.description" />
													</card-view>
												</template>
											</info-button>
										</span>
									</div>
								</radio-list>
							</ul>
							<h4>Specialisations</h4>
							<ul>
								<radio-list
									v-for="(spec, sdx) in career.specialisations"
									:key="`specialisation_${sdx}`"
									v-model="getSelectedCareer(career.title).chosenSpec"
									:data="spec"
								>
									{{ spec }}
								</radio-list>
							</ul>
						</div>
					</template>
				</accordion-item>
			</accordion-group>
			<step-buttons
				v-if="character"
				:next="`/characters/${character.slug}/skills`"
				:previous="`/characters/${character.slug}/characteristics`"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>
import { join } from '~/utils/list'
import { addSkills, removeSkills } from '~/utils/character'

// choose a career
// this adds skills
// choose a talent or specialisation
// optionally choose another career at 3CP per additional

const CAREER_COST = 3

export default {
	name: 'CharacterCareersPage',

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
		careers() {
			return this.$careers.all()
		},

		hasCareer() {
			return this.character && this.character.careers.length > 0
		},

		canAffordNewCareer() {
			return this.character.cp >= CAREER_COST
		},

		hasSelected() {
			return this.character &&
				this.character.careers.length > 0 &&
				this.character.careers.map(career => career.chosenSpec).filter(spec => !!spec).length > 0
		},
	},

	methods: {
		join(arr, joiner) {
			return join(joiner)(arr)
		},

		toggleCareer(input) {
			input.value ? this.addCareer(input.data) : this.removeCareer(input.data)
		},

		addCareer(title) {
			const obj = this.$careers.byTitle(title)

			// the character has a career already so subsequent careers cost
			if(this.hasCareer) {
				this.character.cp -= CAREER_COST
			}

			this.character.careers = [ ...this.character.careers, {
				title,
				chosenSpec: null,
			}]
			addSkills(obj.skills, this.character)
		},

		removeCareer(title) {
			const obj = this.$careers.byTitle(title)

			if(this.character.careers.length >= 2) {
				this.character.cp += CAREER_COST
			}

			this.character.careers = [ ...this.character.careers.filter(career => career.title !== title) ]
			removeSkills(obj.skills, this.character)
		},

		getSelectedCareer(title) {
			return this.character.careers.find(career => career.title === title)
		},

		getCareerStartingTalents(career) {
			return career.tracks.map(track => this.$talents.byTitle(track.talents[0]))
		},

		isCareerSelected(title) {
			return this.character.careers.map(career => career.title).includes(title)
		},

		async save(done) {
			await this.$characters.save(this.character)
			done()
		},
	},
}
</script>
