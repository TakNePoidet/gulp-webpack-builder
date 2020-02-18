import PlayerEvent, { TriggerPlayerEvent } from './HandleEvent'

const defaultEvent = [
	'canplay',
	'play',
	'pause',
	'loadstart',
	'playing',
	'progress',
	'ratechange',
	'seeked',
	'seeking',
	'timeupdate',
	'volumechange'
]
export default class PlayerApi {
	protected _event: PlayerEvent
	constructor(protected $el: HTMLAudioElement | HTMLVideoElement) {
		this.addEventListener()
		this._event = new PlayerEvent()
	}

	/**
	 *
	 */
	set sourse(sourse: string) {
		this.$el.src = sourse
	}

	/**
	 * Начать воспроизведение
	 * @returns {void}
	 */
	play(): void {
		this.$el.play()
	}

	/**
	 * Поставить на паузу
	 * @returns {void}
	 */
	pause(): void {
		this.$el.pause()
	}

	/**
	 * Остановить воспроизведение
	 * @returns {void}
	 */
	stop(): void {
		this.$el.pause()
		this.currentTime = 0
	}

	/**
	 * Получить статус воспроизведения
	 * @returns {boolean}
	 */
	get playing(): boolean {
		return !this.$el.paused
	}

	/**
	 * Длительность
	 * @returns {number}
	 */
	get duration(): number {
		return this.$el.duration
	}

	/**
	 * Получить позицию воспроизведения
	 * @returns {number}
	 */
	get currentTime(): number {
		return this.$el.currentTime
	}

	/**
	 * Установить текущую позицию воспроизведения
	 * @param {number} position
	 */
	set currentTime(position: number) {
		this.$el.currentTime = position - 0.001 //THINK: legacy-код. Понять нафиг тут нужен 0.001
	}

	/**
	 * Получить длительность загруженной части
	 * @returns {number}
	 */
	get buffered(): number {
		var element = this.$el
		if (element.buffered.length) {
			return element.buffered.end(0) - element.buffered.start(0)
		}
		return 0
	}

	/**
	 * Текущая громкость
	 * @returns {number}
	 */
	get volume(): number {
		return this.$el.volume
	}

	/**
	 * Текущая громкость
	 * @param {number} volume
	 */
	set volume(volume: number) {
		this.$el.volume = volume / 100
	}

	/**
	 * Включение и отключение звука
	 * * @param {boolean} muted
	 */
	set muted(muted: boolean) {
		this.$el.muted = muted
	}

	/**
	 * Публичный метод для подписи на события
	 * @param {string} event
	 * @param {Function} callback
	 */
	public on(event: string, callback: Function) {
		this._event.on(event, callback)
	}

	/**
	 * Публичный метод для отписки на событие
	 * @param {string} event
	 * @param {Function} callback
	 */
	public off(event: string, callback: Function) {
		this._event.off(event, callback)
	}

	/**
	 * Обработчик событий
	 * @param {Event} event
	 */
	public handleEvent(event: Event) {
		this._event.trigger(event.type, this)
	}

	/**
	 * Подпись на события плеера
	 */
	protected addEventListener(): void {
		Array.from<string>(defaultEvent).forEach((event: string) => {
			this.$el.addEventListener(event, this)
		})
	}

	/**
	 * Удаление подписи на события плеера
	 */
	protected removeEventListener(): void {
		Array.from<string>(defaultEvent).forEach((event: string) => {
			this.$el.removeEventListener(event, this)
		})
	}
}
