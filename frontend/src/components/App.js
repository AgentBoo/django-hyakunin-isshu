import React from "react";
import Provider from "./Provider";
// components
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header } from "./Header";
import { List } from "./List";
//import { Detail } from "./Detail";

import "./styles.css";

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
