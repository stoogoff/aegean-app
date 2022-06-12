<template>
	<main>
		<h1>Adversaries</h1>
		<text-input label="Filter" v-model="filter" />
		<!-- div v-if="filtered.length > 0">
			<adversary-link v-for="adv in filtered" :key="adv.id" :adversary="adv" />
		</div -->
		<div class="grid grid-cols-3">
			<div>
				<h2>All</h2>
				<adversary-link v-for="adv in adversaries" :key="adv.id" :adversary="adv" />
			</div>
			<div>
				<h2>Category</h2>
				<div v-for="(adversaries, category) in byCategory" :key="category">
					<h3>{{ category }}</h3>
					<adversary-link v-for="adv in adversaries" :key="adv.id" :adversary="adv" />
				</div>
			</div>
			<div>
				<h2>Type</h2>
				<div v-for="(adversaries, type) in byType" :key="type">
					<h3>{{ type }}</h3>
					<adversary-link v-for="adv in adversaries" :key="adv.id" :adversary="adv" />
				</div>
			</div>
		</div>
	</main>
</template>
<script>
import adversaries from '~/state/adversaries'
import { unique } from '~/utils/list'

export default {
	name: 'AdversaryIndexPage',

	async fetch() {
		this.adversaries = await adversaries.all()
	},

	data() {
		return {
			adversaries: [],
			filtered: [],
			filter: '',
		}
	},

	watch: {
		filter(text) {
			/*if(text === '') {
				this.adversaries = []
				return
			}*/

			text = text.toLowerCase()

			this.adversaries = adversaries.all().filter(a =>
				a.title
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.toLowerCase()
					.indexOf(text) != -1)
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
		group(group) {
			const groups = unique(this.adversaries.map(adv => adv[group])).sort()
			let byGroup = {}

			groups.forEach(g => {
				byGroup[g] = this.adversaries.filter(adv => adv[group] === g)
			})

			return byGroup
		},
	},
}
</script>
