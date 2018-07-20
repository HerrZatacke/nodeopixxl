import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Image extends Component {

  componentDidMount() {
    this.canvasContext = null;
  }

  setContext(canvasElement) {
    if (!canvasElement) {
      return;
    }
    this.canvasContext = canvasElement.getContext('2d');
    this.updateCanvas();
  }

  updateCanvas() {
    if (this.canvasContext && this.props.image.height === CONFIG.NUM_LEDS) {
      this.canvasContext.putImageData(this.props.image, 0, 0);
    }
  }

  leftPos() {
    try {
      const containerWidth = Math.min(window.innerWidth, 500);
      if (containerWidth >= this.props.image.width) {
        return 0;
      }
      const hiddenWidth = this.props.image.width - containerWidth;
      return -hiddenWidth * (this.props.offset / this.props.image.width);
    } catch (err) {
      return 30;
    }
  }

  render() {
    return (
      <div className="image-component">
        <div
          className="image-component__wrapper"
          style={{
            left: `${this.leftPos()}px`,
          }}
        >
          <div
            className={`image-component__indicator ${this.props.animationRunning ? '' : 'image-component__indicator--hidden'}`}
            style={{
              left: `${this.props.offset - 1}px`,
            }}
          />
          <canvas
            className="image-component__canvas"
            width={this.props.image.width / this.props.image.height * CONFIG.NUM_LEDS}
            height={CONFIG.NUM_LEDS}
            ref={elt => this.setContext(elt)}
          />
        </div>
      </div>
    );
  }
}

Image.propTypes = {
  image: PropTypes.instanceOf(ImageData).isRequired,
  offset: PropTypes.number.isRequired,
  animationRunning: PropTypes.bool.isRequired,
};

export default Image;
