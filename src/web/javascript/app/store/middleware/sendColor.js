
const canvas = document.createElement('canvas');
const canvasContext = canvas.getContext('2d');

const sendColor = (socket, dispatch, color) => {

  dispatch({
    type: 'SET_SERVER_BUSY',
    payload: true,
  });

  canvas.width = CONFIG.NUM_LEDS;
  canvas.height = CONFIG.NUM_LEDS;

  canvasContext.fillStyle = color;
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  canvas.toBlob((blob) => {
    socket.send(blob);
  }, 'image/png', 100);
};

export default sendColor;
