import { connect } from 'react-redux';

const mapStateToProps = state => ({
  serverBusy: state.serverBusy,
  animationRunning: state.animationRunning,
  isLooping: state.isLooping,
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
  loop: (value) => {
    dispatch({
      type: 'SEND_LOOP',
      payload: value,
    });
  },
  setRandom: () => {
    dispatch({
      type: 'SEND_SETRANDOM',
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
