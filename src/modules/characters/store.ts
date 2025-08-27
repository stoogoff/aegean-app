
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Character } from './models/Character'

export interface CharacterState {
	characters: Character[];
	createCharacter: (character: Character) => void;
	deleteCharacter: (character: Character) => void;
}

export const characterStore = create<CharacterState>()(
	persist(
		(set, get) => ({
			characters: [],
			createCharacter: (character: Character) =>
				set({ characters: [ ...get().characters, character ]}),
			deleteCharacter: (character: Character) =>
				set({ characters: [ ...get().characters.filter(({ id }) => id !== character.id) ]})
		}),
		{ name: 'character-storage' },
	)
)
