import { connect } from 'react-redux';

const mapStateToProps = state => ({
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
  setRandom: () => {
    dispatch({
      type: 'SEND_SETRANDOM',
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
