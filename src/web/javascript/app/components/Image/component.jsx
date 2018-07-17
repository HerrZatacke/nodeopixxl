import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Image extends Component {

  componentDidMount() {
    this.canvasContext = null;
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  setContext(canvasElement) {
    console.log('setContext');
    if (!canvasElement) {
      return;
    }
    console.log('setContext', canvasElement);
    this.canvasContext = canvasElement.getContext('2d');
    this.updateCanvas();
  }

  updateCanvas() {
    console.log('updateCanvas');
    if (this.canvasContext && this.props.image.height === 160) {
      this.canvasContext.putImageData(this.props.image, 0, 0);
    }
  }

  render() {
    return (
      <div className="image-component">
        <div
          className={this.props.offset ? 'indicator' : null}
          style={{
            left: `${this.props.offset}px`,
          }}
        />
        <canvas
          width={this.props.image.width / this.props.image.height * 160}
          height="160"
          ref={elt => this.setContext(elt)}
        />
      </div>
    );
  }
}

Image.propTypes = {
  image: PropTypes.instanceOf(ImageData).isRequired,
  offset: PropTypes.number.isRequired,
};

Image.defaultProps = {
};

export default Image;
