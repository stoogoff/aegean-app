
import { useMemo } from 'react'
import { Icon as T, getIcon } from '~/utils/icons'

const SMALL = 'sm'
const MEDIUM = 'md'
const LARGE = 'lg'
const X_LARGE = 'xlg'

const SIZES = [ SMALL, MEDIUM, LARGE, X_LARGE ]

interface Props {
	icon: keyof T;
	size: typeof SIZES[number]
}

export const Icon = ({ icon, size = MEDIUM }: Props) => {
	const className = useMemo(() => {
		if(size === SMALL) return 'w-3 h-3'
		if(size === LARGE) return 'w-7 h-7'
		if(size === X_LARGE) return 'w-10 h-10'

		return 'w-5 h-5'
	}, [size])

	const iconSvg = useMemo(() => {
		return getIcon(icon)
	}, [icon])

	return <span dangerouslySetInnerHTML={{__html: iconSvg}} className={'icon inline-block ' + className} />
}
