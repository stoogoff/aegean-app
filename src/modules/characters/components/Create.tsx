
import { useNavigate } from 'react-router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TextInput, TextArea } from '~/components/forms'
import { Button } from '~/components/ui'
import { useCharacterStore } from '../hooks/useCharacterStore'
import { Character } from '../models/Character'

export const CharacterCreate = () => {
	const navigate = useNavigate()
	const { createCharacter } = useCharacterStore()
	const character = Character.create()
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Character>()
	const onSubmit: SubmitHandler<Character> = (formData) => {
		createCharacter({ ...character, ...formData.character })
		onExit()
	}

	const onExit = () => navigate('/characters')

	return (
		<div>
			<header className="marble small">
				<h1>{ character.name }</h1>
			</header>
			<div className="container">
				<form onSubmit={handleSubmit(onSubmit)}>
					<TextInput label="Name" property="character.name" register={register} />
					<TextArea label="Description" property="character.description" register={register} />
					<div className="actions">
						<Button outlined onClick={onExit}>Cancel</Button>
						<input type="submit" className="btn" value="Save" />
					</div>
				</form>
			</div>
		</div>
	)
}
