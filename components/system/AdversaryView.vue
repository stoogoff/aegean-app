<template>
	<div>
		<h1>{{ adversary.title }}</h1>
		<div>
			<small>{{ adversary.type }}, {{ adversary.category }}</small>
		</div>
		<render-markdown :content="adversary.description" />
		<render-markdown v-if="hasTactics" :content="`**Tactics:** ${adversary.tactics}`" />
		<stat-block title="Characteristics" :stats="adversary.characteristics" />
		<stat-block title="Skills" :stats="skills">
			<template #header>
				<button-action small :outlined="!showAllSkills" @click="toggleAllSkills">
					Show all
				</button-action>
			</template>
		</stat-block>
		<stat-block title="Attributes" :stats="adversary.attributes" />
		<definition-term v-if="hasEquipment" definition="Equipment" :term="adversary.equipment" />
		<section v-if="hasAbilities">
			<h3>Abilities</h3>
			<render-markdown
				v-for="(ability, index) in adversary.abilities"
				:key="`ability_${index}`"
				:content="`**${ability.title}:** ${ability.description}`"
			/>
		</section>
		<section v-if="hasAttacks">
			<h3>Attacks</h3>
			<table class="table-auto w-full">
				<thead>
					<tr>
						<th>Attack</th>
						<th>Dice</th>
						<th>
							<span class="md:hidden">R / R</span>
							<span class="hidden md:inline">Range / Reach</span>
						</th>
						<th>Dmg</th>
						<th>Properties</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(attack, aIndex) in attacks" :key="`attack_${aIndex}`">
						<td>
							<div>{{ attack.title }} <small v-if="attack.subtitle">{{ attack.subtitle }}</small></div>
							<div><small>{{ attack.skill }}</small></div>
						</td>
						<td class="text-center">{{ getDiceTotal(attack) }}D</td>
						<td v-if="attack.reach" class="text-center">{{ attack.reach }}</td>
						<td v-if="attack.range" class="text-center">{{ attack.range }}</td>
						<td class="text-center">{{ attack.damage }}</td>
						<td v-if="attack.properties.length > 0">
							<div v-for="(prop, pIndex) in attack.properties" :key="`property_${aIndex}_${pIndex}`">
								<info-button outlined small>
									{{ prop.title }}
									<template #info>
										<h4 class="uppercase bg-gray-200 p-2 border-b-2 border-gray-300">{{ prop.title }}</h4>
										<div class="p-2">
											<render-markdown :content="prop.description" />
										</div>
									</template>
								</info-button>
							</div>
						</td>
						<td v-else>—</td>
					</tr>
				</tbody>
			</table>
		</section>
		<section v-if="adversary.arcane_lore">
			<h3>Arcane Lore</h3>
			<render-markdown :content="adversary.arcane_lore" />
		</section>
		<info-button small outlined type="primary">
			Hello
			<template #info>
				Hello
			</template>
		</info-button>
	</div>
</template>
<script>
import Vue from 'vue'
import adversaries from '~/state/adversaries'
import { SKILLS, STAT_MIGHT } from '~/utils/config'

export default Vue.component('AdversaryView', {
	props: {
		adversary: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			showAllSkills: false
		}
	},

	computed: {
		hasAbilities() {
			return this.adversary && this.adversary.abilities && this.adversary.abilities.length > 0
		},

		hasAttacks() {
			return this.adversary && this.adversary.attacks && this.adversary.attacks.length > 0
		},

		hasEquipment() {
			return this.adversary && 'equipment' in this.adversary
		},

		hasTactics() {
			return this.adversary && 'tactics' in this.adversary
		},

		// merge weapons and thrown weapons and add dice pools
		attacks() {
			let attacks = []

			this.adversary.attacks.forEach(attack => {
				attacks.push(attack)

				if(attack.thrown) attacks.push({ title: `${attack.title} (thrown)`, thrown: true, ...attack.thrown })
			})

			return attacks
		},

		skills() {
			if(this.showAllSkills) {
				const skills = {}

				SKILLS.forEach(skill => skills[skill] = 0)

				return { ...skills, ...this.adversary.skills }
			}

			return this.adversary.skills
		},
	},

	methods: {
		getDiceTotal(attack) {
			const characteristic = Math.max(
				this.adversary.characteristics[attack.characteristic],
				this.adversary.characteristics[STAT_MIGHT]
			)

			return characteristic + (this.adversary.skills[attack.skill] || 0)
		},

		toggleAllSkills() {
			this.showAllSkills = !this.showAllSkills
		},
	},
})
</script>
<style scoped>
h3 {
	@apply uppercase text-center;
}
th {
	@apply uppercase;
}
td {
	@apply align-top p-1;
}
tbody tr:nth-child(odd) {
	@apply bg-gray-200;
}
section {
	@apply pt-6;
}
</style>