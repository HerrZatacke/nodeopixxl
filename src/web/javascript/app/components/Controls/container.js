import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  serverBusy: state.serverBusy,
  animationRunning: state.animationRunning,
  isLooping: state.isLooping,
});

const mapDispatchToProps = (dispatch) => ({
  start: () => {
    dispatch({
      type: 'SEND_START',
    });
  },
  startDelayed: () => {
    dispatch({
      type: 'SEND_START_DELAYED',
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
  setText: () => {
    dispatch({
      type: 'SEND_TEXT',
      // eslint-disable-next-line no-alert
      payload: window.prompt('Text?'),
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
