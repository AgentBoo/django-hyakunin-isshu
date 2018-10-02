// @flow
// react
import React from "react";
// redux
import { Provider } from "react-redux";
import { requestPoems } from "../store/actions";
import configureStore from "../config/configureStore";
// router
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from "react-router-dom";
// components
import NotFound from "./pages/NotFound";
import PoemDetail from "./pages/PoemDetail";
import Index from "./pages/PoemList";
import About from './pages/About'

// createStore's wrapper with all middlewares passed into it

const configured = configureStore();
	  configured.dispatch(requestPoems("FETCH_POEMS"));

/*
  route '/:locale' matches a lot of urlpatterns;
  place it close to last and impose exact strict on other paths;
*/

const Root = () => (
	<Provider store={configured}>
		<Router>
			<Switch>
				{/* prettier-ignore */}
				<Route
					exact
					strict
		  			path='/'
		  			render={() => <Redirect from='/' to='/jap' />} />
		  		{/* prettier-ignore */}
				<Route
					exact
					path='/about'
					component={About} />
				{/* prettier-ignore */}
				<Route
					exact
					strict
					path='/detail/:id'
					component={PoemDetail} />
				{/* prettier-ignore */}
				<Route
					exact
					path='/:locale'
					component={Index} />
				{/* prettier-ignore */}
				<Route
					component={NotFound} />
			</Switch>
		</Router>
	</Provider>
);

export default Root;
