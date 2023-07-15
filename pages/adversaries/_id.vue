<template>
	<div class="secondary-navigation">
		<aside class="hidden md:block sticky top-0 left-0 h-screen overflow-auto">
			<div class="bg-white sticky top-0 inset-x-0 pt-16 pb-2">
				<list-filter :list="adversaries" property="title" @filter="update" />
				<small>Showing {{ filtered.length }} of {{ adversaries.length }}</small>
			</div>
			<ul>
				<adversary-link v-for="adv in filtered" :key="adv.id" :adversary="adv" @click="load" />
			</ul>
		</aside>
		<article class="mt">
			<we-loading-spinner v-if="$fetchState.pending" />
			<div v-else-if="adversary === null">
				Adversary not found.
			</div>
			<div v-else>
				<adversary-view :adversary="adversary" />
			</div>
		</article>
	</div>
</template>
<script>
import { meta, title, url } from '~/utils/meta'

export default {
	name: 'AdversaryPage',
	layout: 'nofooter',

	async fetch() {
		const { params } = this.$nuxt.context

		this.filtered = this.adversaries = await this.$adversaries.all()
		this.adversary = this.$adversaries.byId(params.id)
	},

	data() {
		return {
			adversaries: [],
			filtered: [],
			adversary: null,
		}
	},

	methods: {
		update(adversaries) {
			this.filtered = adversaries
		},

		load(id) {
			this.adversary = this.$adversaries.byId(id)
			history.replaceState({}, null, `/adversaries/${this.adversary.id}`)
			window.scrollTo(0, 0)
		},
	},

	head() {
		if(!this.adversary) return {}

		const metadata = {
			type: 'article',
			title: this.adversary.title,
			url: `/adversaries/${this.$route.params.id}/`,
		}

		return {
			title: title(metadata),
			meta: meta(metadata),
			link: [
				{ hid: 'canonical', rel: 'canonical', href: url(metadata) },
			]
		}
	},
}
</script>
