import { LinkedEntity } from './LinkedEntity'

export class Gift extends LinkedEntity {
	active: boolean;

	constructor(title: string, active: boolean, description: string) {
		super(title, description)
		this.active = active
	}
}
