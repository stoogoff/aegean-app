<template>
	<div>
		<loading-spinner v-if="$fetchState.pending" />
		<div v-else>
			<h2>{{ adversary.title }} <small>({{ adversary.type }})</small></h2>

			<!-- need to add markdown for this -->
			{{ adversary.description }}

			<div>
				<p><strong>Tactics:</strong> {{ adversary.tactics }}</p>
			</div>
			<div>
				<h3>Characteristics</h3>
				<div v-for="(value, key) in adversary.characteristics" :key="key">
					{{ key }}: {{ value }}
				</div>
			</div>
			<div>
				<h3>Skills</h3>
				<div v-for="(value, key) in adversary.skills" :key="key">
					{{ key }}: {{ value }}
				</div>
			</div>
			<div>
				<h3>Attributes</h3>
				<div v-for="(value, key) in adversary.attributes" :key="key">
					{{ key }}: {{ value }}
				</div>
			</div>
			<div>
				<h3>Abilities</h3>
				<div v-for="(ability, index) in adversary.abilities" :key="`ability_${index}`">
						<strong>{{ ability.title }}:</strong> {{ ability.description }}
				</div>
			</div>
			<div v-if="hasAttacks">
				<h3>Attacks</h3>
				<table>
					<thead>
						<tr>
							<th>Attack</th>
							<th>Skill</th>
							<th>Dice</th>
							<th>R / R</th>
							<th>Damage</th>
							<th>Properties</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(attack, aIndex) in attacks" :key="`attack_${aIndex}`">
							<td>{{ attack.title }} <small v-if="attack.subtitle">{{ attack.subtitle }}</small></td>
							<td>{{ attack.skill }}</td>
							<td>{{ getDiceTotal(attack) }}D</td>
							<td v-if="attack.reach">{{ attack.reach }}</td>
							<td v-if="attack.range">{{ attack.range }}</td>
							<td>{{ attack.damage }}</td>
							<td>
								<span v-for="(prop, pIndex) in attack.properties" :key="`property_${aIndex}_${pIndex}`">{{ prop.title }}</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import adversaries from '~/state/adversaries'

export default Vue.component('AdversaryView', {
	async fetch() {
		const { params } = this.$nuxt.context

		this.adversary = adversaries.byId(params.id)
	},

	data() {
		return {
			adversary: null,
		}
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
