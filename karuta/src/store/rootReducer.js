// redux
import { combineReducers } from "redux";
// slice reducers
import { isFetching, flashMessage, collections, index } from "./reducers";


const rootReducer = combineReducers({
	isFetching, // false 
	flashMessage, // null 
	collections, // poems: {}, translations: {}
	index, // []
});

export default rootReducer;
