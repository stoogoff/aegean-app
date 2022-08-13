<template>
	<aside>
		<h3>Progress</h3>
		<section>
			<strong>Creation Points:</strong> {{ character.cp }} / {{ startingCreationPoints }}
		</section>
		<section v-if="character.heritage">
			<div><strong>Heritage:</strong> {{ character.heritage.title }}</div>
			<div v-if="character.parent"><strong>Parent:</strong> {{ character.parent.title }}</div>
			<div>
				<link-action
					small
					:to="`/characters/${character.id}/heritage`"
				>Edit</link-action>
			</div>
		</section>
	</aside>
</template>
<script>
import Vue from 'vue'
import { STARTING_CREATION_POINTS } from '~/utils/config'

export default Vue.component('CharacterProgress', {
	props: {
		character: {
			type: Object,
			required: true,
		},
	},

	computed: {
		remainingCreationPoints() {
			return 1
		},

		startingCreationPoints() {
			return STARTING_CREATION_POINTS
		},
	},
})
</script>