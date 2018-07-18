import { combineReducers } from 'redux';
import animationRunning from './reducers/animationRunningReducer';
import fps from './reducers/fpsReducer';
import image from './reducers/imageReducer';
import offset from './reducers/offsetReducer';
import serverBusy from './reducers/serverBusyReducer';

export default combineReducers({
  animationRunning,
  fps,
  image,
  offset,
  serverBusy,
});
