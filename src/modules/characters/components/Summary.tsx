
import { Icon, Button } from '~/components/ui'
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
		<Button onClick={onDelete}><Icon icon="trash" /> Delete</Button>
	</div>
)

