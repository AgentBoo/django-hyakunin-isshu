## React App 

_Dependencies_
```
npm i -S normalizr 
npm i -S redux react-redux 
npm i -S react-router react-router-dom 
npm i -S redux-thunk
npm i -S cross-fetch
npm i -S react-bootstrap
npm i -D redux-logger (!!!)
npm i -S webpack-bundle-tracker 
npm i -S react-app-rewired
```

1. file tree 
```
| src 
|-- components
    |-- containers
    |-- coupled
    |-- presentational
    |-- toolbox
    |-- App.js
|-- config 
|-- store  
|-- stylesheets 
|-- index.js

```
2. sass 

I am quite ok with running multiple terminal windows and one of them occupied by sass 

Eventually, add `scss` files to `.gitignore`
```
cd src/stylesheets/scss 
sass --watch scss:css
```

3. index.js 
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
# one 'global' stylesheet 
import './stylesheets/css/index.css';
# what is this 
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<App />, 
	document.getElementById('root'));

registerServiceWorker(); 
```

4. App.js 

Put redux store and router on App.js 

```javascript 
```

5. Components 

```
| App 
|-- Home
	|-- Navigation  
	|-- Main 
|-- Poem Detail
|-- Not Found  
```

6. Home.js 

Home renders Navigation and passes url information to Main  

7. configure store 
```javascript 
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger()
const rootReducer = () => ({})

const configureStore = () => createStore(
	rootReducer, 
	applyMiddleware(
		thunkMiddleware, 
		loggerMiddleware
	)
)

export default configureStore;
```

8. list actions 
fetch a list of poems 
fetch addendum to a poem 

request data 
receive data

reducers: 
fetching:  
poems 

decide state shape 

getAuthor 
getPoem 

getAuthors 
getPoems 


9. components
 
10. 