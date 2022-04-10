<template>
	<section>
		<h3>{{ title }}</h3>
		<div
			v-for="(value, key) in stats"
			:key="key"
			class="grid grid-cols-2 p-1"
		>
			<strong>{{ key }}</strong><span class="text-right inline-block">{{ value }}</span>
		</div>
	</section>
</template>
<script>
import Vue from 'vue'

export default Vue.component('StatBlock', {
	props: {
		title: {
			type: String,
			required: true,
		},
		stats: {
			type: Object,
			required: true,
		},
	},
})
</script>
<style scoped>
h3 {
	@apply uppercase text-center;
}
div:nth-child(even) {
	@apply bg-gray-200;
}
</style>