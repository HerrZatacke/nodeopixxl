const startDelayReducer = (startDelay = 0, action) => {
  switch (action.type) {
    case 'SET_START_DELAY':
      return action.payload;
    default:
      return startDelay;
  }
};

export default startDelayReducer;
