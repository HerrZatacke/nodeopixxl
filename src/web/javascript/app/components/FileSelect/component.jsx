import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FileSelect extends Component {

  fileChange(inputElement) {
    if (!inputElement.files[0]) {
      return;
    }
    this.props.setImage(inputElement);
  }

  render() {
    return (
      <label
        data-disabled={this.props.serverBusy || this.props.animationRunning}
        htmlFor="input-file-select"
        className="file-select__button"
      >
        <input
          type="file"
          disabled={this.props.serverBusy || this.props.animationRunning}
          className="file-select__input"
          onChange={ev => this.fileChange(ev.target)}
          id="input-file-select"
        />
        Select File
      </label>
    );
  }
}

FileSelect.propTypes = {
  serverBusy: PropTypes.bool.isRequired,
  animationRunning: PropTypes.bool.isRequired,
  setImage: PropTypes.func.isRequired,
};

FileSelect.defaultProps = {
};

export default FileSelect;
