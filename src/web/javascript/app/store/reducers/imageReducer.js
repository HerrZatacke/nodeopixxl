const blackPixel = new ImageData(new Uint8ClampedArray(4), 1);

const imageReducer = (image = blackPixel, action) => {
  switch (action.type) {
    case 'SET_IMAGE':
      return action.payload;
    default:
      return image;
  }
};

export default imageReducer;
