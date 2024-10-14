<template>
	<we-text-input :label="label" v-model="filter" @append="clear">
		<template #append>
			<span @click="clear()"><icon-view icon="close" /></span>
		</template>
	</we-text-input>
</template>
<script>
import Vue from 'vue'
import ListFilter from '~/headless/ListFilter'

export default Vue.component('ListFilter', ListFilter)

</script>