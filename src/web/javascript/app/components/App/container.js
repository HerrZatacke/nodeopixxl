import { connect } from 'react-redux';
import fps2speed from '../../tools/fps2speed';

const mapStateToProps = state => ({
  fps: state.fps,
  offset: state.offset,
  width: state.image.width,
  height: state.image.height,
  serverBusy: state.serverBusy,
  animationRunning: state.animationRunning,
  speed: fps2speed(state.fps, state.image.width, state.image.height),
});

const mapDispatchToProps = (/* dispatch */) => ({
});

export default connect(mapStateToProps, mapDispatchToProps);
