const getScaledImageData = (canvas) => {
  const canvasContext = canvas.getContext('2d');
  const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
  return [...imageData.data]
  // removes the alpha channel
    .filter((val, index) => (
      (index + 1) % 4 !== 0
    ));
};

export default getScaledImageData;
