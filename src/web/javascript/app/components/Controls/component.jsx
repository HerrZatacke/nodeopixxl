import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileSelect from '../FileSelect';

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
        <FileSelect />
        <button
          disabled={this.props.serverBusy || this.props.animationRunning}
          className="controls__button-start"
          onClick={() => this.props.start()}
        >
          Start
        </button>
        <button
          disabled={this.props.serverBusy}
          className="controls__button-stop"
          onClick={() => this.props.stop()}
        >
          Stop
        </button>
        <input
          disabled={this.props.serverBusy}
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
  serverBusy: PropTypes.bool.isRequired,
  animationRunning: PropTypes.bool.isRequired,
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  sendFps: PropTypes.func.isRequired,
};

Controls.defaultProps = {
};

export default Controls;
