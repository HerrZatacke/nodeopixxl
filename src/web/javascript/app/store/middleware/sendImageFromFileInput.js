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

        const targetHeight = Math.min(CONFIG.NUM_LEDS, img.naturalHeight);
        canvas.width = Math.min(img.naturalWidth, img.naturalWidth / img.naturalHeight * CONFIG.NUM_LEDS);
        canvas.height = CONFIG.NUM_LEDS;

        const yOffset = Math.floor((CONFIG.NUM_LEDS - targetHeight) / 2);

        canvasContext.drawImage(img, 0, yOffset, canvas.width, targetHeight);

        canvas.toBlob((blob) => {
          // eslint-disable-next-line no-param-reassign
          inputElement.value = '';
          socket.send(blob);
        }, 'image/png', 100);
      };

      img.src = ev.target.result;
    }
  };

  reader.readAsDataURL(inputElement.files[0]);
};

export default sendImageFromFileInput;
