<template>
	<div class="card">
		<h4
			v-if="title"
			class="uppercase bg-gray-200 p-2 border-b-2 border-gray-300"
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
