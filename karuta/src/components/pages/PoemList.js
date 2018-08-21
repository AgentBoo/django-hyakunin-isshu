// react 
import React, { Component } from 'react';
// redux 
import { connect } from 'react-redux';
import { getPoems, getIsFetching } from './../../store/selectors';
// router 
import { Route, NavLink } from 'react-router-dom';
// components 
import { animateScroll as scroll } from 'react-scroll'
import NotFound from './NotFound';
import Card from './../subcomponents/Card';
import ScrollControl from './../subcomponents/ScrollControl';


/* INDEX VIEW */

const isTranslatedRoute = (params) => {
	const { locale } = params 

		if(typeof locale === 'undefined'){
			return true
		}

		return ['jap','rom','eng'].reduce((acc, lang) => locale === lang ? acc = true : acc, false) 
}


class PoemList extends Component{
	constructor(props){
		super(props)
		this.state = {
			grid: 'focal-page-main cards'
		}
	}

	componentDidMount(){
		window.scrollTo(0,0)
		// <Component onScroll={} /> does not seem to work, so this would be an alternative
		// window.addEventListener('scroll', this.handleScroll)

	}

	scrollDown = () => scroll.scrollMore(1000, {
		duration: 1600,
		delay: 50,
		smooth: 'easeInOutCubic',
	});

	scrollUp = () => scroll.scrollMore(-1000, {
		duration: 1600,
		delay: 50,
		smooth: 'easeInOutCubic',
	})
 	
 	handleGrid = (cols) => this.setState({
 		grid: 'focal-page-main cards ' + cols
 	}) 

	renderPoems = (N=100) => this.props.poems.slice(0,N).map(poem => (
		<Card 
			key={ poem.id }
			locale={ this.props.match.params.locale || 'jap' }
			poem={ poem } /> 
	));


	render(){
		let poems = this.props.poems ? this.renderPoems(50) : null 

		if(!isTranslatedRoute(this.props.match.params)){
			return (
				<Route component={ NotFound } />
			)
		}

		return (
			<div className='focal-page'>
				<header className='focal-page-header'>
					<h1 className='focal-page-title'> Ogura Hyakunin Isshu </h1>
					{/* Language switches */}
					<nav className='focal-page-nav'>
						<NavLink 
							className='link nav-lang' 
							to='/jap'> 
							Japanese 
						</NavLink>
						<NavLink 
							className='link nav-lang' 
							to='/rom'> 
							Romanji 
						</NavLink>
						<NavLink 
							className='link nav-lang' 
							to='/eng'> 
							English 
						</NavLink>
					</nav>
				</header>

				<aside className='btn-group aside-lang'>
					{/* Language switches */}
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
				</aside>

				<ScrollControl> 
					<ScrollControl.Button 
						label={<i class="fas fa-long-arrow-alt-up"></i>}
						onClick={ this.scrollUp } />
					<ScrollControl.Button 
						onClick={ this.scrollDown }
						label={<i class="fas fa-long-arrow-alt-down"></i> }/>
					<ScrollControl.Button 
						onClick={ () => this.handleGrid('grid-1') }
						label='I'/>
					<ScrollControl.Button 
						onClick={ () => this.handleGrid('grid-2') }
						label='II'/>
					<ScrollControl.Button 
						onClick={ () => this.handleGrid('grid-4') }
						label='IIII'/>
					<ScrollControl.Button 
						onClick={ this.handleGrid }
						label={<i class="fas fa-th"></i>} />
				</ScrollControl>

				{/* 100 poems */}
				<main className={ this.state.grid }>
					{ poems }
				</main>
			</div>

		)
	}
// end component
};


const mapStateToProps = (state, intrinsic) => ({
	poems: getPoems(state, intrinsic.match.params.locale),
	isFetching: getIsFetching(state)
})

PoemList = connect(mapStateToProps)(PoemList);

export default PoemList;