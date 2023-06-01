<template>
	<div>
		<header-section />
		<section class="relative py-16">
			<div class="relative py-8 px-8 w-full mb-6">
				<Nuxt />
			</div>
		</section>
		<message-view v-if="hasText">{{ text }}</message-view>
		<we-responsive-debug />
	</div>
</template>
<script>

export default {
	name: 'FullWidthLayout',

	computed: {
		text() {
			return this.$messages.getMessage()
		},

		hasText() {
			return this.$messages.hasMessage()
		}
	}
}

</script>