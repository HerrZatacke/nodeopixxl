import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Controls extends Component {

  constructor(props) {
    super(props);
    this.debounceTimeout = null;
    this.state = {
      fps: props.fps,
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      fps: props.fps,
    };
  }

  sendFps(fps) {
    this.setState({
      fps,
    });
    window.clearTimeout(this.debounceTimeout);
    this.debounceTimeout = window.setTimeout(() => {
      this.props.sendFps(fps);
    }, 15);
  }

  render() {
    return (
      <div className="controls">
        <button className="controls__button-start" onClick={() => this.props.start()}>Start</button>
        <button className="controls__button-stop" onClick={() => this.props.stop()}>Stop</button>
        <input
          type="range"
          value={this.state.fps}
          min="1"
          max="250"
          step="1"
          onChange={ev => this.sendFps(ev.target.value)}
        />
      </div>
    );
  }
}

Controls.propTypes = {
  fps: PropTypes.number.isRequired,
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  sendFps: PropTypes.func.isRequired,
};

Controls.defaultProps = {
};

export default Controls;
