let startTime = null;

const animationRunningReducer = (animationRunning = false, action) => {
  switch (action.type) {
    case 'SET_ANIMATION_RUNNING':
      if (animationRunning !== action.payload) {
        if (action.payload === true) {
          startTime = (new Date()).getTime();
        } else {
          // eslint-disable-next-line no-console
          console.info((new Date()).getTime() - startTime);
        }
      }

      return action.payload;
    default:
      return animationRunning;
  }
};

export default animationRunningReducer;
