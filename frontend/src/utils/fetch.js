import fetch from "cross-fetch";
import { endpoints } from "./../config/constants";

function isValidURL(url) {
	const re = /(?:undefined)+/;
	return !re.test(url);
}

function getURL(urlKey, payload) {
	const handler = endpoints[urlKey];
	const url = handler(payload);

	if (isValidURL(url)) {
		return url;
	} else {
		throw new Error(`${url} is an invalid URL`);
	}
}

function fetchData(url, options, next, success, failure) {
	/* 
	Promises returned from fetch() are rejected on network or CORS errors.
	Promises won’t reject on HTTP error statuses.
	By default, fetch() won't send or receive any cookies from the server.
	See https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

	List of Django REST API HTTP response statuses can be found here: 
	http://www.django-rest-framework.org/api-guide/status-codes/ 
  */

	const generic = "Something went wrong";
	const networkProblem = "Network response was not OK";

	return fetch(url, options)
		.then(
			response => {
				// Django REST API returns a JSON response for 200 and 201 statuses
				if (199 < response.status && response.status <= 201) {
					return response.json()
				}

				// Django REST API returns no content for 201 - 299 statuses
				if (201 < response.status && response.status <= 299) {
					return null 
				}

				// Django REST API returns a JSON response for HTTP_400_BAD_REQUEST,
				// but I don't really care for a 400
				if (299 < response.status) {
					throw new Error(`HTTP ${response.status}: ${response.statusText}`);
				}
			},
			rejection => failure(rejection.message || networkProblem)
		)
		.then(result => next(result, options.body))
		.then(result => success('success'))
		.catch(error => failure(error.message || generic));
}

export { isValidURL, getURL, fetchData };
