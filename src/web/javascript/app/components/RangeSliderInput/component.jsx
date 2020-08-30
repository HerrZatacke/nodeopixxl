import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'debounce';

class RangeSliderInput extends Component {

  constructor(props) {
    super(props);
    this.sendUpdate = debounce(this.sendUpdate, 250, false);
    this.state = {
      value: props.value,
      sync: true,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      value: state.sync === false ? state.value : props.value,
      sync: true,
    };
  }

  change(value) {
    this.setState({
      value,
      sync: false,
    }, this.sendUpdate);
  }

  sendUpdate() {
    this.props.update(this.state.value);
  }

  render() {
    return (
      <div className="range-slider-input">
        <input
          title={this.props.title}
          className="range-slider-input__input"
          disabled={this.props.serverBusy}
          type="range"
          value={this.state.value}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          onChange={(ev) => this.change(ev.target.value)}
        />
      </div>
    );
  }
}

RangeSliderInput.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  serverBusy: PropTypes.bool.isRequired,
  update: PropTypes.func.isRequired,
};

RangeSliderInput.defaultProps = {
};

export default RangeSliderInput;
