let myReq;
const time = document.getElementById("time");
const teodoran = document.getElementById("teodoran");
const myTextArea = document.getElementById("code");
const myCodeMirror = CodeMirror.fromTextArea(myTextArea, {
    mode: "x-shader/x-fragment",
    theme: "pastel-on-dark",
    lineNumbers: true,
    indentUnit: 4,
    extraKeys: {
      "Ctrl-Space": "autocomplete",
      "Ctrl-S": function(cm) {
        cancelAnimationFrame(myReq);
        setTimeout(() => {
          loadFragmentShader(cm.getValue());
        }, 500);
      },
      "Ctrl-Q": function(cm) {
        const wrapper = cm.getWrapperElement();
        const isHidden = wrapper.style.animationName === 'fadeout';

        const animationName = isHidden ? 'fadein' : 'fadeout';
        wrapper.style.animationName = animationName;
        time.style.animationName = animationName;
        teodoran.style.animationName = animationName;

        const opacity = isHidden ? 0.8 : 0;
        wrapper.style.opacity = opacity;
        time.style.opacity = opacity;
        teodoran.style.opacity = opacity;
      }
    },
});

// FIRST AUDIO!
const createAudioContext = () => {
  return new (window.AudioContext || window.webkitAudioContext)();
}

const createGain = (audioContext) => {
  const gain = audioContext.createGain();
  gain.gain.value = 1;

  return gain;
}

const createCompressor = (audioContext) => {
  const compressor = audioContext.createDynamicsCompressor();
  compressor.threshold.value = -70;
  compressor.knee.value = 40;
  compressor.ratio.value = 12;
  compressor.attack.value = 0;
  compressor.release.value = 0.25;

  return compressor;
}

const fftSize = 2048;

const createAnalyser = (audioContext) => {
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = fftSize;

  return analyser;
}

const audioData = new Uint8Array(fftSize / 2);
audioData.fill(100);

let getAudioData = (analyser) => {
  if (!analyser) return audioData;

  // analyser.getByteTimeDomainData(audioData);
  analyser.getByteFrequencyData(audioData);

  return audioData;
}

const bindGetAudioData = (mediaStream) => {
  const audioContext = createAudioContext();
  const audioSource = audioContext.createMediaStreamSource(mediaStream);
  const gain = createGain(audioContext);
  const compressor = createCompressor(audioContext);
  const analyser = createAnalyser(audioContext);

  audioSource.connect(gain);
  gain.connect(compressor);
  compressor.connect(analyser);

  return getAudioData.bind(null, analyser);
}

const initialize = () => {
  navigator
    .mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then((mediaStream) => {
      getAudioData = bindGetAudioData(mediaStream);
    })
    .catch((err) => {
      console.log(err.message);
    });

  document.removeEventListener("click", initialize, false);
}

document.addEventListener("click", initialize, false);

//THEN SHADERS!
const DEFAULT_VS = `
attribute vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const canvas = document.getElementById('shader');
const gl = canvas.getContext('webgl');

gl.clearColor(0, 0, 0, 0);

const vertices = new Float32Array([
  -1, 1, 1, 1, 1, -1,
  -1, 1, 1, -1, -1, -1,
]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const vertexShader = makeShader(gl.VERTEX_SHADER, DEFAULT_VS);
const DEFAULT_FS = myCodeMirror.getValue();
loadFragmentShader(DEFAULT_FS);

function loadFragmentShader(shader) {
  const shaderCode = 'precision highp float;\n' + shader;
  const fragmentShader = makeShader(gl.FRAGMENT_SHADER, shaderCode);
  const program = makeProgram(vertexShader, fragmentShader);
  gl.useProgram(program);

  program.position = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(program.position);
  gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);
  gl.viewport(0, 0, canvas.width, canvas.height);

  const state = {
    uFrame: {
      location: gl.getUniformLocation(program, 'u_frame'),
      value: 0,
    },
    uResolution: {
      location: gl.getUniformLocation(program, 'u_resolution'),
      value: [canvas.width, canvas.height],
    },
    uMusic: {
      location: gl.getUniformLocation(program, 'u_music'),
      value: loadMusic(),
    }
  }

  myReq = render(state);
}

function render(state) {
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.uniform1i(state.uFrame.location, state.uFrame.value);
  gl.uniform2fv(state.uResolution.location, state.uResolution.value);

  state.uMusic.value = loadMusic();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, state.uMusic.value);
  gl.uniform1i(state.uMusic.location, 0);

  gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);

  state.uFrame.value++;
  myReq = window.requestAnimationFrame(() => render(state));
}

function makeShader(type, string) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, string);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const compilationLog = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    console.warn(compilationLog, '\nin shader:\n', string);
  }

  return shader;
}

function makeProgram(...shaders) {
  const program = gl.createProgram();
  shaders.forEach(shader => {
    gl.attachShader(program, shader);
  });
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const linkLog = gl.getProgramInfoLog(this.program);
    console.warn(linkLog);
  }

  return program;
}

function loadMusic() {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  const level = 0;
  const internalFormat = gl.ALPHA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.ALPHA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([255]);
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                width, height, border, srcFormat, srcType,
                pixel);

  const image = getAudioData();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
    32, 32, border,
    srcFormat, srcType, image);

  gl.generateMipmap(gl.TEXTURE_2D);

  return texture;
}

function updateTime() {
  const dt = new Date(),
      hours = dt.getHours() > 9 ? dt.getHours() : '0' + dt.getHours(),
      minutes = dt.getMinutes() > 9 ? dt.getMinutes() : '0' + dt.getMinutes();

  time.innerText = hours + ':' + minutes;
};

updateTime();
setInterval(updateTime, 1000);