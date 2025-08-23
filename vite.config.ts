import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
	base: '/',

	build: {
		target: 'esnext',
	},

	plugins: [react()],

	css: {
		postcss: {
			plugins: [tailwindcss(), autoprefixer()],
		},
	},

	worker: {
		format: 'es',
	},
})
