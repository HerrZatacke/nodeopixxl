import React from 'react';
import PropTypes from 'prop-types';

const Controls = props => (
  <div className="controls">
    <button className="controls__button-start" onClick={() => props.start()}>Start</button>
    <button className="controls__button-stop" onClick={() => props.stop()}>Stop</button>
    <input type="range" value={props.fps} onChange={ev => props.setFps(ev.target.value)} />
  </div>
);

Controls.propTypes = {
  fps: PropTypes.number.isRequired,
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  setFps: PropTypes.func.isRequired,
};

Controls.defaultProps = {
};

export default Controls;
