import { combineReducers } from 'redux';
import animationRunning from './reducers/animationRunningReducer';
import fps from './reducers/fpsReducer';
import image from './reducers/imageReducer';
import isLooping from './reducers/isLoopingReducer';
import offset from './reducers/offsetReducer';
import serverBusy from './reducers/serverBusyReducer';

export default combineReducers({
  animationRunning,
  fps,
  image,
  isLooping,
  offset,
  serverBusy,
});
