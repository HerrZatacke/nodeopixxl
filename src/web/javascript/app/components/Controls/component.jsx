import React from 'react';
import PropTypes from 'prop-types';
import FileSelect from '../FileSelect';

const Controls = props => (
  <div className="controls">
    <FileSelect />
    <button
      disabled={props.serverBusy || props.animationRunning}
      className="controls__button controls__button-set-random"
      onClick={() => props.setRandom()}
    >
      Random
    </button>
    <button
      disabled={props.serverBusy || props.animationRunning}
      className="controls__button controls__button-start"
      onClick={() => props.start()}
    >
      Start
    </button>
    <button
      disabled={props.serverBusy}
      className="controls__button controls__button-stop"
      onClick={() => props.stop()}
    >
      Stop
    </button>
  </div>
);

Controls.propTypes = {
  serverBusy: PropTypes.bool.isRequired,
  animationRunning: PropTypes.bool.isRequired,
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  setRandom: PropTypes.func.isRequired,
};

Controls.defaultProps = {
};

export default Controls;
