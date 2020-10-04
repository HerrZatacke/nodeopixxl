import ndarray from 'ndarray';

const flipImage = (socket, dispatch, image, direction) => {

  dispatch({
    type: 'SET_SERVER_BUSY',
    payload: true,
  });

  const source = ndarray(image.data, [image.height, image.width, 4]);
  const result = ndarray(new Uint8ClampedArray(image.data), [image.height, image.width, 4]);

  for (let x = 0; x < image.width; x += 1) {
    for (let y = 0; y < image.width; y += 1) {
      for (let c = 0; c < 3; c += 1) {
        switch (direction) {
          case 'v':
            result.set(y, x, c, source.get(image.height - 1 - y, x, c));
            break;
          case 'h':
            result.set(y, x, c, source.get(y, image.width - 1 - x, c));
            break;
          default:
        }
      }
    }
  }

  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext('2d');

  context.putImageData(new ImageData(result.data, image.width, image.height), 0, 0);

  canvas.toBlob((blob) => {
    socket.send(blob);
  }, 'image/png', 100);
};

export default flipImage;
