
import { user/*, character*/ } from '~/state'
import { auth } from '~/plugins/firebase'

export default async function () {
	auth().onAuthStateChanged(async (authUser) => {
		if(authUser) {
			user.setLoggedInUser({
				uid: authUser.uid,
				email: authUser.email,
				isAnonymous: authUser.isAnonymous
			})

			//character.reset()
			//await character.fetch()
		}
		else {
			user.anonymous()
		}
	})
}
