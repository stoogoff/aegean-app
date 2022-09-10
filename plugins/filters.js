
import Vue from 'vue'
import { join } from '~/utils/list'

Vue.filter('lower', value => (value || '').toLowerCase())
Vue.filter('upper', value => (value || '').toUpperCase())
Vue.filter('join', value => (value || []).join(', '))
Vue.filter('join-and', join(', and '))
Vue.filter('join-or', join(', or '))
