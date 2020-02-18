import { AudioPlayer, PrimaryAudioPlayer } from './lib/Player'

// const audio = document.createElement('audio')
// audio.src = 'ПопКорн - Целый лям.mp3'
// audio.controls = true
// @ts-ignore
window.Audio = new AudioPlayer()

window.PrimaryAudioPlayer = PrimaryAudioPlayer
