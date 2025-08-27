
import { LinkedEntity } from './LinkedEntity'

export class Career extends LinkedEntity {
	requirements: string[] = [];
	skills: string[] = [];
	specialisations: string[] = [];
	tracks: Track[] = [];
	choose: string;
	works: string;

	constructor(title: string, description: string, choose: string, works: string) {
		super(title, description)
		this.choose = choose
		this.works = works
	}
}

export class Track {
	title: string;
	talents: string[] = []

	constructor(title: string) {
		this.title = title
	}
}
