import { ReactNode } from 'react'

interface Props {
	children: ReactNode
}

export const FormField = ({ children }: Props) => (
	<div className="field">
		{ children }
	</div>
)
