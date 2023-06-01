<template>
	<div>
		<header-section />
		<section class="relative py-16">
			<div class="relative py-8 px-8 w-full mb-6">
				<Nuxt />
			</div>
		</section>
		<footer-section />
	</div>
</template>
<script>

export default {
	name: 'FullWidthLayout',
}

</script>