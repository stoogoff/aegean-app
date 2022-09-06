<template>
	<div>
		<div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
			<ul class="flex flex-wrap -mb-px">
				<li class="mr-2" v-for="(tab, idx) in tabs" :key="`tab_${idx}`">
					<span class="tab" :class="{ active: tab.active, disabled: tab.disabled }" @click="activate(tab)">
						{{ tab.title }}
					</span>
				</li>
			</ul>
		</div>
		<slot />
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('TabGroup', {
	props: {
		active: {
			type: String,
			default: '',
		},
	},

	data() {
		return {
			tabs: []
		}
	},

	mounted() {
		this.tabs = this.$children

		if(this.active) {
			this.tabs.forEach(tab => {
				if(tab.title === this.active) {
					tab.active = true
				}
			})
		}
		else {
			this.tabs[0].active = true
		}
	},

	methods: {
		activate(tab) {
			if(tab.disabled) return

			this.tabs.forEach(child => child.active = child === tab)
		},
	},
})

</script>
<style scoped>
.tab {
	@apply inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 cursor-pointer;
}
.tab.active {
	@apply text-blue-600 border-blue-600;
}
.tab.disabled {
	@apply text-gray-400 hover:text-gray-400 hover:border-gray-200 cursor-not-allowed;
}
</style>