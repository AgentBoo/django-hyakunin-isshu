import { configure, decorate, observable, computed, action, autorun } from "mobx";
import { getURL, fetchData } from "./../utils/fetch";

// don't allow state modifications using anything but actions
configure({ enforceActions: "observed" })

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

class AppStore {
	lang = "jap";
	name = ""
	pg = 1

	get alias(){
		return this.name.toLowerCase() 
	}

	get searched(){
		let re = new RegExp(this.alias)
		if(this.alias === ""){
			return this.poems
		}

		let filtered = []

		data.forEach((d, idx) => {
			let r = re.test(d.rom.verses.toLowerCase())
			
			if(r){
				return filtered.push(d['rom'])
				
			}
		
			let e = re.test(d.eng.verses.toLowerCase())
			
			if(e){
				return filtered.push(d['eng'])
			
			}
		})

		return filtered 
	}

	setPage(page){
		this.pg = page 
	}

	setAlias(value){
		this.name = value 
	}

	get locale(){
		return this.lang 
	}

	get poems(){
		return this.pagePoems.map(d => d[this.lang])
	}

	get page(){
		return this.pg 
	}

	get pagePoems(){
		if(this.page === data.length){
			return data.slice([this.page])
		}

		return data.slice([this.page], [this.page + 1])
	}

	setLocale(language) {
		this.lang = language;
	}

	fetch(){
		const url = getURL('poems')
		const next = resjson => action(() => this.collection = resjson)() 
		const success = success => action(() => this.isLoading = !success)()
		const failure = error => action(() => this.isLoading = !error)()
		return fetchData(url, {}, next, success, failure)
	}
}

// mobx uses Proxy objects 
// https://stackoverflow.com/a/51608724

// wrap App in observer HOC || @observer class App
// autorun is run automatically inside observer
// observer updates store values used in the component's render()
// assign observable({ key: value (observables), key: fn (computed|actions)}) to a store variable || @observer class AppStore{@observable key=value} 
// wrap AppStore in decorate + { [key]: observable } + AppStore{key = value} || @observer class App {@observable key = value} or appStore = observable({key = value}) 
decorate(AppStore, {
	lang: observable, // must be observable to have computed update itself automatically
	languages: observable,
	locale: computed,
	setLocale: action,
	name: observable,
	alias: computed,
	setAlias: action,
	poems: computed,
	page: computed,
	pg:observable,
	setPage: action,
	searched: computed,

});

export { AppStore };
