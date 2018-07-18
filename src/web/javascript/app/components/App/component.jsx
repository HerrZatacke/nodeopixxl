import React, { Fragment } from 'react';
import Image from '../Image';
import FileSelect from '../FileSelect';
import Controls from '../Controls';
// import PropTypes from 'prop-types';

const App = props => (
  <Fragment>
    <pre>
      {JSON.stringify(props, null, 2)}
    </pre>
    <FileSelect />
    <Image />
    <Controls />
  </Fragment>
);

App.propTypes = {
};

App.defaultProps = {
};

export default App;
