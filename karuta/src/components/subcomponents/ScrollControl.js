// react 
import React from 'react';
// components 
import { ButtonRound } from './../toolbox/Buttons';

const ScrollControl = ({ children }) => (
	<aside className='btn-group page-control'>	
		{ children }
	</aside>
);

ScrollControl.Button = ButtonRound; 

export default ScrollControl