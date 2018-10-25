import fetch from "cross-fetch";
import Cookies from "js-cookie";
import { fetchData } from "./../store/actions/requests";
import { endpoint } from "./../config/constants";


function getUrl(urlKey, item) {
	/*
		Map urlKey to a url in the endpoint obj (address book) 
	*/

	if (item.id) {
		return endpoint[urlKey] + item.id;
	} else {
		return endpoint[urlKey];
	}
}


function createOptions(method, item) {
	/*
		Set options for fetch(url,options) 
	*/

	if (method === "GET") {
		return {};
	}

	return {
		method: method,
		body: JSON.stringify(item),
		headers: {
			Accept: "application/json",
			"Content-type": "application/json; charset=utf-8",
			"X-CSRFToken": Cookies.get("csrftoken")
		}
	};
}


export { getUrl };
export { createOptions };
export { fetchData }