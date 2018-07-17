const middleware = (store) => {

  const exampleSocket = new WebSocket(`ws://${window.location.hostname}:3001/`);

  exampleSocket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    store.dispatch({
      type: 'FPS',
      payload: message.fps,
    });
    console.log(message);
  };

  return next => (action) => {

    const state = store.getState();

    console.log(state);

    // if (action.type === 'SUBMITENTRY') {
    //   submitEntry(store, state, action);
    // }

    return next(action);
  };
};

export default middleware;
