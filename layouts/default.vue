<template>
	<div>
		<header-section />
		<section class="relative py-16">
			<div class="container mx-auto md:px-4 max-w-screen-lg">
				<Nuxt />
			</div>
		</section>
		<message-view v-if="hasText">{{ text }}</message-view>
		<we-responsive-debug />
	</div>
</template>
<script>

import { message } from '~/state'

export default {
	name: 'DefaultLayout',

	computed: {
		text() {
			return message.getMessage()
		},

		hasText() {
			return message.hasMessage()
		}
	}
}

</script>