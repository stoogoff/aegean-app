
const OG_TYPE = 'website'
const BASE_URL = 'https://app.aegeanrpg.com'
const BASE_TITLE = 'Aegean'
const BASE_DESCRIPTION = 'AEGEAN is a tabletop role-playing game about a group of mythic heroes building a new, free city on the shores of the Aegean Sea. There are neighbouring cities to trade or war with, monsters to kill, gods to appease, deceptions, negotiations and bloody skirmishes.'
const BASE_IMAGE = `${BASE_URL}/img/kickstarter-banner.png`

export const title = meta => meta && meta.title ? `${meta.title} | ${BASE_TITLE}` : BASE_TITLE

export const url = meta => meta && meta.url ? `${BASE_URL}${meta.url}` : `${BASE_URL}/`

export const image = meta => meta && meta.image ? `${BASE_URL}${meta.image}` : BASE_IMAGE

export const description = meta => (meta && meta.description) || BASE_DESCRIPTION

export const meta = (meta, additional = null) => {
	const newTitle = title(meta)
	const combinedUrl = url(meta)
	const newImage = image(meta)
	const newDescription = description(meta)

	let tags = [
		{
			hid: 'description',
			name: 'description',
			content: newDescription,
		},
		{
			hid: 'og:type',
			property: 'og:type',
			content: (meta && meta.type) || OG_TYPE,
		},
		{
			hid: 'og:url',
			property: 'og:url',
			content: combinedUrl,
		},
		{
			hid: 'og:title',
			property: 'og:title',
			content: newTitle,
		},
		{
			hid: 'og:description',
			property: 'og:description',
			content: newDescription,
		},
		{
			hid: 'og:image',
			property: 'og:image',
			content: newImage,
		},
		{
			hid: 'twitter:url',
			name: 'twitter:url',
			content: combinedUrl,
		},
		{
			hid: 'twitter:title',
			name: 'twitter:title',
			content: newTitle,
		},
		{
			hid: 'twitter:description',
			name: 'twitter:description',
			content: newDescription,
		},
		{
			hid: 'twitter:image',
			name: 'twitter:image',
			content: newImage,
		},
	]

	if(additional) {
		tags = [...tags, ...additional]
	}

	return tags
}