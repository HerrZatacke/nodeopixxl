import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  image: state.image,
  offset: state.offset,
  animationRunning: state.animationRunning,
});

const mapDispatchToProps = (dispatch) => ({
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
});

export default connect(mapStateToProps, mapDispatchToProps);
