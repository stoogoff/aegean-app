
export class LinkedEntity {
	title: string;
	description: string;

	constructor(title: string, description: string) {
		this.title = title
		this.description = description
	}

	get id() {
		return `${this.constructor.name}:${this.title}`
	}
}
