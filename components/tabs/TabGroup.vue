<template>
	<div>
		<div class="text-sm font-medium text-center border-b tab-group">
			<ul :class="`grid -mb-px grid-cols-${tabs.length}`">
				<li
					class="tab-item cursor-pointer inline-block px-4 py-2 rounded-t-lg border-b-2 border-transparent flex gap-2"
					:class="{ active: tab.active, disabled: tab.disabled }"
					v-for="(tab, idx) in tabs"
					:key="`tab_${idx}`"
					@keypress.enter="activate(tab)"
					@keypress.space.prevent="activate(tab)"
					@click="activate(tab)"
				>
					<span class="flex-none" v-html="iconActual(tab.icon)" />
					<span class="hidden md:inline">{{ tab.title }}</span>
				</li>
			</ul>
		</div>
		<slot />
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('TabGroup', {
	props: {
		active: {
			type: String,
			default: '',
		},
	},

	data() {
		return {
			tabs: []
		}
	},

	mounted() {
		this.tabs = this.$children

		if(this.active) {
			this.tabs.forEach(tab => {
				if(tab.title === this.active) {
					tab.active = true
				}
			})
		}
		else {
			this.tabs[0].active = true
		}
	},

	methods: {
		activate(tab) {
			if(tab.disabled) return

			this.tabs.forEach(child => child.active = child === tab)
		},

		iconActual(icon) {
			switch(icon) {
				// tab icons
				case 'account':
					return '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>'
				case 'script-outline':
					return '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M15,20A1,1 0 0,0 16,19V4H8A1,1 0 0,0 7,5V16H5V5A3,3 0 0,1 8,2H19A3,3 0 0,1 22,5V6H20V5A1,1 0 0,0 19,4A1,1 0 0,0 18,5V9L18,19A3,3 0 0,1 15,22H5A3,3 0 0,1 2,19V18H13A2,2 0 0,0 15,20M9,6H14V8H9V6M9,10H14V12H9V10M9,14H14V16H9V14Z" /></svg>'
				case 'sword':
					return '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M6.92,5H5L14,14L15,13.06M19.96,19.12L19.12,19.96C18.73,20.35 18.1,20.35 17.71,19.96L14.59,16.84L11.91,19.5L10.5,18.09L11.92,16.67L3,7.75V3H7.75L16.67,11.92L18.09,10.5L19.5,11.91L16.83,14.58L19.95,17.7C20.35,18.1 20.35,18.73 19.96,19.12Z" /></svg>'
				case 'dice-d10':
					return '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M14.07 8.21C15.5 8.21 16.64 9.36 16.64 10.78V13.42C16.64 14.84 15.5 16 14.07 16C12.64 16 11.5 14.84 11.5 13.42V10.78C11.5 9.36 12.65 8.21 14.07 8.21M10.36 8.41H10.5V16H9V10.21L7.22 10.76V9.53L10.36 8.41M14.06 9.65C13.47 9.65 13 10.13 13 10.71V13.5C13 14.07 13.47 14.54 14.06 14.54C14.64 14.54 15.14 14.06 15.14 13.5V10.71C15.14 10.12 14.64 9.65 14.06 9.65Z" /></svg>'
				case 'flash':
					return '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M7,2V13H10V22L17,10H13L17,2H7Z" /></svg>'
				case 'crystal-ball':
					return '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M9.38,8.38L11.5,9.34L13.62,8.38L12.66,10.5L13.62,12.62L11.5,11.66L9.38,12.62L10.34,10.5L9.38,8.38M16.5,2.5L17.59,5.41L20.5,6.5L17.59,7.59L16.5,10.5L15.41,7.59L12.5,6.5L15.41,5.41L16.5,2.5M6,19H7V18A1,1 0 0,1 8,17H8.26C6,15.7 4.5,13.28 4.5,10.5A7.5,7.5 0 0,1 12,3C13.05,3 14.05,3.22 14.96,3.61L14.59,4.59L13.17,5.12C12.79,5.04 12.4,5 12,5A5.5,5.5 0 0,0 6.5,10.5A5.5,5.5 0 0,0 12,16C14.91,16 17.3,13.73 17.5,10.87L18.41,8.41L19.12,8.14C19.37,8.88 19.5,9.68 19.5,10.5C19.5,13.28 18,15.7 15.74,17H16A1,1 0 0,1 17,18V19H18A2,2 0 0,1 20,21V22H4V21A2,2 0 0,1 6,19Z" /></svg>'
			}
		}
	},
})

</script>