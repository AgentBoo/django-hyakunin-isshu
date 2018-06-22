import { normalize } from 'normalizr';
import * as schemas from './../config/normalizr';
import { API_ROOT } from './../config/api'


export const actionTypes = {
	'data-request' : 'DATA_REQUEST',
	'data-success' : 'DATA_SUCCESS',
	'data-failure' : 'DATA_FAILURE',
	'poems-list'   : 'FETCH_POEMS_LIST',
	'poem-detail'  : 'FETCH_POEM'
}

const receiveSuccess = (message) => ({
	type: actionTypes['data-success'],
	message: message
})

const receiveFailure = (message) => ({
	type: actionTypes['data-failure'],
	message: message || 'Something went wrong'
})

export const requestData = (endpoint,schema,actionName) => (dispatch) => {
	let url = API_ROOT + endpoint

	dispatch({
		type: actionTypes['data-request'],
	})
	
	return fetch(url)
			.then(response => !response.ok ? Promise.reject(response) : response.json())
			.then(resjson => {
				dispatch({
					type: actionTypes[actionName], 
					data: normalize(resjson, schemas[schema]) 
				})

				return Promise.resolve('Done')
			 })
			.then(success => 
				dispatch(receiveSuccess(success))
			 )
			.catch(error => 
				dispatch(receiveFailure(error.message))
			 )
}

