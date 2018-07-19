// js-cookie 
import Cookies from 'js-cookie';
// normalizr
import { normalize } from 'normalizr';
import Schemas from './../config/normalizrSchemas';
// constants
import { endpoint, actionType } from './../config/constants';


/* FETCH REQUEST ACTION CREATORS */

// list(), retrieve() django endpoints
export const requestPoems = (urlpattern) => (dispatch) => {
	dispatch({ type: 'DATA_REQUEST' })

	const url = endpoint[urlpattern]
	console.log(url)

	const options = {
		method: 'GET',
		headers: {
			'Accept': 'application/json', 
		}
	}
	
	const success = (json) => dispatch({
		type: actionType[urlpattern],
		data: normalize(json, Schemas[urlpattern])
	}) 

	const failure = (error) => dispatch({
		type: 'DATA_FAILURE',
		message: error || 'Something went wrong'
	}) 

	return requestData(url, options, success, failure)
};


export const requestData = (url, opt, success, failure) => {
	return fetch(url, opt)
			.then(response => {
				// Django returns a JSON response for 200-299 statuses
				if(response.status >= 200 && response.status < 300){
					return response.json().then(resjson => success(resjson))
				}
				// Django returns a JSON response with details for HTTP_400_BAD_REQUEST  
				if(response.status === 400){
					return response.json().then(resjson => failure(resjson.detail))
				}
				// reject the promise with response status text for anything else 
				return Promise.reject(`${response.status}: ${response.statusText}`)
			})
			.catch(error => failure(error))
};