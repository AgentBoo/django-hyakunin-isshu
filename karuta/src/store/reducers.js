import { combineReducers } from 'redux';


// utilities 
const updateObject = (original, updated) => Object.assign({}, original, updated)


/* state shape 
	initialState = {
		isFetching: false, 
		errorMessage: null,
		collections: {
			poems: {},
			authors: {}
		},
		index: []
	}
*/


// slice reducers 
const isFetching = (state=false, action) => {
	switch(action.type){
		case 'DATA_REQUEST':
			return true 
		case 'DATA_SUCCESS':
		case 'DATA_FAILURE':
			return false 
		default:
			return state 
	}
}

const errorMessage = (state=null, action) => {
	switch(action.type){
		case 'DATA_REQUEST': 
		case 'DATA_SUCCESS':
			return null 
		case 'DATA_FAILURE':
			return action.message  
		default:
			return state 
	}
}

const poems = (state={}, action) => {
	switch(action.type){
		case 'FETCH_POEMS_LIST':
			return updateObject(state, { ...action.data.entities.poems })
		case 'FETCH_POEM':
		default:
			return state 
	}
}

const authors = (state={}, action) => {
	switch(action.type){
		case 'FETCH_POEMS_LIST':
			return updateObject(state, { ...action.data.entities.authors })
		case 'FETCH_POEM':
		default:
			return state
	}
}

const index = (state=[], action) => {
	switch(action.type){
		case 'FETCH_POEMS_LIST':
			return [...action.data.result]
		default:
			return state 
	}
}


// collection 
const collections = combineReducers({
	poems, 
	authors
})

// root 
const rootReducer = combineReducers({
	isFetching,
	errorMessage,
	collections, 
	index
})

export default rootReducer;
