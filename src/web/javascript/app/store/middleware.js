import handleSocketUpdates from './middleware/handleSocketUpdates';
import sendImageFromFileInput from './middleware/sendImageFromFileInput';
import sendAction from './middleware/sendAction';

const middleware = (store) => {

  const socket = handleSocketUpdates(store.dispatch);

  return next => (action) => {

    // const state = store.getState();
    // console.log(state);

    switch (action.type) {
      case 'SEND_RAW_IMAGE':
        sendImageFromFileInput(socket, action.payload, store.dispatch);
        break;
      case 'SEND_START':
        sendAction(socket, 'start');
        break;
      case 'SEND_STOP':
        sendAction(socket, 'stop');
        break;
      case 'SEND_FPS':
        sendAction(socket, 'fps', action.payload);
        break;
      default:
        break;
    }

    return next(action);
  };
};

export default middleware;
