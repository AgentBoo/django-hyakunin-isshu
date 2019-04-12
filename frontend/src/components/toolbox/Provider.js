/* React Context API based Provider 

import React from "react";
import { AppStore } from "./../store/AppStore";

export const Context = React.createContext();
export const store = new AppStore();

export const Provider = props => (
	<Context.Provider value={store} {...props} />
);

*/