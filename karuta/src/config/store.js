import { applyMiddleware, createStore } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './../store/reducers'


const configureStore = () => {
	return createStore(
		rootReducer,
		applyMiddleware(
			thunkMiddleware,
			loggerMiddleware
		)
	)
}

export { configureStore };