import { DataStore } from "./DataStore";
import { ListStore } from "./ListStore";
import { DetailStore } from "./DetailStore";

export class AppStore {
	constructor() {
		this.data = new DataStore(this);
		this.list = new ListStore(this);
		this.detail = new DetailStore(this);
	}
}
