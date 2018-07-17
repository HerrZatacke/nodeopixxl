import { connect } from 'react-redux';

const mapStateToProps = state => ({
  image: state.image,
  offset: state.offset,
});

const mapDispatchToProps = (/* dispatch */) => ({
});

export default connect(mapStateToProps, mapDispatchToProps);
