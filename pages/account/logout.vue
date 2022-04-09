<template>
	<loading-overlay />
</template>
<script>

import { user } from '~/state'

export default {
	async mounted() {
		await user.logout()
		this.$router.push('/')
	},
}

</script>