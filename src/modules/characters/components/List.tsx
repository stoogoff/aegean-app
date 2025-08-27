
import { Link } from 'react-router'
import { useCharacterStore } from '../hooks/useCharacterStore'
import { Character } from '../models/Character'
import { CharacterSummary } from './Summary'

export const CharacterList = () => {
	const { characters, deleteCharacter } = useCharacterStore()

	return (
		<article>
			<header className="marble">
				<h1>Characters</h1>
			</header>
			<div className="container">
				{ characters.map((character: Character) =>
					<CharacterSummary key={character.id} character={character} onDelete={() => deleteCharacter(character)} />)
				}
				<p>Use the button below to create a new character. Once you’ve created a character they will appear here.</p>
				<Link to="/characters/new" className="btn block gradient">Create New</Link>
			</div>
		</article>
	)
}
