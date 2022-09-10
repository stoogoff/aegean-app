
export const sortByProperty = (prop) => {
	return (a, b) => {
		a = a[prop]
		b = b[prop]

		return a == b ? 0 : (a < b ? -1: 1)
	}
}

export const sortByProperties = (prop1, prop2) => {
	const sort1 = sortByProperty(prop1)
	const sort2 = sortByProperty(prop2)

	return (a, b) => sort1(a, b) || sort2(a, b)
}

export const findByProperty = (property, value) => (item) => property in item && item[property] == value

export const indexOfByProperty = (list, property, value) => {
	for(let i = 0; i < list.length; ++i) {
		let item = list[i]

		if(property in item && item[property] == value) {
			return i
		}
	}

	return -1
}

export const unique = (arr) => arr.filter((a, i) => arr.indexOf(a) == i)

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
