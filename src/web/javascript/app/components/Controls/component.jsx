import React from 'react';
import PropTypes from 'prop-types';
import FileSelect from '../FileSelect';
import FPSInput from '../FPSInput';

const Controls = props => (
  <div className="controls">
    <FileSelect />
    <button
      disabled={props.serverBusy || props.animationRunning}
      className="controls__button-start"
      onClick={() => props.start()}
    >
      Start
    </button>
    <button
      disabled={props.serverBusy}
      className="controls__button-stop"
      onClick={() => props.stop()}
    >
      Stop
    </button>
    <FPSInput />
  </div>
);

Controls.propTypes = {
  serverBusy: PropTypes.bool.isRequired,
  animationRunning: PropTypes.bool.isRequired,
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
};

Controls.defaultProps = {
};

export default Controls;
