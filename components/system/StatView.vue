<template>
	<div class="flex flex-col text-center">
		<span>{{ value }}</span>
		<span class="text-sm text-gray-500 uppercase">{{ label }}</span>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('StatView', {
	props: {
		label: {
			type: String,
			required: true,
		},
		value: {
			type: [String, Number],
			required: true,
		},
	}
})
</script>
