const AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();

const element = new Audio('https://zprodev.github.io/web-audio-test/assets/Campfire_Song.mp3');
const audioSource = ctx.createMediaElementSource(element);
audioSource.connect(ctx.destination);
audioSource.mediaElement.autoplay = true;