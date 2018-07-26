// react 
import React from 'react';
// router 
import { NavLink } from 'react-router-dom';


const LangControl = () => (
	<aside className='btn-group aside-lang'>
		<NavLink 
			activeClassName='active'
			to='/eng'> 
			I 
		</NavLink>
		<NavLink 
			activeClassName='active'
			to='/jap'> 
			J 
		</NavLink>
		<NavLink 
			activeClassName='active'
			to='/rom'> 
			R 
		</NavLink>
		<NavLink 
			activeClassName='active'
			to='/eng'> 
			E 
		</NavLink>
		<NavLink 
			activeClassName='active'
			to='/eng'> 
			I 
		</NavLink>
	</aside>
);

export default LangControl; 