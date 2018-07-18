import { connect } from 'react-redux';
import fps2speed from '../../tools/fps2speed';

const mapStateToProps = (state) => {
  const frameStats = fps2speed(state.fps, state.image.width, state.image.height);
  return Object.assign({
    width: state.image.width,
    height: state.image.height,
  }, frameStats);
};

const mapDispatchToProps = (/* dispatch */) => ({
});

export default connect(mapStateToProps, mapDispatchToProps);
