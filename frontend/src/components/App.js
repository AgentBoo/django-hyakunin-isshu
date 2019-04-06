import React from "react";
import Provider from "./Provider";
// components
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header } from "./Header";
import { List } from "./List";
//import { Detail } from "./Detail";

import "./styles.css";

/* 
Without a separate context provider component, class components should use context 
through Context.Consumer because using `static contextType` creates a circular 
dependency, making `this.context` always undefined in children (that is, if you 
insist on setting up the provider in the App.js and router/routes at the same time)
https://github.com/facebook/react/issues/13969#issuecomment-474373021
*/

const App = () => (
	<Provider>
		<Header />
		<Router>
			<Route exact path="/" component={List} />
			{/*<Route exact path="/:index/" component={Detail} />*/}
		</Router>
	</Provider>
);

export default App;
