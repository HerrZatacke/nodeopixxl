import { combineReducers } from 'redux';
import animationRunning from './reducers/animationRunningReducer';
import fps from './reducers/fpsReducer';
import startDelay from './reducers/startDelayReducer';
import hasConnection from './reducers/hasConnectionReducer';
import image from './reducers/imageReducer';
import isLooping from './reducers/isLoopingReducer';
import offset from './reducers/offsetReducer';
import serverBusy from './reducers/serverBusyReducer';

export default combineReducers({
  animationRunning,
  fps,
  startDelay,
  hasConnection,
  image,
  isLooping,
  offset,
  serverBusy,
});
