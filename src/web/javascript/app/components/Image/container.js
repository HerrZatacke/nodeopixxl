import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  image: state.image,
  offset: state.offset,
  animationRunning: state.animationRunning,
});

const mapDispatchToProps = (/* dispatch */) => ({
});

export default connect(mapStateToProps, mapDispatchToProps);
