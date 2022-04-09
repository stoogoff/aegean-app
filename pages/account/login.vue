<template>
	<main class="py-12">
		<loading-overlay v-if="loading" />
		<div v-else>
			<h1>Login</h1>
			<alert-view type="warning" v-if="error">Your email address or password wasn’t recognised. Please try again.</alert-view>
			<validate-field :value="email" :rules="rules.email" v-slot="{ error, message }">
				<text-input label="Email Address" v-model="email" :error="error" :message="message" />
			</validate-field>
			<validate-field :value="password" :rules="rules.password" v-slot="{ error, message }">
				<password-input label="Password" v-model="password" :error="error" :message="message" />
			</validate-field>
			<div class="flex">
				<link-action block type="primary" outlined to="/account/register">Register</link-action>
				<button-action block type="primary" :disabled="!canContinue" @click="login">Login</button-action>
			</div>
		</div>
	</main>
</template>
<script>

import { required, email, validateBatch } from '~/utils/validators'
import { user } from '~/state'

export default {
	data() {
		return {
			email: '',
			password: '',
			error: false,
			loading: false,
		}
	},

	computed: {
		rules() {
			return {
				email: [required(), email()],
				password: [required()],
			}
		},

		canContinue() {
			return validateBatch(this.rules, {
				email: this.email,
				password: this.password,
			})
		},
	},

	methods: {
		async login() {
			this.loading = true

			try {
				await user.login(this.email, this.password)

				this.$router.push('/')
			}
			catch(error) {
				this.error = true
			}

			this.loading = false
		},
	},
}
</script>