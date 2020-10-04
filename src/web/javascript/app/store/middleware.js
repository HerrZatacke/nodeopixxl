import handleSocketUpdates from './middleware/handleSocketUpdates';
import sendImageFromFileInput from './middleware/sendImageFromFileInput';
import sendText from './middleware/sendText';
import flipImage from './middleware/flipImage';
import sendAction from './middleware/sendAction';

const middleware = (store) => {

  const socket = handleSocketUpdates(store.dispatch);

  return (next) => (action) => {

    // const state = store.getState();
    // console.log(state);

    switch (action.type) {
      case 'SEND_RAW_IMAGE':
        sendImageFromFileInput(socket, store.dispatch, action.payload);
        break;
      case 'SEND_TEXT':
        sendText(socket, store.dispatch, action.payload);
        break;
      case 'FLIP_IMAGE':
        flipImage(socket, store.dispatch, store.getState().image, action.payload);
        break;
      case 'SEND_START':
        sendAction(socket, 'start');
        break;
      case 'SEND_STOP':
        sendAction(socket, 'stop');
        break;
      case 'SEND_SETRANDOM':
        sendAction(socket, 'setrandom');
        break;
      case 'SEND_LOOP':
        sendAction(socket, 'loop', action.payload);
        break;
      case 'SEND_FPS':
        sendAction(socket, 'fps', action.payload);
        break;
      case 'SEND_START_DELAY':
        sendAction(socket, 'startdelay', action.payload);
        break;
      default:
        break;
    }

    return next(action);
  };
};

export default middleware;
