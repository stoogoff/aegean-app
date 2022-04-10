<template>
	<div>
		<p v-for="adv in adversaries" :key="adv.id">
			<nuxt-link :to="`/adversaries/${adv.id}`">{{ adv.title }} ({{ adv.type }})</nuxt-link>
		</p>
	</div>
</template>
<script>
import adversaries from '~/state/adversaries'

export default {
	name: 'AdversaryIndexPage',

	async fetch() {
		this.adversaries = await adversaries.all()
	},

	data() {
		return {
			adversaries: []
		}
	},
}
</script>
