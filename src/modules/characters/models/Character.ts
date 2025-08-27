
import {
	Characteristic,
	Heritage,
	Skill,
	CHARACTERISTIC_START,
	CHAR_MIGHT,
	CHAR_REFLEXES,
	CHAR_COOL,
	CHAR_INSIGHT,
	CHAR_CUNNING,
	SKILLS,
} from '~/utils/types'
import { uuid } from '~/utils/string'
import { Career } from './Career'
import { Gift } from './Gift'
import { Talent } from './Talent'

export class Character {
	id?: string;
	name: string;
	description?: string;
	heritage?: Heritage;
	//parent: null;
	background?: string;
	fate?: string;
	characteristics: Record<Characteristic, number> = {
		[CHAR_MIGHT]: CHARACTERISTIC_START,
		[CHAR_REFLEXES]: CHARACTERISTIC_START,
		[CHAR_COOL]: CHARACTERISTIC_START,
		[CHAR_INSIGHT]: CHARACTERISTIC_START,
		[CHAR_CUNNING]: CHARACTERISTIC_START,
	};
	skills: Record<Skill, number> = {}
	talents: Talent[] = [];
	gifts: Gift[] = [];
	careers: Career[] = [];
	//advantages = [];
	//equipment = [];
	//mysteryCults = [];
	//favour = [];
	//disfavour = [];
	//specialisations = {};

	// TODO attributes!

	constructor(name: string) {
		this.name = name
	}

	static create(): Character {
		const character = new Character('New Character')

		character.id = uuid()

		SKILLS.forEach((skill: Skill) => character.skills[skill] = 0)

		return character
	}
}
