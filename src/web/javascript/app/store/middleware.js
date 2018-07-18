import handleSocketUpdates from './middleware/handleSocketUpdates';
import sendImageFromFileInput from './middleware/sendImageFromFileInput';

const middleware = (store) => {

  const socket = handleSocketUpdates(store.dispatch);

  return next => (action) => {

    // const state = store.getState();
    // console.log(state);

    switch (action.type) {
      case 'SEND_RAW_IMAGE':
        sendImageFromFileInput(socket, action.payload);
        break;
      default:
        break;
    }

    return next(action);
  };
};

export default middleware;
