import xhr from './xhr';

const files = {
  M4A_BIG : './audio/Campfire_Song.m4a',
  M4A_SMALL : './audio/Dirt_Shovel_On_Coffin.m4a',
  MP3_BIG : './audio/Campfire_Song.mp3',
  MP3_SMALL : './audio/Dirt_Shovel_On_Coffin.mp3',
}

window.AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();

const gainNode = ctx.createGain();
gainNode.connect(ctx.destination);
gainNode.gain.setValueAtTime(0.5, 0);

let audioBuffer = null;
let audioSource = null;

const params = {
  file:'M4A',
  size:'BIG',
  volume:gainNode.gain.value,
  loop:false,
  LOAD:() => {
    xhr(files[`${params.file}_${params.size}`], (arrayBuffer) => {
      ctx.decodeAudioData(arrayBuffer, (buffer) => {
        audioBuffer = buffer;
      });
    });
  },
  PLAY:() => {
    if(!audioBuffer) return;
    audioSource = ctx.createBufferSource();
    audioSource.loop = params.loop;
    audioSource.buffer = audioBuffer;
    audioSource.connect(gainNode);
    audioSource.start();
  },
  STOP:() => {
    if(!audioSource) return;
    audioSource.stop();
    audioSource.disconnect();
    audioSource.buffer = null;
    audioSource = null;
  }
}

const gui = new dat.GUI();
gui.add(params, 'file', [ 'M4A', 'MP3' ]);
gui.add(params, 'size', [ 'BIG', 'SMALL' ]);
gui.add(params, 'volume', -1, 1).onChange((value) => {
  gainNode.gain.value = value;
});
gui.add(params, 'loop').onChange((value) => {
  if(audioSource) audioSource.loop = value;
});
gui.add(params, 'LOAD');
gui.add(params, 'PLAY');
gui.add(params, 'STOP');

