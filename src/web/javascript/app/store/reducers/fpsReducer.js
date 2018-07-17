const fpsReducer = (fps = 1, action) => {
  switch (action.type) {
    case 'SET_FPS':
      return action.payload;
    default:
      return fps;
  }
};

export default fpsReducer;
