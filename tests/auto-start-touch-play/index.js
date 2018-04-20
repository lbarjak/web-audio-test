const AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();

const request = new XMLHttpRequest();
const url = 'https://zprodev.github.io/web-audio-test/assets/Campfire_Song.mp3';
request.open('GET', url, true);
request.responseType = 'arraybuffer';
request.onload =  () => {
  ctx.decodeAudioData(request.response, (audioBuffer) => {
    const audioSource = ctx.createBufferSource();
    audioSource.buffer = audioBuffer;
    audioSource.connect(ctx.destination);
    audioSource.start();
  });
}
request.send();

document.addEventListener('touchend', initAudioContext);
function initAudioContext(){
  document.removeEventListener('touchend', initAudioContext);
  // wake up AudioContext
  const emptySource = ctx.createBufferSource();
  emptySource.start(0);
  emptySource.stop();
}