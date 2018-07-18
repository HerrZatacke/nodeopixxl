import React, { Fragment } from 'react';
import Image from '../Image';
import Controls from '../Controls';
// import PropTypes from 'prop-types';

const App = props => (
  <Fragment>
    <pre>
      {JSON.stringify(props, null, 2)}
    </pre>
    <Image />
    <Controls />
  </Fragment>
);

App.propTypes = {
};

App.defaultProps = {
};

export default App;
