
import { LinkedEntity } from './LinkedEntity'

export class Talent extends LinkedEntity {
	ranked: boolean;
	multiple: boolean;

	constructor(title: string, description: string, ranked: boolean, multiple: boolean) {
		super(title, description)
		this.ranked = ranked
		this.multiple = multiple
	}
}
