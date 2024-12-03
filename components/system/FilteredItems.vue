<template>
	<div>
		<select-filter label="Search" :list="all" property="title" @filter="filter" @select="add" />
		<div class="mt-4" v-if="selected.length">
			<accordion-group>
				<accordion-item
					v-for="item in selected"
					:key="`selected_${item.title}`"
					:checked="isSelected(item.title)"
				>
					<template #trigger>
						<div>
							<strong class="text-xl">{{ item.title }}</strong>
							<tag-view v-if="subtitle">{{ item[subtitle] }}</tag-view>
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

export default Vue.component('FilteredItems', {
	props: {
		all: {
			type: Array,
			required: true,
		},
		character: {
			type: Object,
			required: true,
		},
		property: {
			type: String,
			required: true,
		},
		subtitle: {
			type: String,
			default: '',
		},
		multiple: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			filtered: [],
		}
	},

	computed: {
		selected() {
			if(!this.character) return []

			return this.all.filter(({ title }) => this.character[this.property].includes(title))
		},
	},

	methods: {
		filter(filteredItems) {
			this.filtered = filteredItems.length === this.all.length ? [] : filteredItems
		},

		isSelected(title) {
			return this.selected.find(item => item.title === title) !== undefined
		},

		add(item) {
			if(!this.character) return

			// item exists and can't appear multiple times
			// TODO should there be a message with this?
			if(!this.multiple && this.character[this.property].includes(item.title)) return

			// TODO and the object is ranked, increase the rank of the existing one
			// TODO if the object is not ranked, and if it doesn't exist or do nothing

			this.character[this.property] = [...this.character[this.property], item.title]
		},

		remove(title) {
			if(!this.character) return
			
			this.character[this.property] = this.character[this.property].filter(item => item !== title)
		},
	},
})

</script>