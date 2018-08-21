// react
import React from 'react';
// redux 
import { Provider } from 'react-redux';
import { requestPoems } from '../store/actions';
import configureStore from '../config/configureStore';
// router 
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// components
import Index from './pages/PoemList';
import PoemDetail from './pages/PoemDetail';
import NotFound from './pages/NotFound'; 

// createStore's wrapper with all middlewares passed into it  

const configured = configureStore();
      configured.dispatch(requestPoems('FETCH_POEMS'));


const Root = () => (
    <Provider store={ configured }>
      <Router>
          <Switch>
            <Route exact strict path ='/'
                   render={() => <Redirect from='/' to='/jap'/> } />

            <Route exact strict path='/detail/:id'
                   component={ PoemDetail } />      

            <Route exact path='/:locale'
                   component={ Index } />
                          
            <Route component={ NotFound } />
          </Switch>
      </Router>
    </Provider>
);

export default Root;
