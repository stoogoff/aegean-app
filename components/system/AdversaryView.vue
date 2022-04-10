<template>
	<div>
		<h1>{{ adversary.title }}</h1>
		<div>
			<small>{{ adversary.type }}, {{ adversary.category }}</small>
		</div>
		<markdown-content :content="adversary.description" />
		<markdown-content :content="`**Tactics:** ${adversary.tactics}`" />
		<stat-block title="Characteristics" :stats="adversary.characteristics" />
 		<stat-block title="Skills" :stats="adversary.skills" />
		<stat-block title="Attributes" :stats="adversary.attributes" />
		<section>
			<h3>Abilities</h3>
			<markdown-content
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
						<td>
							<div v-for="(prop, pIndex) in attack.properties" :key="`property_${aIndex}_${pIndex}`">
								<span class="link">{{ prop.title }}</span>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</section>
		<section v-if="adversary.arcane_lore">
			<h3>Arcane Lore</h3>
			<markdown-content :content="adversary.arcane_lore" />
		</section>
	</div>
</template>
<script>
import Vue from 'vue'
import adversaries from '~/state/adversaries'

export default Vue.component('AdversaryView', {
	props: {
		adversary: {
			type: Object,
			required: true,
		},
	},

	computed: {
		hasAttacks() {
			return this.adversary && this.adversary.attacks && this.adversary.attacks.length > 0
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
	},

	methods: {
		getDiceTotal(attack) {
			return this.adversary.characteristics[attack.characteristic] + this.adversary.skills[attack.skill]
		}
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