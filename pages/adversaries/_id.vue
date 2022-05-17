<template>
	<main>
		<loading-spinner v-if="$fetchState.pending" />
		<div v-else-if="adversary === null">
			Adversary not found.
		</div>
		<adversary-view
			v-else
			:adversary="adversary"
		/>
	</main>
</template>
<script>
import adversaries from '~/state/adversaries'
import { meta, title, url } from '~/utils/meta'

export default {
	name: 'AdversaryPage',

	async fetch() {
		const { params } = this.$nuxt.context

		this.adversary = adversaries.byId(params.id)
	},

	data() {
		return {
			adversary: null,
		}
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
