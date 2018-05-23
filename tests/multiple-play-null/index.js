const AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();

const url = 'https://zprodev.github.io/web-audio-test/assets/Campfire_Song.mp3';

let audioSource = null;

const eventName = typeof document.ontouchend !== 'undefined' ? 'touchend' : 'mouseup';
document.addEventListener(eventName, () => {
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
  request.onload =  () => {
    ctx.decodeAudioData(request.response, (audioBuffer) => {
      if(audioSource) {
        audioSource.disconnect();
        audioSource.buffer = null;
      }

      audioSource = ctx.createBufferSource();
      audioSource.buffer = audioBuffer;
      audioSource.connect(ctx.destination);
      audioSource.start();
    });
  }
  request.send();
});