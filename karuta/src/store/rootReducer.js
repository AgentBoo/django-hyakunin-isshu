// redux
import { combineReducers } from 'redux';
// slice reducers 
import { isFetching, flashMessage, collections, poemIndex } from './reducers';

/* initial state shape 
   state = {
   	  isFetching: false, 
	  flashMessage: null,
	  collections: {
		  poems: {},
		  authors: {}
	  },
	  poemIndex: []
	}
*/


/* ROOT REDUCER */

const rootReducer = combineReducers({
	isFetching,
	flashMessage,
	collections, 
	poemIndex
});

export default rootReducer;


