<template>
	<article>
		<header class="marble">
			<h1>AEGEAN</h1>
		</header>
		<div class="container">
			<div>
				<h2 class="meander"><span>Characters</span></h2>
				<p>Create a new character and view existing ones.</p>
				<we-link-action to="/characters/" outlined block>Characters</we-link-action>
			</div>
			<div>
				<h2 class="meander"><span>Cities</span></h2>
				<p><tag-view type="success">Coming Soon!</tag-view> Create a new city and view existing ones.</p>
				<we-button-action outlined block disabled>Cities</we-button-action>
			</div>
			<div>
				<h2 class="meander"><span>Adversaries</span></h2>
				<p>Find adversaries to fight.</p>
				<we-link-action to="/adversaries/" outlined block>Adversaries</we-link-action>
			</div>
			<div>
				<h2 class="meander"><span>Factions</span></h2>
				<p><tag-view type="success">Coming Soon!</tag-view> View factions.</p>
				<we-button-action outlined block disabled>Factions</we-button-action>
			</div>
			<div>
				<h2 class="meander"><span>GM Reference</span></h2>
				<p><tag-view type="success">Coming Soon!</tag-view> View GM reference material.</p>
				<we-button-action outlined block disabled>Reference</we-button-action>
			</div>
		</div>
	</article>
</template>
<script>
export default {
	name: 'IndexPage',
}
</script>
