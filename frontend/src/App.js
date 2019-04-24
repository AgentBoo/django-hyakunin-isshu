import React, { Component } from "react";
import { Provider } from "mobx-react";
import { AppStore } from "./store/AppStore";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Splash } from "./components/shared";
import { List, Detail, NotFound } from "./components/pages";

export const store = new AppStore();

class App extends Component {
	componentDidMount() {
		store.dataStore.retrieve("poems").then(resjson => 
			store.dataStore.setCollection(resjson)
		);
	}

	render() {
		return (
			<Provider store={store}>
				<div id="app">
					<Splash />
					<Router>
						<Switch>
							<Route exact path="/" component={List} />
							<Route exact path="/:id/" component={Detail} />
							<Route component={NotFound} />
						</Switch>
					</Router>
				</div>
			</Provider>
		);
	}
}

export default App;
