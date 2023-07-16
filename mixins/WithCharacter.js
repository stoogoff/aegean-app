
import CharacterCreator from '~/utils/character/creator'

export default {
	async fetch() {
		const { params } = this.$nuxt.context

		this.character = await this.$characters.byId(params.characterId)

		CharacterCreator.character = this.character

		this.onCharacterLoad()
	},
	fetchOnServer: false,

	data() {
		return {
			character: null,
		}
	},

	methods: {
		onCharacterLoad() {},

		async save(done) {
			await this.$characters.save(this.character)
			done()
		},
	},
}
