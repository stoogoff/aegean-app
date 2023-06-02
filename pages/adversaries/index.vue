<template>
	<article>
		<header>
			<h1>Adversaries</h1>
		</header>
		<div class="container">
			<list-filter :list="adversaries" property="title" @filter="update" />
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
				<we-tab-panel title="Source">
					<div class="columns-1 sm:columns-2 md:columns-3">
						<div v-for="(adversaries, source) in bySource" :key="source">
							<h3>{{ source }}</h3>
							<adversary-link v-for="adv in adversaries" :key="adv.id" :adversary="adv" />
						</div>
					</div>
				</we-tab-panel>
			</we-tab-group>
		</div>
	</article>
</template>
<script>
import { unique } from 'we-ui/utils/list'

export default {
	name: 'AdversaryIndexPage',

	async fetch() {
		this.filtered = this.adversaries = await this.$adversaries.all()
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

		bySource() {
			return this.group('source')
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
<style scoped>
h3 {
	@apply mt-4 mb-1;
}
</style>