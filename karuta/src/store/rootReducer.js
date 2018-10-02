// redux
import { combineReducers } from "redux";
// slice reducers
import { isFetching, flashMessage, collections, index } from "./reducers";

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
	index
});

export default rootReducer;
