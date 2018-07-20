import getScaledImageData from '../../tools/getScaledImageData';

const reader = new FileReader();
const img = new Image();
const canvas = document.createElement('canvas');
const canvasContext = canvas.getContext('2d');

const sendImageFromFileInput = (socket, dispatch, inputElement) => {

  dispatch({
    type: 'SET_SERVER_BUSY',
    payload: true,
  });

  reader.onload = (ev) => {
    if (ev.target.readyState === FileReader.DONE) {
      img.onload = () => {
        canvas.width = img.naturalWidth / img.naturalHeight * CONFIG.NUM_LEDS;
        canvas.height = CONFIG.NUM_LEDS;

        canvasContext.drawImage(img, 0, 0, canvas.width, canvas.height);

        const pixels = getScaledImageData(canvas);

        // eslint-disable-next-line no-param-reassign
        inputElement.value = '';
        socket.send(JSON.stringify({
          setImage: pixels,
        }));

      };
      img.src = ev.target.result;
    }
  };

  reader.readAsDataURL(inputElement.files[0]);
};

export default sendImageFromFileInput;
