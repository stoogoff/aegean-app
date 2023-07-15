<template>
	<div class="grid grid-cols-2 p-1">
		<strong>{{ definition }}</strong>
		<span class="text-right inline-block"><slot /></span>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('DefinitionTerm', {
	props: {
		definition: {
			type: String,
			required: true,
		},
	},
})
</script>