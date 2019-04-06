import React from "react";
import { AppStore } from "./../store/AppStore";

export const Context = React.createContext();
export const store = new AppStore();

const Provider = props => (
	<Context.Provider value={store} {...props} />
);

export default Provider;
