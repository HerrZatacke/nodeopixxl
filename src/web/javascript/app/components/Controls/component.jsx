import React from 'react';
import PropTypes from 'prop-types';
import FileSelect from '../FileSelect';
import FPSInput from '../FPSInput';

const Controls = (props) => (
  <div className="controls">
    <FileSelect />
    <button
      type="button"
      disabled={props.serverBusy || props.animationRunning}
      className="controls__button controls__button-set-text"
      onClick={() => props.setText()}
    >
      Text
    </button>
    <button
      type="button"
      disabled={props.serverBusy || props.animationRunning}
      className="controls__button controls__button-set-random"
      onClick={() => props.setRandom()}
    >
      Random
    </button>
    <button
      type="button"
      disabled={props.serverBusy}
      className="controls__button controls__button-stop"
      onClick={() => props.stop()}
    >
      Stop
    </button>
    <button
      type="button"
      disabled={props.serverBusy || props.animationRunning}
      className="controls__button controls__button-start"
      onClick={() => props.start()}
    >
      Start
    </button>
    <button
      type="button"
      disabled={props.serverBusy || props.animationRunning}
      className="controls__button controls__button-start"
      onClick={() => props.startDelayed()}
    >
      Start Delayed
    </button>
    <FPSInput />
    <label htmlFor="check-loop" className="controls__checkbox">
      <input
        type="checkbox"
        id="check-loop"
        className="controls__checkbox__input"
        checked={props.isLooping}
        onClick={() => props.loop(!props.isLooping)}
      />
      <span className="controls__checkbox__text">
        Loop
      </span>
    </label>
  </div>
);

Controls.propTypes = {
  serverBusy: PropTypes.bool.isRequired,
  animationRunning: PropTypes.bool.isRequired,
  isLooping: PropTypes.bool.isRequired,
  start: PropTypes.func.isRequired,
  startDelayed: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  loop: PropTypes.func.isRequired,
  setText: PropTypes.func.isRequired,
  setRandom: PropTypes.func.isRequired,
};

Controls.defaultProps = {
};

export default Controls;
