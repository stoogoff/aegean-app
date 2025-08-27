
import { User } from './User'

export class GuestUser extends User {
	canCreateCharacter(currentAmount: number) {
		return currentAmount < 3
	}
}
