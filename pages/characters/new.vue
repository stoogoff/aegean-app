<template>
	<div class="secondary-navigation">
		<aside class="pt-16">
			<h3>Steps</h3>
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
				<we-button-action block @click="walkthrough">Walkthrough</we-button-action>
				<we-button-action block @click="add">Add</we-button-action>
			</div>
		</article>
	</div>
</template>
<script>
export default {
	name: 'CharacterNewPage',

	methods: {
		async create(suffix) {
			const { redirect } = this.$nuxt.context

			this.loading = true

			const newId = await this.$characters.create()

			redirect(`/characters/${newId}/${suffix}`)

			this.loading = false
		},

		async walkthrough() {
			this.create('heritage')
		},

		async add() {
			this.create('add')
		},
	},
}
</script>