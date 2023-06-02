
// data imports
import heritages from '~/static/data/chargen/heritages.json'
import divinities from '~/static/data/chargen/divinities.json'
import backgrounds from '~/static/data/chargen/backgrounds.json'
import characteristics from '~/static/data/chargen/characteristics.json'
import gifts from '~/static/data/gifts.json'

function Data(list) {
	this.all = () => list
	this.byTitle = title => list.find(i => i.title === title)
}

export default () => {
	return {
		heritages: new Data(heritages),
		divinities: new Data(divinities),
		backgrounds: new Data(backgrounds),
		gifts: new Data(gifts),
		characteristics: new Data(characteristics),
	}
}
