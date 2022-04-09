<template>
	<main class="py-12">
		<loading-overlay v-if="loading" />
		<div v-else>
			<h1>Register</h1>
			<alert-view type="warning" v-if="error">There was an error creating your account. Please try again or trying logging in.</alert-view>
			<p>Your password must be at least eight characters long and contain one:</p>
			<ul class="list">
				<li :class="{ 'text-green-600': hasUpper }">Uppercase letter</li>
				<li :class="{ 'text-green-600': hasLower }">Lowercase letter</li>
				<li :class="{ 'text-green-600': hasNumber }">Number</li>
				<li :class="{ 'text-green-600': hasSpecial }">Special character</li>
			</ul>
			<validate-field :value="email" :rules="rules.email" v-slot="{ error, message }">
				<text-input label="Email Address" v-model="email" :error="error" :message="message" />
			</validate-field>
			<validate-field :value="password" :rules="rules.password" v-slot="{ error, message }">
				<password-input label="Password" v-model="password" :error="error" :message="message" />
			</validate-field>
			<validate-field :value="confirmPassword" :rules="rules.confirmPassword" v-slot="{ error, message }">
				<password-input label="Confirm Password" v-model="confirmPassword" :error="error" :message="message" />
			</validate-field>
			<div class="flex">
				<link-action block type="primary" outlined to="/account/login">Login</link-action>
				<button-action block type="primary" :disabled="!canContinue" @click="register">Register</button-action>
			</div>
		</div>
	</main>
</template>
<script>

import { required, email, minLen, specialChar, uppercase, lowercase, numbers, validate, validateBatch } from '~/utils/validators'
import { user } from '~/state'

export default {
	data() {
		return {
			email: '',
			password: '',
			confirmPassword: '',
			error: false,
			loading: false,
		}
	},

	computed: {
		hasUpper() {
			return validate([ uppercase() ], this.password).length === 0
		},

		hasLower() {
			return validate([ lowercase() ], this.password).length === 0
		},

		hasNumber() {
			return validate([ numbers() ], this.password).length === 0
		},

		hasSpecial() {
			return validate([ specialChar() ], this.password).length === 0
		},


		rules() {
			return {
				email: [required(), email()],
				password: [required(), minLen(8), uppercase(), lowercase(), numbers(), specialChar()],
				confirmPassword: [required(), value => value === this.password || 'Password and confirm password must match']
			}
		},

		canContinue() {
			return validateBatch(this.rules, {
				email: this.email,
				password: this.password,
				confirmPassword: this.confirmPassword,
			})
		},
	},

	methods: {
		async register() {
			this.loading = true

			try {
				await user.register(this.email, this.password)

				this.$router.push('/')
			}
			catch(error) {
				console.warn(error)
				this.error = true
			}

			this.loading = false
		},
	},
}
</script>