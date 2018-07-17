import React, { Fragment } from 'react';
import Image from '../Image';
// import PropTypes from 'prop-types';

const App = props => (
  <Fragment>
    <h1>Äpp Äpp</h1>
    <pre>
      {JSON.stringify(props, null, 2)}
    </pre>
    <Image />
  </Fragment>
);

App.propTypes = {
};

App.defaultProps = {
};

export default App;
