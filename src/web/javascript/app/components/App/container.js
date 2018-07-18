import { connect } from 'react-redux';

const mapStateToProps = state => ({
  fps: state.fps,
  offset: state.offset,
  width: state.image.width,
  height: state.image.height,
  serverBusy: state.serverBusy,
  animationRunning: state.animationRunning,
});

const mapDispatchToProps = (/* dispatch */) => ({
});

export default connect(mapStateToProps, mapDispatchToProps);
