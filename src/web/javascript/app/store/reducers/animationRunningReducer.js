const animationRunningReducer = (animationRunning = false, action) => {
  switch (action.type) {
    case 'SET_ANIMATION_RUNNING':
      return action.payload;
    default:
      return animationRunning;
  }
};

export default animationRunningReducer;
