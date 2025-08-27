
import { CharacterState, characterStore } from '../store'

export const useCharacterStore = () => {
	const characters = characterStore((state: CharacterState) => state.characters)
	const createCharacter = characterStore((state: CharacterState) => state.createCharacter)
	const deleteCharacter = characterStore((state: CharacterState) => state.deleteCharacter)

	return {
		characters,
		createCharacter,
		deleteCharacter,
	}
}
