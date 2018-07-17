const arrayToImageData = (array) => {
  const height = 160;
  const width = array.length / (height * 3); // NUM_LEDS * 3
  const imgData = new Uint8ClampedArray(width * height * 4);
  let t = 0;
  for (let i = 0; i < imgData.length; i += 4) {
    imgData[i] = array[t];
    imgData[i + 1] = array[t + 1];
    imgData[i + 2] = array[t + 2];
    imgData[i + 3] = 255;
    t += 3;
  }

  return new ImageData(imgData, width);
};

export default arrayToImageData;
