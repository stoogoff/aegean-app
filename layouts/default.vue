<template>
	<div>
		<main-nav />
		<section class="relative py-16">
			<div class="container mx-auto md:px-4 max-w-screen-lg">
				<div class="relative flex flex-col py-8 w-full mb-6 pb-8">
					<Nuxt />
				</div>
			</div>
		</section>
		<message-view v-if="hasText">{{ text }}</message-view>
		<responsive-debug />
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