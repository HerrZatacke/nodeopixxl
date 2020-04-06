import { createStore, applyMiddleware, compose } from 'redux';
import submitFormReducers from './reducers';
import middleware from './middleware';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = [
  applyMiddleware(middleware),
];

const getStore = (config) => (
  createStore(submitFormReducers, config, composeEnhancers(...enhancers))
);


export default getStore;
