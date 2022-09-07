
import Vue from 'vue'

Vue.filter('lower', value => (value || '').toLowerCase())
Vue.filter('upper', value => (value || '').toUpperCase())

const join = (joiner = '') => value => {
	if(!value) value = []

	const copy = [ ...value ]
	const last = copy.pop()

	switch(copy.length) {
		case 0:
			return last
		case 1:
			return copy[0] + joiner.replace(',', '') + last
		default:
			return copy.join(', ') + joiner + last
	}
}

Vue.filter('join', value => (value || []).join(', '))
Vue.filter('join-and', join(', and '))
Vue.filter('join-or', join(', or '))

