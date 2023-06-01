<template>
	<main>
		<h1>AEGEAN</h1>
		<ul>
			<li>
				<h2>Characters</h2>
				<p>Create a new character and view existing ones.</p>
				<we-link-action to="/characters/" block>Characters</we-link-action>
			</li>
			<li>
				<h2>Cities</h2>
				<p>Create a new city and view existing ones.</p>
			</li>
			<li>
				<h2>Adversaries</h2>
				<p>Find adversaries to fight.</p>
				<we-link-action to="/adversaries/" block>Adversaries</we-link-action>
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
			<we-text-input label="Pouch Test Name" v-model="doc.title" />
			<we-button-action @click="test">TEST</we-button-action>
		</div>
		<accordion-group>
			<accordion-item open>
				<template #trigger>
					TEST 1
				</template>
				<template #content>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
				</template>
			</accordion-item>
			<accordion-item>
				<template #trigger>
					TEST 2
				</template>
				<template #content>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
				</template>
			</accordion-item>
			<accordion-item>
				<template #trigger>
					TEST 3
				</template>
				<template #content>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
				</template>
			</accordion-item>

		</accordion-group>
	</main>
</template>

<script>

export default {
	name: 'IndexPage',

	async fetch() {
		this.doc = await this.$db.get('mydoc')
		console.log('doc=', this.doc)

		try {
			const response = await this.$db.get('notthere')

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
			let response = await this.$db.put(this.doc)

			console.log(response)
		}
	},
}
</script>
