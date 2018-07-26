// react 
import React from 'react';
// components 
import { ButtonRound } from './../toolbox/Buttons';

const ScrollControl = ({ children }) => (
	<aside className='btn-group aside-scroll'>	
		{ children }
	</aside>
);

ScrollControl.Button = ButtonRound; 

export default ScrollControl