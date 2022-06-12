<template>
	<p>
		<nuxt-link :to="`/adversaries/${adversary.id}`">{{ adversary.title }} <small>({{ adversary.type }})</small></nuxt-link>
	</p>
</template>
<script>
import Vue from 'vue'

export default Vue.component('AdversaryLink', {
	props: {
		adversary: {
			type: Object,
			required: true,
		},
	},
})
</script>