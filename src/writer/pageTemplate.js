/* eslint-disable */

let timeout = null;
let pageContainer = null;
let button = null;

function initBody(numLeds) {

  const leds = [...new Array(numLeds)].map((i, index) => (
    `<div class="led" id="led-${index}"><div></div></div>`
  ));

  document.querySelector('body').innerHTML = `
    <div class="leds">${leds.join('')}</div>
    <div id="pageContainer">
      <iframe src="http://localhost:3000/"></iframe>
      <button>X</button>
    </div>
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
      border-radius: 5px;
      flex: 1 1 100%;
      margin: 1px;
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
     button {
       position: absolute;
       bottom: 0;
       left: calc(50vw - 320px);
       border-radius: 5px;
       background: black;
       border: 2px solid currentColor;
       color: white;
       width: 40px;
       height: 40px;
     }
     button:hover {
      color: #666;
      cursor: pointer;
     }
    </style>
  `;

  button = document.querySelector('button');
  pageContainer = document.getElementById('pageContainer');

  button.addEventListener('click', () => {
    pageContainer.parentElement.removeChild(pageContainer);
  })
}


function render() {
  const args = [...arguments];

  if (pageContainer) {
    pageContainer.style.display = 'none';
  }

  const colors = [...new Array(args.length / 3)].map((i, index) => (
    `rgb(${args[index * 3]}, ${args[index * 3 + 1]}, ${args[index * 3 + 2]})`
  ));

  colors.forEach((color, index) => {
    document.getElementById(`led-${index}`).style.backgroundColor = color;
  });

  window.clearTimeout(timeout);
  if (pageContainer) {
    timeout = window.setTimeout(() => {
      pageContainer.style.display = 'block';
    }, 3000);
  }
}
