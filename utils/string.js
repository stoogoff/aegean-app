
export const toTitleCase =
	input => input.substring(0, 1).toUpperCase() + input.substring(1).toLowerCase()

export const slugify = text => text
	.toLowerCase()
	.trim()
	.replace(/^\W+/, '')
	.replace(/\s+/g, '-')
