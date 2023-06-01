<template>
	<main>
		<h1>Adversaries</h1>
		<list-filter :list="adversaries" property="title" @filter="update" />
		<!-- div class="grid md:grid-cols-3" -->
		<we-tab-group>
			<we-tab-panel title="All">
				<div class="columns-1 sm:columns-2 md:columns-3">
					<adversary-link v-for="adv in filtered" :key="adv.id" :adversary="adv" />
				</div>
			</we-tab-panel>
			<we-tab-panel title="Category">
				<div class="columns-1 sm:columns-2 md:columns-3">
					<div v-for="(adversaries, category) in byCategory" :key="category">
						<h3>{{ category }}</h3>
						<adversary-link v-for="adv in adversaries" :key="adv.id" :adversary="adv" />
					</div>
				</div>
			</we-tab-panel>
			<we-tab-panel title="Type">
				<div class="columns-1 sm:columns-2 md:columns-3">
					<div v-for="(adversaries, type) in byType" :key="type">
						<h3>{{ type }}</h3>
						<adversary-link v-for="adv in adversaries" :key="adv.id" :adversary="adv" />
					</div>
				</div>
			</we-tab-panel>
		</we-tab-group>
	</main>
</template>
<script>
import adversaries from '~/state/adversaries'
import { unique } from '~/utils/list'

export default {
	name: 'AdversaryIndexPage',

	async fetch() {
		this.filtered = this.adversaries = await adversaries.all()
	},

	data() {
		return {
			adversaries: [],
			filtered: [],
		}
	},

	computed: {
		byCategory() {
			return this.group('category')
		},

		byType() {
			return this.group('type')
		},
	},

	methods: {
		update(adversaries) {
			this.filtered = adversaries
		},

		group(group) {
			const groups = unique(this.filtered.map(adv => adv[group])).sort()
			let byGroup = {}

			groups.forEach(g => {
				byGroup[g] = this.filtered.filter(adv => adv[group] === g)
			})

			return byGroup
		},
	},
}
</script>
