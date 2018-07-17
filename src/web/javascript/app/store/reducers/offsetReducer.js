const offsetReducer = (offset = 0, action) => {
  switch (action.type) {
    case 'SET_OFFSET':
      return action.payload;
    default:
      return offset;
  }
};

export default offsetReducer;
