/* eslint-disable */
import '../scss/old.scss';

const fileInput = document.querySelector('input[type=file]');
const canvas = document.querySelector('canvas');
const useImageButton = document.querySelector('#use-image');
const startButton = document.querySelector('#start-image');
const stopButton = document.querySelector('#stop-image');
const setFPSButton = document.querySelector('#set-fps');
const fpsInput = document.querySelector('#fps');
const img = new Image();
const ctx = canvas.getContext('2d');

const out = (res) => {
  res.text()
    .then(body => console.log(body))
    .catch(err => {
      console.error(err)
    });
};

// const getScaledImageBlob = () => {
//   return new Promise((resolve, reject) => {
//     try {
//       // const filename = fileInput.files[0].name.toLowerCase().replace(/[\W]*/gi, '');
//       if (canvas.toBlob) {
//         canvas.toBlob(blob => resolve(blob), 'image/png');
//       } else {
//         resolve(canvas.msToBlob());
//       }
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

const getScaledImageData = () => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  return [...imageData.data]
    // .map((value, index) => (
    //   String.fromCharCode(value)
    // ))
    .filter((val, index) => (
      (index + 1) % 4 !== 0
    ));
};

fileInput.addEventListener('change', (ev) => {
  ev.preventDefault();
  useImageButton.disabled = true;
  startButton.disabled = true;
  stopButton.disabled = true;

  ctx.fillRect(0,0, canvas.width, canvas.height);

  const reader = new FileReader();

  reader.onload = (ev) => {
    if(ev.target.readyState === FileReader.DONE) {
      img.onload = () => {
        canvas.width = img.naturalWidth / img.naturalHeight * 160;
        canvas.height = 160;

        canvas.style.width = `${canvas.width}px`;
        canvas.style.height = `${canvas.height}px`;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        useImageButton.disabled = false;
        startButton.disabled = false;
        stopButton.disabled = false;
      };
      img.src = ev.target.result;
    }
  };

  if (fileInput.files && fileInput.files[0]) {
    reader.readAsDataURL(fileInput.files[0]);
  }
});

useImageButton.addEventListener('click', () => {
  const pixels = getScaledImageData();
  console.log(JSON.stringify(pixels).length);
  console.log(pixels.length);
  exampleSocket.send(JSON.stringify({
    setImage: pixels,
  }));
});

startButton.addEventListener('click', () => {
  exampleSocket.send(JSON.stringify({
    start: true,
  }));
});

stopButton.addEventListener('click', () => {
  exampleSocket.send(JSON.stringify({
    stop: true,
  }));
});

setFPSButton.addEventListener('click', () => {
  exampleSocket.send(JSON.stringify({
    fps: fpsInput.value,
  }));
});

const exampleSocket = new WebSocket(`ws://${window.location.hostname}:3001/`);

exampleSocket.onmessage = (event) => {
  console.log(event.data);
};
