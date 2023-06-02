<template>
	<div class="secondary-navigation">
		<aside class="hidden md:block">
			<list-filter :list="adversaries" property="title" @filter="update" />
			<small>Showing {{ filtered.length }} of {{ adversaries.length }}</small>
			<adversary-link v-for="adv in filtered" :key="adv.id" :adversary="adv" />
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
