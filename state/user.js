
import Vue from 'vue'
//import { AuthProvider, auth } from '~/plugins/firebase'
import { character, image } from '~/state'

const state = Vue.observable({
	//user: null,
	user: { email: 'stoo.goff@gmail.com', name: 'stoo', uid: 1 },
})


export default {
	getLoggedInUser() {
		return state.user
	},

	setLoggedInUser(user) {
		state.user = user
	},

	async logout() {
		await auth().signOut()

		this.anonymous()

		character.reset()
		image.reset()
	},

	async anonymous() {
		/*try {
			const anonymousUser = await auth().signInAnonymously()

			this.setLoggedInUser({
				uid: anonymousUser.user.uid,
				email: '',
				isAnonymous: true,
			})
		}
		catch(error) {
			console.warn(error)
		}*/
	},

	async register(email, password) {
		/*const credentials = AuthProvider.credential(email, password)
		const newUser = await auth().currentUser.linkWithCredential(credentials)
		const user = auth().currentUser

		user.sendEmailVerification()

		this.setLoggedInUser({
			uid: newUser.user.uid,
			email: newUser.user.email,
			isAnonymous: newUser.user.isAnonymous
		})*/
	},

	async login(email, password) {
		//await auth().signInWithEmailAndPassword(email, password)
	},
}