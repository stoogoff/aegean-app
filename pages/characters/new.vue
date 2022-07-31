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
				<button-action block @click="walkthrough">Walkthrough</button-action>
				<button-action block @click="add">Add</button-action>
			</div>
		</article>
	</div>
</template>
<script>

import { character } from '~/state'

export default {
	name: 'CharacterNewPage',
	layout: 'full-width',

	methods: {
		async create(suffix) {
			const { redirect } = this.$nuxt.context

			this.loading = true

			const newCharacter = await character.create()

			redirect(`/characters/${newCharacter.id}/${suffix}`)

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