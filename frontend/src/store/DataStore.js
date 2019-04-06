import { configure, decorate, observable, computed, action, autorun, when } from "mobx";
import { fromPromise } from "mobx-utils";
import { getURL, fetchData } from "./../utils/fetch";

// don't allow state modifications using anything but actions
// configure({ enforceActions: "observed" })

const data = [
	{
		id: 1, 
		jap: {
			author: 'Jap 1',
			verses: 'Jap 1' 
		},
		rom: {
			author: 'Rom 1',
			verses: 'Rom 1'
		},
		eng: {
			author: 'Eng 1',
			verses: 'Eng 1'
		}
	},
	{
		id: 2, 
		jap: {
			author: 'Jap 2',
			verses: 'Jap 2' 
		},
		rom: {
			author: 'Rom 2',
			verses: 'Rom 2'
		},
		eng: {
			author: 'Eng 2',
			verses: 'Eng 2'
		}
	},
	{
		id: 3, 
		jap: {
			author: 'Jap 3',
			verses: 'Jap 3' 
		},
		rom: {
			author: 'Rom 3',
			verses: 'Rom 3'
		},
		eng: {
			author: 'Eng 3',
			verses: 'Eng 3'
		}
	},
	{
		id: 4, 
		jap: {
			author: 'Jap 4',
			verses: 'Jap 4' 
		},
		rom: {
			author: 'Rom 4',
			verses: 'Rom 4'
		},
		eng: {
			author: 'Eng 4',
			verses: 'Eng 4'
		}
	}
]


export class DataStore{
	constructor(){
		when(() => this.data.length, () => this.setData(this.collection))
	}

	data = []
	fetched = 'pending'

	// 
	// https://github.com/mobxjs/mobx/issues/872

	get collection(){
		if(this.data.length){
			return this.data
		} else {
			return this.fetch.case({
				pending: () => this.data,
				rejected: err => this.data,
				fulfilled: data => {
					this.setData(data)
					return this.data
				}
			})
		}
	}

	get fetch(){
		return fromPromise(Promise.resolve(data))
	}

	setData(data){
		this.data = data
	}

	/*
	fetch(){
		const url = getURL('poems')
		const next = resjson => action(() => this.collection = resjson)() 
		const success = success => action(() => this.isLoading = !success)()
		const failure = error => action(() => this.isLoading = !error)()
		return fetchData(url, {}, next, success, failure)
	}
	*/
}

decorate(DataStore, {
	collection: computed,
	fetch: computed,
});
