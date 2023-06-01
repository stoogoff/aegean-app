<template>
	<div>
		<message-view v-if="hasText">{{ text }}</message-view>
		<we-responsive-debug />
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('FooterSection', {
	computed: {
		text() {
			return this.$messages.getMessage()
		},

		hasText() {
			return this.$messages.hasMessage()
		}
	}
})
</script>