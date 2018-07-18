import { connect } from 'react-redux';

const mapStateToProps = state => ({
  fps: state.fps,
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
  setFps: (fps) => {
    dispatch({
      type: 'SEND_FPS',
      payload: fps,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
