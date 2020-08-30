const sendAction = (socket, actionName, actionValue) => {
  switch (actionName) {
    case 'start':
      socket.send(JSON.stringify({ start: true }));
      break;
    case 'startdelay':
      socket.send(JSON.stringify({ startdelay: actionValue }));
      break;
    case 'stop':
      socket.send(JSON.stringify({ stop: true }));
      break;
    case 'setrandom':
      socket.send(JSON.stringify({ setrandom: true }));
      break;
    case 'loop':
      socket.send(JSON.stringify({ loop: actionValue }));
      break;
    case 'fps':
      socket.send(JSON.stringify({ fps: actionValue }));
      break;
    default:
      break;
  }
};

export default sendAction;
