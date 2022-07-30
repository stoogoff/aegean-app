<template>
	<div v-html="parsedContent" />
</template>
<script>
import Vue from 'vue'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

export default Vue.component('RenderMarkdown', {
	props: {
		content: {
			type: String,
			required: true,
		},
	},

	computed: {
		parsedContent() {
			return unified()
				.use(remarkParse)
				.use(remarkRehype)
				.use(rehypeSanitize)
				.use(rehypeStringify)
				.processSync(this.content).toString()
		},
	},
})
</script>