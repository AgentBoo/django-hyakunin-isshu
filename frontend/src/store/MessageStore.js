import { configure, decorate, observable, action } from "mobx";

// don't allow state modifications using anything but actions
configure({ enforceActions: "observed" });

export class MessageStore {
	messages = [];

	addMessage(text, type) {
		this.messages.push({ text, type });
	}

	removeMessage(messageIndex) {
		this.messages.splice(messageIndex, 1)
	}
}

decorate(MessageStore, {
	messages: observable,
	addMessage: action,
	removeMessage: action
});
