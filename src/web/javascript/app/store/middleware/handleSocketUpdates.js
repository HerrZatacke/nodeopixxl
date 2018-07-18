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

    if (message.offset !== undefined) {
      dispatch({
        type: 'SET_OFFSET',
        payload: message.offset,
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
