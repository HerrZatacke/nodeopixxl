import { connect } from 'react-redux';
import fps2speed from '../../tools/fps2speed';

const mapStateToProps = state => (
  fps2speed(state.fps, state.image.width, state.image.height)
);

const mapDispatchToProps = (/* dispatch */) => ({
});

export default connect(mapStateToProps, mapDispatchToProps);
