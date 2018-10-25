// normalizr
import { normalize } from "normalizr";
import Schemas from "./../config/normalizrSchemas";
// etc
import { actionType, requestType } from "./../config/constants";
import { getUrl, createOptions } from "./../../utils/fetchHelpers";


/* FETCHING */

const initFetching = () => ({
	type: actionType['data-request']
})

const receiveSuccess = message => ({
	type: actionType['data-success'],
	message: message
})

const receiveFailure = message => ({
	type: actionType['data-failure'],
	message: message 
})


/* API REQUESTS ACTION CREATORS */

const genericRequest = method => (urlKey, item={}, next) => (dispatch, getState) => {
	if(getState().isFetching){
		return
	}

	dispatch(initFetching())

	const url = getUrl(urlKey, item)
	const options = createOptions(method, item)

	const success = status => dispatch(receiveSuccess(status))
	const failure = status => dispatch(receiveFailure(error))

	return fetchData(url, options, next, success, failure)
} 


const reduxRequest = method => (urlKey, item={}) => (dispatch, getState) => {
	if(getState().isFetching){
		return 
	}

	dispatch(initFetching())

	const url = getUrl(urlKey, item)
	const options = createOptions(method, item)

	const success = status => dispatch(receiveSuccess(status))
	const failure = status => dispatch(receiveFailure(error))

	if(method === 'DELETE'){
		const next = res => dispatch({
			type: actionType[urlKey],
			item: item 
		})
		return fetchData(url, options, next, success, failure)

	} else {
		const next = resjson => dispatch({
			type: actionType[urlKey],
			item: normalize(resjson, Schemas[urlkey])
		})

		return fetchData(url, options, next, success, failure)
	}
}


function fetchData(url, options, next, success, failure) {
	/* 
    	List of Django REST HTTP response statuses can be found here: 
    	http://www.django-rest-framework.org/api-guide/status-codes/ 

    	Note: Django REST returns a JSON response for HTTP_400_BAD_REQUEST, but I do not really care for a 400
    */

	return fetch(url, options)
		.then(response => {
			// Django REST returns a JSON response for 200 and 201 statuses
			if (response.status > 199 && response.status <= 201) {
				response.json().then(resjson => next(resjson));
				return Promise.resolve(response.statusText);
			}

			// Django REST returns no content for 201 - 299 statuses
			if (response.status > 201 && response.status < 300) {
				next(response);
				return Promise.resolve(response.statusText);
			}

			// reject other responses
			return Promise.reject(response);
		})
		.then(status => success(status))
		.catch(error => {
			if (error instanceof TypeError) {
				return failure(error.message);
			} else {
				return failure(error.statusText);
			}
		});
}


export { initFetching }
export { receiveSuccess }
export { receiveFailure }

export { fetchData }

export const retrievePoems = reduxRequest(requestType.GET)

export const retrieve = genericRequest(requestType.GET);
export const create = genericRequest(requestType.POST);
export const update = genericRequest(requestType.PATCH);
export const destroy = genericRequest(requestType.DELETE);

