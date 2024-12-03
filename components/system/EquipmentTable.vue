<template>
	<table class="table-auto w-full">
		<thead>
			<tr>
				<th>Name</th>
				<th>Price</th>
				<th>Weight</th>
				<th>Availability</th>
				<th>&nbsp;</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="item in equipment"
				:key="item.title"
			>
				<td><slot v-bind:item="item">{{ item.title }}</slot></td>
				<td>{{ item.price }}</td>
				<td v-if="'weight' in item">{{ item.weight | fraction }}</td>
				<td v-else>&mdash;</td>
				<td>{{ item.availability }}</td>
				<td>
					<info-button
						small outlined wide
						x="right"
					>
						<span class="hidden md:inline-block">More Info</span>
						<span class="inline-block md:hidden">+</span>
						<template #info>
							<card-view :title="item.title">
								<render-markdown :content="item.description" />
							</card-view>
						</template>
					</info-button>
				</td>
			</tr>
		</tbody>
	</table>
</template>
<script>

import Vue from 'vue'

export default Vue.component('EquipmentTable', {
	props: {
		equipment: {
			type: Array,
			default: () => [],
		},
	},
})

</script>