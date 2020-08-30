import React from 'react';
import PropTypes from 'prop-types';
import FileSelect from '../FileSelect';
import RangeSliderInput from '../RangeSliderInput';

const Controls = (props) => (
  <div className="controls">
    <FileSelect />
    <button
      type="button"
      disabled={props.serverBusy || props.animationRunning}
      className="controls__button controls__button-set-text"
      onClick={() => props.sendText()}
    >
      Text
    </button>
    <button
      type="button"
      disabled={props.serverBusy || props.animationRunning}
      className="controls__button controls__button-set-random"
      onClick={() => props.sendRandom()}
    >
      Random
    </button>
    <button
      type="button"
      disabled={props.serverBusy}
      className="controls__button controls__button-stop"
      onClick={() => props.sendStop()}
    >
      Stop
    </button>
    <RangeSliderInput
      title={`${(props.startDelay / 1000).toFixed(1)}s start delay`}
      min={0}
      max={7500}
      step={100}
      value={props.startDelay}
      update={props.sendStartDelay}
    />
    <button
      type="button"
      disabled={props.serverBusy || props.animationRunning}
      className="controls__button controls__button-start"
      onClick={() => props.sendStart()}
    >
      Start
    </button>
    <RangeSliderInput
      title={`${props.fps} FPS`}
      value={props.fps}
      min={1}
      max={300}
      step={1}
      update={props.sendFps}
    />
    <label htmlFor="check-loop" className="controls__checkbox">
      <input
        type="checkbox"
        id="check-loop"
        className="controls__checkbox__input"
        checked={props.isLooping}
        onChange={() => props.sendLoop(!props.isLooping)}
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
  fps: PropTypes.number.isRequired,
  startDelay: PropTypes.number.isRequired,
  isLooping: PropTypes.bool.isRequired,
  sendStart: PropTypes.func.isRequired,
  sendStartDelay: PropTypes.func.isRequired,
  sendStop: PropTypes.func.isRequired,
  sendLoop: PropTypes.func.isRequired,
  sendText: PropTypes.func.isRequired,
  sendFps: PropTypes.func.isRequired,
  sendRandom: PropTypes.func.isRequired,
};

Controls.defaultProps = {
};

export default Controls;
