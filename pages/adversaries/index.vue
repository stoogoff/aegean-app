<template>
	<main>
		<h1>Adversaries</h1>
		<text-input label="Filter" v-model="filter" />
		<p v-for="adv in adversaries" :key="adv.id">
			<nuxt-link :to="`/adversaries/${adv.id}`">{{ adv.title }} <small>({{ adv.type }})</small></nuxt-link>
		</p>
	</main>
</template>
<script>
import adversaries from '~/state/adversaries'

// TODO
// list by category (human, animal etc)
// list by type (minion, champion, legend)
// search

export default {
	name: 'AdversaryIndexPage',

	async fetch() {
		this.adversaries = await adversaries.all()
	},

	data() {
		return {
			adversaries: [],
			filter: '',
		}
	},

	watch: {
		filter(text) {
			if(text !== '') text = text.toLowerCase()

			this.adversaries = adversaries.all().filter(a =>
				a.title
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.toLowerCase()
					.indexOf(text) != -1)
		}
	},
}
</script>
