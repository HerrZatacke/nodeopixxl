import React from 'react';
import PropTypes from 'prop-types';

const StatsTable = props => (
  <table className="stats-table">
    <tbody>
      <tr>
        <th>single frame duration</th>
        <td>{props.timeout}</td>
      </tr>
      <tr>
        <th>real FPS</th>
        <td>{props.realFps}</td>
      </tr>
      <tr>
        <th>complete duration</th>
        <td>{props.duration}</td>
      </tr>
      <tr>
        <th>physical dimensions</th>
        <td>{`${props.imageWidth} ✕ ${props.imageHeight}`}</td>
      </tr>
      <tr>
        <th>pixel dimensions</th>
        <td>{`${props.width}px ✕ ${props.height}px`}</td>
      </tr>
      <tr>
        <th>m/s</th>
        <td>{props.mps}</td>
      </tr>
      <tr>
        <th>km/h</th>
        <td>{props.kph}</td>
      </tr>
    </tbody>
  </table>
);

StatsTable.propTypes = {
  realFps: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  timeout: PropTypes.string.isRequired,
  mps: PropTypes.string.isRequired,
  kph: PropTypes.string.isRequired,
  imageWidth: PropTypes.string.isRequired,
  imageHeight: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

StatsTable.defaultProps = {
};

export default StatsTable;
