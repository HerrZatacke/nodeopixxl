import getScaledImageData from '../../tools/getScaledImageData';
import measureText from '../../tools/measureText';

const canvas = document.createElement('canvas');
const canvasContext = canvas.getContext('2d');
const fontSpace = CONFIG.NUM_LEDS / 4;

const sendText = (socket, dispatch, text) => {

  dispatch({
    type: 'SET_SERVER_BUSY',
    payload: true,
  });

  canvas.width = Math.ceil(measureText(text, fontSpace).width) + fontSpace;
  canvas.height = CONFIG.NUM_LEDS;

  // Must be set after chenging width / height
  canvasContext.font = `${CONFIG.NUM_LEDS - fontSpace}px monospace`;

  canvasContext.fillStyle = '#000000';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  canvasContext.fillStyle = canvasContext.createLinearGradient(0, 0, canvas.width, canvas.height);
  canvasContext.fillStyle.addColorStop(0.000, '#ff4444');
  canvasContext.fillStyle.addColorStop(0.166, '#ffff00');
  canvasContext.fillStyle.addColorStop(0.333, '#44ff44');
  canvasContext.fillStyle.addColorStop(0.500, '#00ffff');
  canvasContext.fillStyle.addColorStop(0.666, '#4444ff');
  canvasContext.fillStyle.addColorStop(0.833, '#ff00ff');
  canvasContext.fillStyle.addColorStop(1.000, '#ff4444');
  canvasContext.fillText(text, Math.ceil(fontSpace / 2), CONFIG.NUM_LEDS - fontSpace);

  const pixels = getScaledImageData(canvas);

  socket.send(JSON.stringify({
    setImage: pixels,
  }));

};

export default sendText;
