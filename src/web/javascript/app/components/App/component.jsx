import React from 'react';
import Image from '../Image';
import Controls from '../Controls';
import StatsTable from '../StatsTable';

const App = () => (
  <>
    <h1 className="app-headline">Lightdraw Command</h1>
    <Image />
    <StatsTable />
    <Controls />
  </>
);

App.propTypes = {
};

App.defaultProps = {
};

export default App;
