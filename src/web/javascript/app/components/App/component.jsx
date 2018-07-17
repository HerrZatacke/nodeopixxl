import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';

class App extends Component {

  componentDidMount() {
    console.log('da is die äpp');
  }

  render() {
    return (
      <Fragment>
        <h1>Äpp Äpp</h1>
        <pre>
          {JSON.stringify(this.props, null, 2)}
        </pre>
      </Fragment>
    );
  }
}

App.propTypes = {
};

App.defaultProps = {
};

export default App;
