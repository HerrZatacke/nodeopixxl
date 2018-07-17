const fpsReducer = (fps = 1, action) => {
  switch (action.type) {
    case 'FPS':
      return action.payload;
    default:
      return fps;
  }
};

export default fpsReducer;
