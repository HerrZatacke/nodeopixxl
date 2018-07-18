const reader = new FileReader();
const img = new Image();
const canvas = document.createElement('canvas');
const canvasContext = canvas.getContext('2d');

const getScaledImageData = () => {
  const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
  return [...imageData.data]
    // removes the alpha channel
    .filter((val, index) => (
      (index + 1) % 4 !== 0
    ));
};

const sendImageFromFileInput = (socket, inputFile) => {

  reader.onload = (ev) => {
    if (ev.target.readyState === FileReader.DONE) {
      img.onload = () => {
        canvas.width = img.naturalWidth / img.naturalHeight * 160;
        canvas.height = 160;

        canvasContext.drawImage(img, 0, 0, canvas.width, canvas.height);

        const pixels = getScaledImageData();

        socket.send(JSON.stringify({
          setImage: pixels,
        }));

      };
      img.src = ev.target.result;
    }
  };

  reader.readAsDataURL(inputFile);
};

export default sendImageFromFileInput;
