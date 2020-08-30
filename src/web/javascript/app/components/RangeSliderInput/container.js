import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  serverBusy: state.serverBusy,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps);
