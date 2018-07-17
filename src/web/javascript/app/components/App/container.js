import { connect } from 'react-redux';

const mapStateToProps = state => ({
  fps: state.fps,
});

const mapDispatchToProps = (/* dispatch */) => ({
});

export default connect(mapStateToProps, mapDispatchToProps);
