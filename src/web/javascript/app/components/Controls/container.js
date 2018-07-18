import { connect } from 'react-redux';

const mapStateToProps = state => ({
  fps: state.fps,
  serverBusy: state.serverBusy,
  animationRunning: state.animationRunning,
});

const mapDispatchToProps = dispatch => ({
  start: () => {
    dispatch({
      type: 'SEND_START',
    });
  },
  stop: () => {
    dispatch({
      type: 'SEND_STOP',
    });
  },
  sendFps: (fps) => {
    dispatch({
      type: 'SEND_FPS',
      payload: fps,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
