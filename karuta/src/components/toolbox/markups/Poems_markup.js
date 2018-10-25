import React, { Component } from 'react'


const Markup = () => (
	<div className='focal-page'>
		<header className='focal-page-header'>
			<h1 className='focal-page-title'> Ogura Hyakunin Isshu </h1>
			<nav className='focal-page-nav'>
				<a className='link nav-lang'> Japanese </a>
				<a className='link nav-lang'> English </a>
				<a className='link nav-lang'> Romanized </a>
			</nav>
		</header>
		
		<aside className='btn-group aside-lang'>
			<button className='active'><a> J </a> </button>
			<button><a> R </a> </button>
			<button><a> E </a> </button>
		</aside>

		<main className='focal-page-main cards'>	
			<div className='card'>
				<div className='card-front'>
					<div className='card-verses'>
						<p> Whose fault is it </p>
						<p> that my feelings have begun to tangle </p>
						<p> like the tangle-patterned prints </p>
						<p> of Shinobu from the distant north? </p>
						<p> Since it is not mine, it must be… </p>
					</div>
					<span className='card-numeral'> [1] </span>
				</div>
				<div className='card-back'>
					<a className='link' href='#'> Details </a>
				</div>
			</div>
			<div className='card'>
				<div className='card-front jp-vertical'>
					<div className='card-verses'>
						<p> みちのくの </p> 
						<p> しのぶもぢずり </p> 
						<p> 誰故に </p> 
						<p> 乱れそめにし </p> 
						<p> 我ならなくに </p>
					</div>
					<span className='card-numeral'> [123] </span>  
				</div>
				<div className='card-back'>
					<a className='link' href='#'> Details </a>
				</div>
			</div>

			
			<div className='card'>
				<div className='card-front'>
					<div className='card-verses'>
						<p> Michinoku no </p>
						<p> Shinobu mojizuri </p>
					 	<p> Tare yue ni </p>
					 	<p> Midare some ni </p>
					 	<p> Ware naranaku ni </p>
				 	</div>
				 	<span className='card-numeral sm'> [1] </span>
				</div>
			</div>
			<div className='card'>
				<div className='card-back'>
					<a className='link underlined' href='#'> Details </a>
				</div>
			</div>
		</main>
	</div>

)

export default Markup;