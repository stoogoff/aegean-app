<template>
	<div>
		<select-filter label="Search" :list="all" property="title" @filter="filter" @select="add" />
		<div class="mt-8 pt-8 border-t" v-if="selected.length">
			<h3>Selected</h3>
			<accordion-group>
				<accordion-item
					v-for="item in selected"
					:key="`selected_${item.title}`"
					:checked="isSelected(item.title)"
				>
					<template #trigger>
						<div>
							<strong class="text-xl">{{ item.title }}</strong>
						</div>
					</template>
					<template #content>
						<render-markdown :content="item.description" />
						<we-button-action block outlined @click="remove(item.title)">Remove</we-button-action>
					</template>
				</accordion-item>
			</accordion-group>
		</div>
	</div>
</template>
<script>

import Vue from 'vue'

export default Vue.component('FilteredTalents', {
	props: {
		all: {
			type: Array,
			required: true,
		},
		selected: {
			type: Array,
			default: () => [],
		},
	},

	data() {
		return {
			filtered: [],
		}
	},

	methods: {
		filter(filteredItems) {
			this.filtered = filteredItems.length === this.all.length ? [] : filteredItems
		},

		isSelected(title) {
			return this.selected.find(item => item.title === title) !== undefined
		},

		add(item) {
			this.$emit('add', item.title)
		},

		remove(title) {
			this.$emit('remove', title)
		},
	},
})

</script>