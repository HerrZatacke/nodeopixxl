import handleSocketUpdates from './handleSocketUpdates';

const middleware = (store) => {

  handleSocketUpdates(store.dispatch);

  return next => (action) => {

    // const state = store.getState();
    // console.log(state);

    switch (action.type) {
      case 'SET_RAW_IMAGE':
        console.log(action.payload);
        break;
      default:
        break;
    }

    return next(action);
  };
};

export default middleware;
