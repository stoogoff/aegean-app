<template>
	<li class="py-1">
		<span class="hover:text-blue-600 cursor-pointer" @click="loadAdversary">
			{{ adversary.title }}
		</span>
		<tag-view>{{ adversary.type }}</tag-view>
	</li>
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

	methods: {
		loadAdversary() {
			this.$emit('click', this.adversary.id)
		}
	}
})
</script>
