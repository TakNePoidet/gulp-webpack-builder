import PlayerApi from './PlayerApi'
const deepmerge = require('deepmerge')
export interface IAudioPlayerConfig {
	_audio: HTMLAudioElement
	sourse: null | string
	autoplay: boolean
	loop: boolean
	control: string[]
}

class AudioPlayerApi extends PlayerApi {}

export class AudioPlayer {
	protected _audio!: AudioPlayerApi
	protected config: IAudioPlayerConfig
	constructor(
		audio: HTMLAudioElement = document.createElement('audio'),
		config: { [key: string]: any } = {}
	) {
		this.config = deepmerge(
			{
				sourse: null,
				autoplay: false,
				loop: false,
				control: ['play', 'progress', 'current-time', 'mute', 'volume']
			},
			config
		)
		this.audio = new AudioPlayerApi(audio)
		this.init()
	}
	init() {
		if (this.config.sourse) {
			this.audio.sourse = this.config.sourse
		}
	}

	public get on() {
		return this.audio.on
	}
	public get off() {
		return this.audio.off
	}

	protected get audio(): AudioPlayerApi {
		return this._audio
	}

	protected set audio(audio: AudioPlayerApi) {
		this._audio = audio
	}
}

type Audio = [string, string, string, string, number]
export class PrimaryAudioPlayer {
	static Instanse: PrimaryAudioPlayer | null = null

	private _audio!: AudioPlayerApi
	private _curentAudio: {
		$el: HTMLElement
		uuid: string
		information: { [key: string]: string | number | HTMLElement }
	} | null = null
	constructor() {
		if (PrimaryAudioPlayer.Instanse) {
			return PrimaryAudioPlayer.Instanse
		}
		PrimaryAudioPlayer.Instanse = this

		return this
	}

	public toggleAudio(self: HTMLElement, event: Event) {
		const rootElement: HTMLElement | null = self.closest('.audio-player')
		if (!rootElement) return false
		const { audio, audioUuid } = rootElement.dataset

		if (!this._curentAudio || this._curentAudio!.uuid !== audioUuid) {
			this._initAudio(JSON.parse(audio!), rootElement)
		}
		if (!this.audio.playing) {
			this.audio.play()
		} else {
			this.audio.pause()
		}
	}

	public setCurrentTime(self: HTMLInputElement, event: Event) {
		if (!this.audio) return false
		const value: number = parseFloat(self.value)
		this.audio.currentTime = (value * this.audio.duration) / 100
	}

	private _initAudio(audio: Audio, elementOriginal: HTMLElement) {
		let [uuid, url, name, title, duration] = audio
		const $audio: HTMLAudioElement = document.createElement('audio')
		$audio.src = url
		this.audio = new AudioPlayerApi($audio)
		this._curentAudio = {
			uuid,
			$el: elementOriginal,
			information: { url, name, title, duration }
		}
		$audio.controls = true

		document.body.appendChild($audio)
		this._addEventLisner()
	}

	private handleEventPlayerApi() {
		if (!this._curentAudio) return false
		this._curentAudio.$el.classList.toggle('audio-player--playing', this.audio.playing)

		const progressPlaying = (this.audio.currentTime * 100) / this.audio.duration
		this._curentAudio.$el.querySelector('[data-audio-control="progress"]')!.value =
			progressPlaying || 0
	}
	private _addEventLisner() {
		if (this.audio) {
			this.audio.on('play', () => this.handleEventPlayerApi())
			this.audio.on('pause', () => this.handleEventPlayerApi())
			this.audio.on('timeupdate', () => this.handleEventPlayerApi())
		}
	}

	protected get audio(): AudioPlayerApi {
		return this._audio
	}
	protected set audio(audio: AudioPlayerApi) {
		this._audio = audio
	}
}
