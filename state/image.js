
import Vue from 'vue'
import { storage } from '~/plugins/firebase'
import { STORAGE_CHARACTERS } from '~/utils/config'

const state = Vue.observable({
	images: [],
})


export default {
	async byPath(path) {
		const existingImage = state.images.find(img => img.path == path)

		if(existingImage) {
			return existingImage
		}

		try {
			const root = storage().ref(STORAGE_CHARACTERS)
			const url = await root.child(path).getDownloadURL()
			const metadata = await root.child(path).getMetadata()
			const newImage = {
				path,
				url,
				size: metadata.size,
				type: metadata.contentType,
				lastModified: Date.parse(metadata.updated),
			}

			state.images = [ ...state.images, newImage ]

			return newImage
		}
		catch(error) {
			console.warn('Error loading image:', error)
		}
	},

	async save(id, file) {
		if(!file.name && file.path) {
			return file.path
		}

		const name = file.name
		const ext = name.substring(name.lastIndexOf('.'))
		const root = storage().ref(STORAGE_CHARACTERS)
		const path = `${id}${ext}`
		const uploaded = root.child(path)

		await uploaded.put(file)

		return path
	},

	async delete(imagePath) {
		try {
			await storage().ref(STORAGE_CHARACTERS).child(imagePath).delete()
			state.images = state.images.filter(image => image.path !== imagePath)
		}
		catch(error) {
			console.warn('Error deleting image:', error)
		}
	},

	async reset() {
		state.images = []
	},
}
