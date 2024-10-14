
export const toTitleCase =
	input => input.substring(0, 1).toUpperCase() + input.substring(1).toLowerCase()

export const slugify = text =>
	(text || '').toString()
		.toLowerCase()
		.trim()
		.replace(/^\W+/, '')
		.replace(/\s+/g, '-')

export const normalise = text =>
	(text || '').toString()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
