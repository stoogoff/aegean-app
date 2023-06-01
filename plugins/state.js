
import { adversaries, data, message } from '~/state'

export default (context, inject) => {
	inject('adversaries', adversaries())
	inject('content', data())
	inject('messages', message())
}
