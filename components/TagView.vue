<template>
	<span class="tag uppercase bg-gray-300 inline-block px-1.5 pt-1 pb-0.5 rounded font-normal" :class="type"><slot /></span>
</template>
<script>
import Vue from 'vue'

export default Vue.component('TagView', {
	props: {
		type: {
			type: String,
			default: '',
		},
	},
})
</script>