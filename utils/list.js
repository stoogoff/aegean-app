
export const join = (joiner = '') => value => {
	if(!value) return ''

	const copy = [ ...value ]
	const last = copy.pop()

	switch(copy.length) {
		case 0:
			return last
		case 1:
			return copy[0] + joiner.replace(',', '') + last
		default:
			return copy.join(', ') + joiner + last
	}
}

export const sum = (a, b) => a + b
