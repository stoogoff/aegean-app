<template>
	<div class="relative">
		<we-text-input :label="label" v-model="filter" @append="clear">
			<template #append>
				<span @click="clear()"><icon-view icon="close" /></span>
			</template>
		</we-text-input>
		<aside class="absolute w-full z-10 border border-gray-200 rounded-md shadow max-h-60 overflow-y-auto" :class="{ 'hidden': !menuOpen }">
			<div
				class="bg-white px-4 py-2 hover:bg-gray-100 cursor-default"
				v-for="item in filtered"
				:key="item[property]"
				@click="select(item)">{{ item[property] }}</div>
		</aside>
	</div>
</template>
<script>
import Vue from 'vue'
import ListFilter from '~/headless/ListFilter'

export default Vue.component('SelectFilter', {
	mixins: [ListFilter],

	data() {
		return {
			menuOpen: false,
		}
	},

	mounted() {
		document.addEventListener('click', () => {
			Vue.nextTick(() => {
				this.menuOpen = false
			})
		})
	},

	watch: {
		filter(text) {
			this.menuOpen = text !== ''
		},
	},

	methods: {
		select(item) {
			this.menuOpen = false
			this.$emit('select', item)
		},
	},
})

</script>