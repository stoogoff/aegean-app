
import { Button } from '~/components/ui/Button'
import { Character } from '../models/Character'

interface Props {
	character: Character;
	onDelete: () => void;
}

// TODO add edit link
export const CharacterSummary = ({ character, onDelete }: Props) => (
	<div>
		<h2>{ character.name }</h2>
		{ character.description ? <p>{ character.description }</p> : null }
		<Button onClick={onDelete}>Delete</Button>
	</div>
)

