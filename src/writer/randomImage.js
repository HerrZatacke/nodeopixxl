const randomImage = () => {
  const bigScale = (Math.floor(Math.random() * 3) + 1) * 80;
  const scaleR = Math.floor(Math.random() * 3) + bigScale;
  const scaleG = Math.floor(Math.random() * 3) + bigScale;
  const scaleB = Math.floor(Math.random() * 3) + bigScale;

  return (
    new Uint32Array(CONFIG.NUM_LEDS * 320 * 3)
      .map((n, index) => {
        // r
        if (index % 3 === 0) {
          // return 0;
          return (index % scaleR) % 255;
        }
        // g
        if ((index + 1) % 3 === 0) {
          // return 0;
          return (index % scaleG) % 255;
        }
        // b
        if ((index + 2) % 3 === 0) {
          // return 0;
          return (index % scaleB) % 255;
        }
        return 0;
      })
  );
};

module.exports = randomImage;
