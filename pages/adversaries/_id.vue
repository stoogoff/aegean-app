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
}
</script>
