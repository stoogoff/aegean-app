<template>
	<nav-bar v-bind="$attrs">
		<template #title>
			<nuxt-link to="/" class="no-link">Aegean</nuxt-link>
		</template>
		<template #buttons>
			<nav-button icon="ellipsis" @click="toggleNavbar()" />
		</template>
		<transition name="fade">
			<div
				v-if="navbarOpen"
				class="absolute top-14 left-4 right-4 md:hidden bg-white block rounded shadow-lg"
			>
				<menu-list :menu-items="menuItems" />
			</div>
		</transition>
		<div class="hidden md:flex flex-grow items-center bg-transparent shadow-none">
			<menu-list :menu-items="menuItems" />
		</div>
	</nav-bar>
</template>
<script>
import Vue from 'vue'
//import { user } from '~/state'

const ACCOUNT = 3

export default Vue.component('MainNav', {
	props: {
		transparent: {
			type: Boolean,
			default: false,
		}
	},

	data() {
		return {
			navbarOpen: false,
			suppressClose: false,
		}
	},

	mounted() {
		document.addEventListener('click', () => {
			Vue.nextTick(() => {
				if(!this.suppressClose) {
					this.navbarOpen = false
				}

				this.suppressClose = false
			})
		})
	},

	computed: {
		menuItems() {
			let menuItems = [
				{
					title: 'Home',
					href: '/',
					icon: 'home',
				},
				{
					title: 'Characters',
					href: '/characters',
					icon: 'characters',
				},
				{
					title: 'Adversaries',
					href: '/adversaries',
					//icon: 'characters',
				},
				{
					title: 'Account',
					href: '/account',
					icon: 'account-circle',
				},
			]

			// add characters
			/*const characters = character.all()

			menuItems[CHARACTERS].menuItems = characters.map(character => ({
				title: character.name || `Unnamed character (${character.id})`,
				href: `/characters/${character.id}`,
			}))

			menuItems[CHARACTERS].menuItems.push({
				title: 'New Character',
				href: '/characters/new',
				separator: true,
			})*/

			// update account options depending on user state
			/*const loggedInUser = user.getLoggedInUser()

			if(!loggedInUser || loggedInUser.isAnonymous) {*/
				menuItems[ACCOUNT].menuItems = [
					{ title: 'Login', href: '/account/login' },
					{ title: 'Register', href: '/account/register' },
				]
			/*}
			else {
				menuItems[ACCOUNT].menuItems = [
					{ title: 'Logout', href: '/account/logout'},
				]
			}*/

			return menuItems
		},

		background() {
			return this.transparent ? 'bg-transparent' : 'bg-gray-600'
		},
	},

	methods: {
		toggleNavbar() {
			this.navbarOpen = !this.navbarOpen

			if(this.navbarOpen !== false) {
				this.suppressClose = true
			}
		},
	},
})
</script>
<style>
.fade-enter-active, .fade-leave-active {
	transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
	opacity: 0;
}
</style>