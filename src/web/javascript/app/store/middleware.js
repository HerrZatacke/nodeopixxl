import handleSocketUpdates from './middleware/handleSocketUpdates';
import sendImageFromFileInput from './middleware/sendImageFromFileInput';
import sendText from './middleware/sendText';
import sendAction from './middleware/sendAction';

const middleware = (store) => {

  const socket = handleSocketUpdates(store.dispatch);
  let delayStartTimeout = null;

  return next => (action) => {

    // const state = store.getState();
    // console.log(state);

    switch (action.type) {
      case 'SEND_RAW_IMAGE':
        sendImageFromFileInput(socket, store.dispatch, action.payload);
        break;
      case 'SEND_TEXT':
        sendText(socket, store.dispatch, action.payload);
        break;
      case 'SEND_START':
        sendAction(socket, 'start');
        break;
      case 'SEND_START_DELAYED':
        store.dispatch({
          type: 'SET_ANIMATION_RUNNING',
          payload: true,
        });
        window.clearTimeout(delayStartTimeout);
        delayStartTimeout = window.setTimeout(() => {
          store.dispatch({
            type: 'SEND_START',
          });
        }, 2000);
        break;
      case 'SEND_STOP':
        window.clearTimeout(delayStartTimeout);
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
      default:
        break;
    }

    return next(action);
  };
};

export default middleware;
