import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '../config/store';
import Home from './coupled/Home';
import PoemDetail from './coupled/PoemDetail'
import NotFound from './presentational/NotFound'


const configured = configureStore()

const App = () => (
    <Provider store={ configured }>
      <Router>
        <Switch>
          <Route exact strict path='/detail/:id'
                 component={ PoemDetail } />      
          
          <Route exact path='/'
                 component={ Home } />

          <Route exact path='/:locale'
                 component={ Home } />

          <Route component={ NotFound } />

        </Switch>
      </Router>
    </Provider>
);


export default App;
