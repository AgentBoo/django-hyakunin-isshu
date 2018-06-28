import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import NotFound from './../presentational/NotFound'
import Main from './Main';


const Home = ({ match }) => {
	const isTranslatedRoute = () => ['jap','rom','eng'].find(language => {
		return !match.params.locale || (language === match.params.locale) 
	}) 
	
	if(!isTranslatedRoute){
		return <Route component={ NotFound } />
	}

	return (
		<div>
			<h4> I am a Home </h4>
			<nav>
				<NavLink to='/jap'> Japanese </NavLink>
				<NavLink to='/rom'> Romanji </NavLink>
				<NavLink to='/eng'> English </NavLink>
			</nav>
			<Main locale={ match.params.locale }/>
		</div>
)}

export default Home;