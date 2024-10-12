<template>
	<we-form-field :label="label" :message="message" :error="error" v-slot="field">
		<div class="w-full">
			<select
				class="font-sans text-sm relative rounded border-2 shadow outline-none w-full px-3 py-3 "
				:disabled="disabled"
				:name="name"
				@input="$emit('input', $event.target.value)"
			>
				<option v-if="placeholder" value="" selected>{{ placeholder }}</option>
				<option
					v-for="item in items"
					:key="item"
					:selected="value === item"
					:value="item">{{ item }}</option>
			</select>
		</div>
	</we-form-field>
</template>
<script>

import Vue from 'vue'

export default Vue.component('SelectInput', {
	props: {
		label: {
			type: String,
			required: true,
		},
		items: {
			type: Array,
			required: true,
		},
		name: {
			type: String,
			default: '',
		},
		value: {
			type: [String, Number],
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		placeholder: {
			type: String,
			default: '',
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
})

</script>
