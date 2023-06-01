<template>
	<div class="prose" v-html="parsedContent" />
</template>
<script>
import Vue from 'vue'
import marked from 'marked'

export default Vue.component('RenderMarkdown', {
	props: {
		content: {
			type: String,
			required: true,
		},
		stripOuterTag: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		parsedContent() {
			const content = marked.parse(this.content)

			if(!this.stripOuterTag) return content

			return content.replace(/^<[^>]+>/, '').replace(/<\/[^>]+>$/, '')
		},
	},
})
</script>