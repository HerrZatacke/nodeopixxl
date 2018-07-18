const sendAction = (socket, actionName, actionValue) => {
  switch (actionName) {
    case 'start':
      socket.send(JSON.stringify({ start: true }));
      break;
    case 'stop':
      socket.send(JSON.stringify({ stop: true }));
      break;
    case 'fps':
      socket.send(JSON.stringify({ fps: actionValue }));
      break;
    default:
      break;
  }
};

export default sendAction;
