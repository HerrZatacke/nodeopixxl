import { combineReducers } from 'redux';
import fps from './reducers/fpsReducer';
import image from './reducers/imageReducer';
import offset from './reducers/offsetReducer';

export default combineReducers({
  fps,
  image,
  offset,
});
