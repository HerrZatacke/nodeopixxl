import { connect } from 'react-redux';

const mapStateToProps = state => ({
  serverBusy: state.serverBusy,
  animationRunning: state.animationRunning,
});

const mapDispatchToProps = dispatch => ({
  setImage: (file) => {
    dispatch({
      type: 'SEND_RAW_IMAGE',
      payload: file,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
