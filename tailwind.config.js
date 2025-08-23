/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
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