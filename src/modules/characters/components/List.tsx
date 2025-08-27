
import { useNavigate } from 'react-router'
import { Button } from '~/components/ui'
import { useAuthContext } from '~/modules/auth/context'
import { useCharacterStore } from '../hooks/useCharacterStore'
import { Character } from '../models/Character'
import { CharacterSummary } from './Summary'

export const CharacterList = () => {
	const navigate = useNavigate()
	const { characters, deleteCharacter } = useCharacterStore()
	const { user } = useAuthContext()

	const onClick = () => navigate('/characters/new')

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
				<Button
					onClick={onClick}
					block
					gradient
					disabled={!user.canCreateCharacter(characters.length)}
				>
					Create New
				</Button>
			</div>
		</article>
	)
}
