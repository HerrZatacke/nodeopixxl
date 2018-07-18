import React, { Fragment } from 'react';
import Image from '../Image';
import FileSelect from '../FileSelect';
// import PropTypes from 'prop-types';

const App = props => (
  <Fragment>
    <h1>Äpp Äpp</h1>
    <pre>
      {JSON.stringify(props, null, 2)}
    </pre>
    <FileSelect />
    <Image />
  </Fragment>
);

App.propTypes = {
};

App.defaultProps = {
};

export default App;
