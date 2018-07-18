/* eslint-disable */
import '../scss/old.scss';

const startButton = document.querySelector('#start-image');
const stopButton = document.querySelector('#stop-image');
const setFPSButton = document.querySelector('#set-fps');
const fpsInput = document.querySelector('#fps');
const exampleSocket = new WebSocket(`ws://${window.location.hostname}:3001/`);

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
