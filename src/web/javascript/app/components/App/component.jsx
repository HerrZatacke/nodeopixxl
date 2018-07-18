import React, { Fragment } from 'react';
import Image from '../Image';
import Controls from '../Controls';
import FPSInput from '../FPSInput';
import StatsTable from '../StatsTable';

// import PropTypes from 'prop-types';

const App = () => (
  <Fragment>
    <h1 className="app-headline">Lightdraw Command</h1>
    <Image />
    <StatsTable />
    <Controls />
    <FPSInput />
  </Fragment>
);

App.propTypes = {
};

App.defaultProps = {
};

export default App;
