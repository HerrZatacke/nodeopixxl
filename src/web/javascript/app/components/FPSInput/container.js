import { connect } from 'react-redux';

const mapStateToProps = state => ({
  fps: state.fps,
  serverBusy: state.serverBusy,
});

const mapDispatchToProps = dispatch => ({
  sendFps: (fps) => {
    dispatch({
      type: 'SEND_FPS',
      payload: fps,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
