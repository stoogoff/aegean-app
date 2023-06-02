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
				<p>Create a new city and view existing ones.</p>
			</div>
			<div>
				<h2 class="meander"><span>Adversaries</span></h2>
				<p>Find adversaries to fight.</p>
				<we-link-action to="/adversaries/" outlined block>Adversaries</we-link-action>
			</div>
			<div>
				<h2 class="meander"><span>Factions</span></h2>
				<p>View factions.</p>
			</div>
			<div>
				<h2 class="meander"><span>GM Reference</span></h2>
				<p>View GM reference material.</p>
			</div>
		</div>
	</article>
</template>
<script>
export default {
	name: 'IndexPage',
}
</script>
