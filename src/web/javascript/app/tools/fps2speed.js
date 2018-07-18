const pixelSize = 6.7; // mm
const pixelsPerMeter = 1000 / pixelSize;
const precision = 2;

const fps2speed = (fps, width, height) => {
  const realFps = 1000 / Math.floor(1000 / fps);
  const metersPerSecond = realFps / pixelsPerMeter;
  const kmPerHour = metersPerSecond * 3.6;
  const imageWidth = width / pixelsPerMeter;
  const imageHeight = height / pixelsPerMeter;
  const duration = imageWidth / metersPerSecond;
  const timeout = Math.floor(1000 / realFps);

  return {
    realFps: `${realFps.toFixed(precision)} fps`,
    base: `${pixelsPerMeter.toFixed(precision)} px/m`,
    pixelSize: `${pixelSize.toFixed(precision)} mm`,
    imageWidth: `${imageWidth.toFixed(precision)} m`,
    imageHeight: `${imageHeight.toFixed(precision)} m`,
    duration: `${duration.toFixed(precision)} s`,
    timeout: `${timeout} ms`,
    mps: `${metersPerSecond.toFixed(precision)} m/s`,
    kph: `${kmPerHour.toFixed(precision)}' km/h`,
  };

};

export default fps2speed;
