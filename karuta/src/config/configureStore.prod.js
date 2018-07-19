// redux
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './../store/rootReducer';
// middlewares
import thunk from 'redux-thunk';

// createStore's wrapper with all middlewares passed into it  

const configureStore = (preloadedState) => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk)
);

export default configureStore;
