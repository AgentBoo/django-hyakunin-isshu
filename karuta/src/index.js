// @flow
// react
import React from "react";
import ReactDOM from "react-dom";
// components
import Root from "./components/Root";
// css
import "./stylesheets/css/index.css";

// React app is injected into 'root' div
// ~/backend/karuta_app/templates/index.html

const rootDiv = document.getElementById("root");

/* 
	check if element exists because flow cannot tell 
	https://github.com/facebook/flow/issues/1472
*/

if (rootDiv === null) {
	throw new Error('<div id="root"> does not exist');
} else {
	/* prettier-ignore */
	ReactDOM.render(
		<Root />, 
		rootDiv
	);
}
