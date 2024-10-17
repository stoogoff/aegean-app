
// chargen data imports
import advantages from '~/static/data/chargen/advantages.json'
import backgrounds from '~/static/data/chargen/backgrounds.json'
import characteristics from '~/static/data/chargen/characteristics.json'
import divinities from '~/static/data/chargen/divinities.json'
import heritages from '~/static/data/chargen/heritages.json'

// data imports
import attacks from '~/static/data/attacks.json'
import careers from '~/static/data/careers.json'
import cults from '~/static/data/cults.json'
import deities from '~/static/data/deities.json'
import equipment from '~/static/data/equipment.json'
import gifts from '~/static/data/gifts.json'
import properties from '~/static/data/properties.json'
import talents from '~/static/data/talents.json'

function Data(list) {
	this.all = () => list
	this.byTitle = title => list.find(i => i.title === title)
	this.find = func => list.find(func)
	this.filter = func => list.filter(func)
}

export default () => {
	return {
		advantages: new Data(advantages),
		backgrounds: new Data(backgrounds),
		characteristics: new Data(characteristics),
		divinities: new Data(divinities),
		heritages: new Data(heritages),

		attacks: new Data(attacks),
		careers: new Data(careers),
		cults: new Data(cults),
		deities: new Data(deities),
		equipment: new Data(equipment),
		gifts: new Data(gifts),
		properties: new Data(properties),
		talents: new Data(talents),
	}
}
