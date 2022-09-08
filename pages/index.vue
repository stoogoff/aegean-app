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
		<div v-if="!$fetchState.pending">
			<text-input label="Pouch Test Name" v-model="doc.title" />
			<button-action @click="test">TEST</button-action>
		</div>
	</main>
</template>

<script>
import { database } from '~/plugins/pouch'

export default {
	name: 'IndexPage',

	async fetch() {
		const db = database()

		this.doc = await db.get('mydoc')
		console.log('doc=', this.doc)

		try {
			const response = await db.get('notthere')

			console.log(response)
		}
		catch(ex) {
			console.log(ex)
		}

	},

	data() {
		return {
			doc: null,
		}
	},

	methods: {
		async test() {
			const db = database()

			let response = await db.put(this.doc)

			console.log(response)
		}
	},
}
</script>
