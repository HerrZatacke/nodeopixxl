import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FileSelect extends Component {

  fileChange(inputElement) {
    if (!inputElement.files[0]) {
      return;
    }
    this.props.setImage(inputElement.files[0]);
  }

  render() {
    return (
      <div className="file-select">
        <input
          type="file"
          className="file-select__input"
          onChange={ev => this.fileChange(ev.target)}
          id="input-file-select"
        />
        <label htmlFor="input-file-select" className="file-select__button">
          Select File
        </label>
      </div>
    );
  }
}

FileSelect.propTypes = {
  setImage: PropTypes.func.isRequired,
};

FileSelect.defaultProps = {
};

export default FileSelect;