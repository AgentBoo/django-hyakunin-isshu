import { DataStore } from "./DataStore";
import { ListStore } from "./ListStore";
import { DetailStore } from "./DetailStore";

export class AppStore {
	constructor() {
		this.dataStore = new DataStore(this);
		this.listStore = new ListStore(this);
		this.detailStore = new DetailStore(this);
	}
}
