const serverBusyReducer = (serverBusy = false, action) => {
  switch (action.type) {
    case 'SET_SERVER_BUSY':
      return action.payload;
    default:
      return serverBusy;
  }
};

export default serverBusyReducer;
