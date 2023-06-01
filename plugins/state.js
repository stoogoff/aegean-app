
import { adversaries, data, message } from '~/state'

export default (context, inject) => {
	inject('adversaries', adversaries())
	inject('static', data())
	inject('messages', message())
}
