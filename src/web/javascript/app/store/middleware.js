import handleSocketUpdates from './handleSocketUpdates';

const middleware = (store) => {

  handleSocketUpdates(store.dispatch);

  return next => action => next(action);

  // return next => (action) => {
  //
  //   // const state = store.getState();
  //
  //   // console.log(state);
  //
  //   // if (action.type === 'SUBMITENTRY') {
  //   //   submitEntry(store, state, action);
  //   // }
  //
  //   return next(action);
  // };
};

export default middleware;
