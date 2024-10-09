<template>
	<div class="grid gap-2 grid-cols-3">
		<label :for="id" :class="`mt-1 message ${error ? 'warning' : ''}`">{{ label }}</label>
		<div>
			<input
				:id="id"
				:value="value"
				type="text"
				class="font-sans text-sm px-2 py-1 border w-20"
				@input="$emit('input', $event.target.value)"
			/>
		</div>
		<aside :class="`mt-2 text-sm message ${error ? 'warning' : ''}`">{{ message || ' ' }}</aside>
	</div>
</template>
<script>

import Vue from 'vue'
import { id } from 'we-ui/utils/string'

export default Vue.component('QuickInput', {
	props: {
		value: {
			type: [String, Number],
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			default: '',
		},
		error: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		id() {
			return id(this.label)
		},
	},
})

</script>
