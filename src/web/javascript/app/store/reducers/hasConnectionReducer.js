const hasConnectionReducer = (hasConnection = false, action) => {
  switch (action.type) {
    case 'SET_HAS_CONNECTION':
      return action.payload;
    default:
      return hasConnection;
  }
};

export default hasConnectionReducer;
