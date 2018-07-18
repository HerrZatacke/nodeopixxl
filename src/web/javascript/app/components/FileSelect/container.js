import { connect } from 'react-redux';

const mapStateToProps = (/* state */) => ({
});

const mapDispatchToProps = dispatch => ({
  setImage: (file) => {
    dispatch({
      type: 'SET_RAW_IMAGE',
      payload: file,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
