<template>
	<table class="table-auto w-full">
		<thead>
			<tr>
				<th>Name</th>
				<th>Skill</th>
				<th>
					<span class="md:hidden">R / R</span>
					<span class="hidden md:inline">Range / Reach</span>
				</th>
				<th>
					<span class="md:hidden">Dmg</span>
					<span class="hidden md:inline">Damage</span>
				</th>
				<th>Properties</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="item in weapons"
				:key="item.title"
			>
				<td><slot v-bind:item="item">{{ item.title }}</slot></td>
				<td>{{ item.skill }}</td>
				<td v-if="'reach' in item">{{ item.reach }}</td>
				<td v-else-if="'range' in item">{{ item.range }}</td>
				<td v-else>&mdash;</td>
				<td>{{ item.damage }}</td>
				<td v-if="item.properties.length > 0">
					<div
						v-for="(prop, pIndex) in item.properties"
						:key="`property_${prop.title}_${pIndex}`"
					>
						<info-button outlined small wide y="bottom" x="right">
							{{ prop.title }}
							<template #info>
								<card-view :title="`${prop.title}${prop.active ? ' (Active)' : ''}`">
									<render-markdown :content="prop.description" />
								</card-view>
							</template>
						</info-button>
					</div>
				</td>
				<td v-else>&mdash;</td>
			</tr>
		</tbody>
	</table>
</template>
<script>

import Vue from 'vue'

export default Vue.component('WeaponsTable', {
	props: {
		weapons: {
			type: Array,
			default: () => [],
		},
	},
})

</script>