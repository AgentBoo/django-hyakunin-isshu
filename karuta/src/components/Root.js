// react
import React from 'react';
// redux 
import { Provider } from 'react-redux';
import configureStore from '../config/configureStore';
import { requestPoems } from '../store/actions';
// router 
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// components
import Home from './pages/Poems';
import PoemDetail from './pages/PoemDetail';
import NotFound from './pages/NotFound';
import Test from './markups/PoemDetail_markup.js' 

// createStore's wrapper with all middlewares passed into it  

const configured = configureStore();
      configured.dispatch(requestPoems('fetch-poems'));


const Root = () => (
    <Provider store={ configured }>
      <Router>
          <Switch>
           <Route exact strict path='/test'
                   component={ Test } />   

            <Route exact strict path ='/'
                   render={() => <Redirect from='/' to='/jap'/> } />

            <Route exact strict path='/detail/:id'
                   component={ PoemDetail } />      

            <Route exact path='/:locale'
                   component={ Home } />
                          
            <Route component={ NotFound } />

          </Switch>
      </Router>
    </Provider>
);

export default Root;
