const measureText = (text, fontSpace) => {
  const body = document.querySelector('body');
  const measureDiv = document.createElement('div');
  measureDiv.style.fontSize = `${CONFIG.NUM_LEDS - fontSpace}px`;
  measureDiv.style.fontFamily = 'monospace';
  measureDiv.style.display = 'inline-block';
  measureDiv.style.visibility = 'hidden';
  measureDiv.style.whiteSpace = 'pre';

  measureDiv.innerText = text;
  body.appendChild(measureDiv);
  const dim = measureDiv.getBoundingClientRect();
  body.removeChild(measureDiv);
  measureDiv.innerText = '';
  return dim;
};

export default measureText;
