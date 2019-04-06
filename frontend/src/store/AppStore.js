import { DataStore } from "./DataStore";
import { ListStore } from "./ListStore";
import { DetailStore } from "./DetailStore";

export class AppStore {
	constructor() {
		this.data = new DataStore(this);
		this.poem = new DetailStore(this);
		this.poems = new ListStore(this);
	}
}
