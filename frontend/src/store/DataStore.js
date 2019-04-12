import fetch from "cross-fetch";
import { configure, decorate, observable, action, when } from "mobx";
import { fromPromise } from "mobx-utils";
import { getURL } from "./../utils/fetch";

// only allow state modifications by using actions
configure({ enforceActions: "observed" });

export class DataStore {
	constructor() {
		when(
			() => this.init && this.status == "success",
			() => this.doneInit()
		);
	}

	// observable

	collection = [];
	status = "initializing";
	init = true;

	// actions

	setCollection(data) {
		this.collection = data;
	}

	setStatus(status) {
		this.status = status;
	}

	doneInit() {
		this.init = false;
	}

	retrieve(urlKey, payload) {
		return this.fetch(urlKey, payload).then(
			response => {
				this.setStatus("success");
				return this.transformResponse(response);
			},
			rejection => {
				this.setStatus("rejected");
				return rejection.message || "Network response was not OK";
			}
		);
	}

	extendPoem(data, id) {
		/* 
		There are exactly 100 unique poems in the OHI anthology. 
		Each poem is identified by its numeral (ordinal number). 
		This is convenient because items in the data collection[] 
		can now be accessed by their index and don't need to be looked up.
		*/

		const poemIndex = id - 1;
		this.collection[poemIndex] = { ...this.collection[poemIndex], ...data };
	}

	// helpers

	fetch(urlKey, payload) {
		this.setStatus("pending");

		const url = getURL(urlKey, payload);
		const request = fromPromise(fetch(url));

		return request;
	}

	transformResponse(response) {
		/* 
		Promises returned from fetch() are rejected on network 
		or CORS errors. Promises won’t reject on HTTP error 
		statuses. By default, fetch() won't send or receive any 
		cookies from the server, see 
		https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

		See list of Django REST HTTP response statuses, here
		http://www.django-responset-framework.org/api-guide/status-codes/ 
	  	*/

		// Django rest api returns a JSON response for 200 and 201 statuses
		if (199 < response.status && response.status <= 201) {
			return response.json();
		}

		// Django rest api returns no content for 201 - 299 statuses
		if (201 < response.status && response.status <= 299) {
			return Promise.resolve(null);
		}

		// Django rest api returns a JSON response for HTTP_400_BAD_REQUEST,
		// but I don't really care for a 400
		if (299 < response.status) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}
	}
}

decorate(DataStore, {
	collection: observable,
	setCollection: action,
	status: observable,
	setStatus: action,
	init: observable,
	doneInit: action,
	retrieve: action,
	extendPoem: action
});
