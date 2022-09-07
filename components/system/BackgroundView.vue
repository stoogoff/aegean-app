<template>
	<card-view :title="`${background.title} (${background.cost}CP)`">
		<p>{{ background.description }} This gives the following benefits:</p>
		<ul class="list">
			<li><strong>Standing:</strong> {{ background.standing }}</li>
			<li>1 point in the {{ background.skills | join-and }} skill{{ background.skills.length > 1 ? 's' : '' }}.</li>
			<li v-if="background.polis">{{ background.polis }}</li>
		</ul>
		<h3>Relationships</h3>
		<p>Choose a friend and an enemy or make up some of your own.</p>
		<ul class="list">
			<li
				v-for="(relationship, idx) in background.relationships"
				:key="`relationship_${idx}`"
			>
				<render-markdown :content="relationship" strip-outer-tag />
			</li>
		</ul>
		<button-action
			block
			:outlined="hasSelected"
			:type="buttonType"
			@click="$emit('click')"
		>Select ({{ background.cost }})</button-action>
	</card-view>
</template>
<script>
import Vue from 'vue'
import { data } from '~/state'

export default Vue.component('BackgroundView', {
	props: {
		background: {
			type: Object,
			required: true,
		},
		isSelected: {
			type: Boolean,
			default: false,
		},
		hasSelected: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		buttonType() {
			return this.isSelected ? 'success' : 'primary'
		},
	},
})
</script>