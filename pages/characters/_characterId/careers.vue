<template>
	<div class="secondary-navigation">
		<character-progress :creator="creator" v-if="creator.character" />
		<article>
			<markdown-content content="characters/careers" />
			<accordion-group v-if="creator.character">
				<accordion-item
					v-for="(career, idx) in careers"
					:key="`career_${idx}`"
					:checked="isCareerSelected(career.title)"
				>
					<template #trigger>
						<div>
							<strong class="text-xl">{{ career.title }}</strong>
							<small v-if="hasSelectedCareer">(3 CP)</small>
						</div>
					</template>
					<template #content>
						<render-markdown :content="career.description" />
						<p>If you choose this career you gain the following skills:</p>
						<p>{{ career.skills | join-and }}.</p>
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
				v-if="creator.character"
				:next="`/characters/${creator.character.slug}/skills`"
				:previous="`/characters/${creator.character.slug}/characteristics`"
				:disabled="!hasSelected"
				@click="save"
			/>
		</article>
	</div>
</template>
<script>
import WithCharacter from '~/mixins/WithCharacter'
import { CAREER_COST } from '~/utils/config'

// choose a career
// this adds skills
// choose a talent or specialisation
// optionally choose another career at 3CP per additional

export default {
	name: 'CharacterCareersPage',
	mixins: [ WithCharacter ],

	computed: {
		careers() {
			return this.$careers.all()
		},

		hasSelectedCareer() {
			return this.creator.hasSelectedCareer
		},

		canAffordNewCareer() {
			return this.creator.canAffordNewCareer
		},

		hasSelected() {
			return this.hasSelectedCareer &&
				this.creator.character.careers.map(career => career.chosenSpec).filter(spec => !!spec).length > 0
		},
	},

	methods: {
		toggleCareer(input) {
			input.value ? this.addCareer(input.data) : this.removeCareer(input.data)
		},

		addCareer(title) {
			const obj = this.$careers.byTitle(title)

			this.creator.addCareer(obj)
		},

		removeCareer(title) {
			const obj = this.$careers.byTitle(title)

			this.creator.removeCareer(obj)
		},

		getSelectedCareer(title) {
			return this.creator.character.careers.find(career => career.title === title)
		},

		getCareerStartingTalents(career) {
			return career.tracks.map(track => this.$talents.byTitle(track.talents[0]))
		},

		isCareerSelected(title) {
			return this.creator.hasCareer(title)
		},
	},
}
</script>
