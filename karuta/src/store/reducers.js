// redux
import { combineReducers } from 'redux';

// utilities 
const updateObject = (original, updated) => Object.assign({}, original, updated);


/* SLICE REDUCERS */

export const isFetching = (state=false, action) => {
	switch(action.type){
		case 'DATA_REQUEST':
			return true 
		case 'FETCH_POEM':	
		case 'FETCH_POEMS':
		case 'DATA_FAILURE':
			return false 
		default:
			return state 
	}
};


export const flashMessage = (state=null, action) => {
	switch(action.type){
		case 'DATA_REQUEST': 
		case 'FETCH_POEM':	
		case 'FETCH_POEMS':
			return null 
		case 'DATA_FAILURE':
			return action.message  
		default:
			return state 
	}
};


export const poemIndex = (state=[], action) => {
	switch(action.type){
		case 'FETCH_POEMS':
			return [...action.data.result]
		default:
			return state 
	}
};


const poems = (state={}, action) => {
	switch(action.type){
		case 'FETCH_POEMS':
			return updateObject(state, action.data.entities.poems)
		default:
			return state 
	}
};

const authors = (state={}, action) => {
	switch(action.type){
		case 'FETCH_POEMS':
			return updateObject(state, action.data.entities.authors)
		default:
			return state
	}
};
 
export const collections = combineReducers({
	poems, 
	authors
});

