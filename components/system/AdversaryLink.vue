<template>
	<div class="py-1">
		<nuxt-link :to="`/adversaries/${adversary.id}`" class="hover:text-blue-600">
			{{ adversary.title }}
		</nuxt-link>
		<tag-view>{{ adversary.type }}</tag-view>
	</div>
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
