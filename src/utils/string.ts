
import { v1, v5 } from 'uuid'

export const random = (length: number = 6): string => {
	let output: string[] = []
	const characters = '0123456789abcdefghijklmnopqrstuvwxyz'

	for(let i = 0; i < length; ++i) {
		output.push(characters[Math.floor(characters.length * Math.random())])
	}

	return output.join('')
}

export const toTitleCase = (text?: string): string =>
	(text ?? '').substring(0, 1).toUpperCase() + text.substring(1).toLowerCase()

export const slugify = (text?: string): string =>
	(text || '').toString()
		.toLowerCase()
		.trim()
		.replace(/^\W+/, '')
		.replace(/\s+/g, '-')

export const normalise = (text?: string) =>
	(text || '').toString()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()

export const uuid = () => v5('app.aegeanrpg.com', v1())
