import arrayToImageData from '../tools/arrayToImageData';

const middleware = (store) => {

  const exampleSocket = new WebSocket(`ws://${window.location.hostname}:3001/`);

  exampleSocket.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (message.fps) {
      store.dispatch({
        type: 'SET_FPS',
        payload: message.fps,
      });
    }

    if (message.offset !== undefined) {
      store.dispatch({
        type: 'SET_OFFSET',
        payload: message.offset,
      });
    }

    if (message.image && message.image.length) {
      store.dispatch({
        type: 'SET_IMAGE',
        payload: arrayToImageData(message.image),
      });
    }
  };

  return next => action => next(action);

  // return next => (action) => {
  //
  //   // const state = store.getState();
  //
  //   // console.log(state);
  //
  //   // if (action.type === 'SUBMITENTRY') {
  //   //   submitEntry(store, state, action);
  //   // }
  //
  //   return next(action);
  // };
};

export default middleware;
