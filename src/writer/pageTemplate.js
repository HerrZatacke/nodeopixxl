/* eslint-disable */
function initBody(numLeds) {

  const leds = [...new Array(numLeds)].map((i, index) => (
    `<div class="led" id="led-${index}"><div></div></div>`
  ));

  document.querySelector('body').innerHTML = `
    <div class="leds">${leds.join('')}</div>
    <iframe id="pageIframe" src="http://localhost:3000/"></iframe>
    <style>
      body {
        background: black;
      }
      * {
        margin: 0;
        padding: 0;
      }
      
     .leds {
      display: flex;
     }
     .led {
      border: 1px solid #111;
      border-radius: 50%;
      flex: 1 1 100%;
      margin: 2px;
     }
     .led div {
       padding-bottom: 100%;
     }
     iframe {
      position: absolute;
      bottom: 0;
      left: calc(50vw - 275px);
      border: none;
      height: 680px;
      width: 550px;
     }
    </style>
  `;
}

let timeout = null;
let pageIframe = null;

function render() {
  try {
    pageIframe = pageIframe || document.getElementById('pageIframe');
    pageIframe.style.display = 'none';
  } catch (err) {
    console.log(err);
  }

  const args = [...arguments];

  const colors = [...new Array(args.length / 3)].map((i, index) => (
    `rgb(${args[index * 3]}, ${args[index * 3 + 1]}, ${args[index * 3 + 2]})`
  ));

  colors.forEach((color, index) => {
    document.getElementById(`led-${index}`).style.backgroundColor = color;
  });

  window.clearTimeout(timeout);
  timeout = window.setTimeout(() => {
    pageIframe.style.display = 'block';
  }, 3000)
}
