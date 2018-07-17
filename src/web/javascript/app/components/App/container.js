import { connect } from 'react-redux';

const mapStateToProps = state => ({
  fps: state.fps,
  offset: state.offset,
  width: state.image.width,
  height: state.image.height,
});

const mapDispatchToProps = (/* dispatch */) => ({
});

export default connect(mapStateToProps, mapDispatchToProps);
