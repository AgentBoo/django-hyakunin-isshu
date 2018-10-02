// react 
import React from 'react';
// components 
import FocalPage from './../sections/FocalPage';
import { Route, NavLink, Link } from "react-router-dom";
const About = () => (
	<FocalPage>
				<header className="focal-page-header">
					<h1 className="focal-page-title"> About </h1>
				</header>
				<main className='focal-page-main'>
					<section className='focal-page-main-section'>
					<div className='panel text'>
						<article>
							This page is inspired by the anime Chihayafuru
							<Link to='/' className='btn brick'> Back to Poems </Link>
						</article>
					</div>
					</section>
				</main>
			</FocalPage>
)

export default About