import { combineReducers } from 'redux';
import animationRunning from './reducers/animationRunningReducer';
import fps from './reducers/fpsReducer';
import hasConnection from './reducers/hasConnectionReducer';
import image from './reducers/imageReducer';
import isLooping from './reducers/isLoopingReducer';
import offset from './reducers/offsetReducer';
import serverBusy from './reducers/serverBusyReducer';

export default combineReducers({
  animationRunning,
  fps,
  hasConnection,
  image,
  isLooping,
  offset,
  serverBusy,
});
