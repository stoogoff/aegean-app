import { ReactNode, useMemo } from 'react'

interface Props {
	block?: boolean;
	outlined?: boolean;
	gradient?: boolean;
	disabled?: boolean;
	onClick: () => void;
	children: ReactNode;
}

export const Button = ({
	children,
	onClick,
	block = false,
	outlined = false,
	gradient = false,
	disabled = false,
}: Props) => {
	const classes = useMemo(() => {
		const classes = ['btn']

		if(block) classes.push('block w-full')
		if(outlined) classes.push('outlined')
		if(gradient) classes.push('gradient')

		return classes
	}, [block, outlined, gradient])

	return <button className={classes.join(' ')} disabled={disabled} onClick={onClick}>{children}</button>
}
