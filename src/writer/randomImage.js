const randomImage = (width, height) => {
  const bigScale = (Math.floor(Math.random() * 3) + 1) * (width / 4);

  const scales = [
    0.5 + bigScale,
    -0.5 + bigScale,
    1 + bigScale,
    -1 + bigScale,
    1.5 + bigScale,
    -1.5 + bigScale,
    2 + bigScale,
    -2 + bigScale,
    2.5 + bigScale,
    -2.5 + bigScale,
    0.1 + bigScale,
    -0.1 + bigScale,
  ];

  scales.sort(() => (
    Math.random() > 0.5 ? -1 : 1
  ));

  const scaleR = scales.pop();
  const scaleG = scales.pop();
  const scaleB = scales.pop();

  return (
    new Uint32Array(height * width * 3)
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
