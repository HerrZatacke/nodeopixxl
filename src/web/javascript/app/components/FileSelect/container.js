import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  serverBusy: state.serverBusy,
  animationRunning: state.animationRunning,
});

const mapDispatchToProps = (dispatch) => ({
  setImage: (inputElement) => {
    dispatch({
      type: 'SEND_RAW_IMAGE',
      payload: inputElement,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
