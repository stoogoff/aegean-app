
import { UseFormRegister } from 'react-hook-form'
import { FormField } from './FormField'

interface Props {
	label: string;
	property: string;
	register: UseFormRegister;
}

export const TextInput = ({ label, property, register }: Props) => (
	<FormField>
		<label htmlFor={property}>{ label }</label>
		<input id={property} {...register(property)} className="input" />
	</FormField>
)

export const TextArea = ({ label, property, register }: Props) => (
	<FormField>
		<label htmlFor={property}>{ label }</label>
		<textarea id={property} {...register(property)} className="input" />
	</FormField>
)
