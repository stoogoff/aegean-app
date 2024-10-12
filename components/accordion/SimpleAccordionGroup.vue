<template>
	<accordion-group>
		<accordion-item
			v-for="item in items"
			:key="`talents_${item.title}`"
			checked
		>
			<template #trigger>
				<div>
					<strong class="text-xl">{{ item.title }}</strong>
				</div>
			</template>
			<template #content>
				<render-markdown :content="item.description" />
			</template>
		</accordion-item>
	</accordion-group>	
</template>
<script>

import Vue from 'vue'

export default Vue.component('SimpleAccordionGroup', {
	props: {
		items: {
			type: Array,
			default: () => [],
		},
	},
})

</script>