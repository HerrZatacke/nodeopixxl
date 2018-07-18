import { connect } from 'react-redux';

const mapStateToProps = (/* state */) => ({
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
