import { configure, decorate, observable, computed, action, autorun } from "mobx";

// don't allow state modifications using anything but actions
configure({ enforceActions: "observed" })

export class DetailStore{
	constructor(store){
		this.store = store 
	}

	selected = 0
	
	setSelected(selectedPoemIndex){
		this.selected = selectedPoemIndex
	}

	get detail(){
		return this.store.data.collection[this.selected]
	}

	get complement(){
		return null
	}
}

decorate(DetailStore, {
	selected: observable,
	setSelected: action,
	detail: computed,
	complement: computed 
})