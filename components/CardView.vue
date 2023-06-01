<template>
	<div class="relative bg-gray-800 text-gray-200 border border-black rounded-md shadow-md">
		<h4
			v-if="title"
			class="uppercase text-center text-gray-100 font-bold bg-gray-900 p-2 border-b-2 border-black"
		>
			{{ title }}
		</h4>
		<div class="p-2">
			<slot />
		</div>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('CardView', {
	props: {
		title: {
			type: String,
		},
	},
})

</script>
