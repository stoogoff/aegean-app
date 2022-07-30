<template>
	<main>
		<h1>AEGEAN</h1>
		<ul>
			<li>
				<h2>Characters</h2>
				<p>Create a new character and view existing ones.</p>
				<link-action to="/characters/" block>Characters</link-action>
			</li>
			<li>
				<h2>Cities</h2>
				<p>Create a new city and view existing ones.</p>
			</li>
			<li>
				<h2>Adversaries</h2>
				<p>Find adversaries to fight.</p>
				<link-action to="/adversaries/" block>Adversaries</link-action>
			</li>
			<li>
				<h2>Factions</h2>
				<p>View factions.</p>
			</li>
			<li>
				<h2>GM Screen</h2>
				<p>View GM reference material.</p>
			</li>
		</ul>
	</main>
</template>

<script>
export default {
	name: 'IndexPage'
}
</script>
