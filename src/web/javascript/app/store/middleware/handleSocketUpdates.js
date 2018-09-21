// import ReconnectingWebSocket from 'reconnecting-websocket';
import arrayToImageData from '../../tools/arrayToImageData';

const handleSocketUpdates = (dispatch) => {
  const socket = new WebSocket(`ws://${window.location.hostname}:3001/`);

  socket.addEventListener('close', () => {
    // https://github.com/pladaria/reconnecting-websocket/issues/60
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  });

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);

    if (message.fps) {
      dispatch({
        type: 'SET_FPS',
        payload: message.fps,
      });
    }

    if (message.hasConnection !== undefined) {
      dispatch({
        type: 'SET_HAS_CONNECTION',
        payload: message.hasConnection,
      });
    }

    if (message.offset !== undefined) {
      dispatch({
        type: 'SET_OFFSET',
        payload: message.offset,
      });
    }

    if (message.canAcceptNewImage !== undefined) {
      dispatch({
        type: 'SET_SERVER_BUSY',
        payload: !message.canAcceptNewImage,
      });
    }

    if (message.isRunning !== undefined) {
      dispatch({
        type: 'SET_ANIMATION_RUNNING',
        payload: message.isRunning,
      });
    }

    if (message.loop !== undefined) {
      dispatch({
        type: 'SET_IS_LOOPING',
        payload: message.loop,
      });
    }

    if (message.image && message.image.length) {
      dispatch({
        type: 'SET_IMAGE',
        payload: arrayToImageData(message.image),
      });
    }
  });
  return socket;
};

export default handleSocketUpdates;
