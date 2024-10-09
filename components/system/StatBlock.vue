<template>
	<section>
		<div class="grid grid-cols-2">
			<h3 class="uppercase my-0">{{ title }}</h3>
			<span class="place-self-end">
				<slot name="header" />
			</span>
		</div>
		<definition-term
			v-for="(value, key) in stats"
			:key="key"
			:definition="key"
		>
			{{ value }}
		</definition-term>
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
div:nth-child(even) {
	@apply bg-gray-200;
}
</style>