const AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();

const request = new XMLHttpRequest();
const url = 'https://zprodev.github.io/web-audio-test/assets/Campfire_Song.mp3';
request.open('GET', url, true);
request.responseType = 'arraybuffer';
request.onload =  () => {
  ctx.decodeAudioData(request.response).then((audioBuffer) => {
    console.log("length:" + audioBuffer.length.toString());
  });
}
request.send();