import { configure, decorate, observable, computed, action } from "mobx";

// don't allow state modifications using anything but actions
configure({ enforceActions: "observed" });

export class ListStore {
	constructor(store) {
		this.store = store;
	}

	// observable 

	page = 0;
	locale = "jap";
	searchPhrase = "";

	// actions

	setPage(page) {
		this.page = page;
	}

	setLocale(locale) {
		this.locale = locale;
	}

	setSearchPhrase(phrase) {
		this.searchPhrase = phrase;
	}

	// computed

	get pagination() {
		const poems = this.store.data.collection;

		if (poems.length) {
			return new Array(Math.floor(poems.length)).fill(0);
		} else {
			return [];
		}
	}

	get list(){
		if(this.isSearchingPhrases){
			return this.searchResults
		} else {
			return this.pageResults
		}
	}

	// helpers 

	get isSearchingPhrases(){
		return this.searchPhrase.length
	}

	get pageResults() {
		const poems = this.store.data.collection;

		if (poems.length) {
			return [poems[this.page][this.locale]];
		} else {
			return [];
		}
	}

	get searchResults() {
		if (!this.searchPhrase) {
			return this.pageResults;
		}

		const poems = this.store.data.collection;

		// don't use /g flag for the regex
		// https://stackoverflow.com/a/1520853

		let regex = new RegExp(this.searchPhrase, "i");
		let results = [];

		for (let i = 0; i < poems.length; i++) {
			const poem = poems[i][this.locale];
			const result = regex.test(poem.verses);

			if (result) {
				results.push(poem);
			}
		}

		if (results.length) {
			return results;
		} else {
			return [];
		}
	}
}

decorate(ListStore, {
	page: observable,
	setPage: action,
	locale: observable,
	setLocale: action,
	searchPhrase: observable,
	setSearchPhrase: action,
	pagination: computed,
	list: computed,
});
