import PlayerApi from './PlayerApi'

const LISTENERS_NAME = '_listeners'
export default class PlayerEvent {
	protected [LISTENERS_NAME]: { [key: string]: Function[] } = {}
	public on(event: string, callback: Function) {
		if (!this[LISTENERS_NAME][event]) {
			this[LISTENERS_NAME][event] = []
		}

		this[LISTENERS_NAME][event].push(callback)
		return this
	}
	public off(event: string, callback: Function) {
		if (!this[LISTENERS_NAME][event]) {
			return this
		}

		if (!callback) {
			delete this[LISTENERS_NAME][event]
			return this
		}

		let callbacks: Function[] = this[LISTENERS_NAME][event]
		for (let k = 0, l = callbacks.length; k < l; k++) {
			if (callbacks[k] === callback) {
				callbacks.splice(k, 1)
				if (!callbacks.length) {
					delete this[LISTENERS_NAME][event]
				}
				break
			}
		}
		return this
	}

	public trigger(event: string, target: any) {
		if (!this[LISTENERS_NAME][event]) {
			return this
		}

		Array.from([...this[LISTENERS_NAME][event]]).forEach((callback: Function) => {
			callback(target)
		})
		return this
	}
}

export interface ITriggerPlayerEvent {
	control: PlayerApi
}
export class TriggerPlayerEvent extends CustomEvent<ITriggerPlayerEvent> {}
