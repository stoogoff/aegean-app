
import { adversaries, data, message } from '~/state'

export default (context, inject) => {
	inject('adversaries', adversaries())
	inject('messages', message())

	const dataAccess = data()

	Object.keys(dataAccess).forEach(key => {
		inject(key, dataAccess[key])
	})
}
