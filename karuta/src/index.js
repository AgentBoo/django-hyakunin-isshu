// react
import React from 'react';
import ReactDOM from 'react-dom';
// components
import Root from './components/Root';
// css
import './stylesheets/css/index.css';
/*import registerServiceWorker from './registerServiceWorker';*/

// React app is injected into 'root' div 
// ~/backend/karuta_app/templates/index.html

ReactDOM.render(
	<Root />, 
	document.getElementById('root'));

/*registerServiceWorker();*/
