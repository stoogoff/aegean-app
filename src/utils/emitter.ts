import { isNull } from './assert'

type Callable = (...args: unknown[]) => void
type EventList = Record<string, Callable>

// subscribe / publish handler
export class Emitter {
	private ref = 0
	private events: Record<string, EventList> = {}

	constructor() {}

	// emit calls any functions which are mapped to the supplied string. All parameters after the first are passed to each
	// function that is called.
	emit(event: string, ...args: unknown[]): boolean {
		if(isNull(this.events[event])) {
			return false
		}

		const evt = this.events[event]

		for(let i in evt) {
			evt[i](...args)
		}

		return true
	}

	// Link the supplied callback function to supplied event string.
	on(event: string, callback: Callable): string {
		if(isNull(this.events[event])) {
			this.events[event] = {}
		}

		const ref = "evt_" + (++this.ref)

		this.events[event][ref] = callback

		return ref
	}

	// Delete the referenced function from the event.
	off(event: string, reference: string): boolean {
		if(isNull(this.events[event])) {
			return false
		}

		delete this.events[event][reference]

		return true
	}
}
