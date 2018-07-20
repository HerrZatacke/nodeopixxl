import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FPSInput extends Component {

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
      <div className="fpsinput">
        <input
          title={`${this.state.fps} FPS`}
          className="fpsinput__input"
          disabled={this.props.serverBusy}
          type="range"
          value={this.state.fps}
          min="1"
          max="300"
          step="1"
          onChange={ev => this.sendFps(ev.target.value)}
        />
      </div>
    );
  }
}

FPSInput.propTypes = {
  fps: PropTypes.number.isRequired,
  serverBusy: PropTypes.bool.isRequired,
  sendFps: PropTypes.func.isRequired,
};

FPSInput.defaultProps = {
};

export default FPSInput;
