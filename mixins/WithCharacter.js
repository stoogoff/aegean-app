
import CharacterCreator from '~/utils/character/creator'

const creator = new CharacterCreator()

export default {
	async fetch() {
		const { params } = this.$nuxt.context

		const character = await this.$characters.byId(params.characterId)

		this.creator.character = character

		this.onCharacterLoad()
	},
	fetchOnServer: false,

	computed: {
		creator() {
			return creator
		},
	},

	methods: {
		onCharacterLoad() {},
		onBeforeSave() {},

		async save(done) {
			this.onBeforeSave()
			await this.$characters.save(this.creator.character)
			done()
		},
	},
}
