module.exports = {
	content: ['./node_modules/we-ui/components/**/*.vue'],
	variants: {
		extend: {
			backgroundColor: ['even'],
		}
	},
	safelist: [
		'grid-cols-4',
		'grid-cols-5',
		'grid-cols-6',
	],
}