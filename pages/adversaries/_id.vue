<template>
	<div class="two-column">
		<aside>
			<list-filter :list="adversaries" property="title" @filter="update" />
			<small>Showing {{ filtered.length }} of {{ adversaries.length }}</small>
			<adversary-link v-for="adv in filtered" :key="adv.id" :adversary="adv" />
		</aside>
		<article>
			<loading-spinner v-if="$fetchState.pending" />
			<div v-else-if="adversary === null">
				Adversary not found.
			</div>
			<adversary-view
				v-else
				:adversary="adversary"
			/>
		</article>
	</div>
</template>
<script>
import adversaries from '~/state/adversaries'
import { meta, title, url } from '~/utils/meta'

export default {
	name: 'AdversaryPage',
	layout: 'full-width',

	async fetch() {
		const { params } = this.$nuxt.context

		this.filtered = this.adversaries = await adversaries.all()
		this.adversary = adversaries.byId(params.id)
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
