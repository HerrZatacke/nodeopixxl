import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  serverBusy: state.serverBusy,
  animationRunning: state.animationRunning,
  isLooping: state.isLooping,
  fps: state.fps,
  startDelay: state.startDelay,
});

const mapDispatchToProps = (dispatch) => ({
  sendStart: () => {
    dispatch({
      type: 'SEND_START',
    });
  },
  sendStop: () => {
    dispatch({
      type: 'SEND_STOP',
    });
  },
  sendStartDelay: (value) => {
    dispatch({
      type: 'SEND_START_DELAY',
      payload: value,
    });
  },
  sendLoop: (value) => {
    dispatch({
      type: 'SEND_LOOP',
      payload: value,
    });
  },
  sendRandom: () => {
    dispatch({
      type: 'SEND_SETRANDOM',
    });
  },
  sendText: () => {
    dispatch({
      type: 'SEND_TEXT',
      // eslint-disable-next-line no-alert
      payload: window.prompt('Text?'),
    });
  },
  sendColor: (color) => {
    dispatch({
      type: 'SEND_COLOR',
      payload: color,
    });
  },
  sendFps: (fps) => {
    dispatch({
      type: 'SEND_FPS',
      payload: fps,
    });
  },
  flipImage: (direction) => {
    dispatch({
      type: 'FLIP_IMAGE',
      payload: direction,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
