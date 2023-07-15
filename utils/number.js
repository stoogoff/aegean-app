
const gcd = (a, b) => {
	if(!b) return a

	return gcd(b, a % b)
}

export const toFraction = (input, precision = 2) => {
	const [int, dec] = input
		.toFixed(precision)
		.split('.')
		.map(n => +n)

	if(dec === 0) return int

	const powerOf10 = 10 ** precision
	const gcdVal = gcd(dec, powerOf10)
	const fraction = `${ dec / gcdVal}/${ powerOf10 / gcdVal }`

	return int ? `${int} ${fraction}` : fraction
}
