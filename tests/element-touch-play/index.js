const AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();

const element = new Audio('https://zprodev.github.io/web-audio-test/assets/Campfire_Song.mp3');
const audioSource = ctx.createMediaElementSource(element);
audioSource.connect(ctx.destination);

const userAgent = window.navigator.userAgent.toLowerCase();
console.log(userAgent);
if(userAgent.indexOf('chrome') != -1) {
  const eventName = typeof document.ontouchend !== 'undefined' ? 'touchend' : 'mouseup';
  document.addEventListener(eventName, initAudioContext);
  function initAudioContext(){
    document.removeEventListener(eventName, initAudioContext);
    // wake up AudioContext
    ctx.resume();
    // First playback
    audioSource.mediaElement.play();
  }
} else if(userAgent.indexOf('safari') != -1) {
  const eventName = typeof document.ontouchstart !== 'undefined' ? 'touchstart' : 'mousedown';
  document.addEventListener(eventName, initAudioContext);
  function initAudioContext(){
    document.removeEventListener(eventName, initAudioContext);
    // wake up AudioContext
    ctx.createBufferSource().start();
    // First playback
    audioSource.mediaElement.play();
  }
}

