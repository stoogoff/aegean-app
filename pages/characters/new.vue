<template>
	<div class="two-column">
		<aside>
			<h1>Steps</h1>
			<ol class="list">
				<li>Choose a concept</li>
				<li>Choose a heritage</li>
				<li>Choose a background</li>
				<li>Choose characteristics</li>
				<li>Choose a starting career</li>
				<li>Spend points on skills</li>
				<li>Choose optional advantages or disadvantages</li>
				<li>Choose a Fate</li>
				<li>Select starting equipment</li>
				<li>Finishing touches</li>
			</ol>
		</aside>
		<article>
			<markdown-content content="characters/creation" />
			<div class="flex">
				<link-action to="/" block>Walkthrough</link-action>
				<link-action to="/" block>Add</link-action>
			</div>
		</article>
	</div>
</template>
<script>
export default {
	name: 'CharacterNewPage',
	layout: 'full-width',
}
</script>