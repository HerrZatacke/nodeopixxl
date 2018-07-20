const isLoopingReducer = (isLooping = false, action) => {
  switch (action.type) {
    case 'SET_IS_LOOPING':
      return action.payload;
    default:
      return isLooping;
  }
};

export default isLoopingReducer;
