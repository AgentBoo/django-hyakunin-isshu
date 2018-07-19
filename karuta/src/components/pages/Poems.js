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
import LangControl from './../subcomponents/LangControl';
import ScrollControl from './../subcomponents/ScrollControl';


/* POEMS VIEW */

class Home extends Component{
	constructor(props){
		super(props)
		this.state = {
			topPosition: false
		}
	}

	componentDidMount(){
		window.scrollTo(0,0)
		// <Component onScroll={} /> does not seem to work, so this is an alternative
		window.addEventListener('scroll', this.handleScroll)

	}

	isTranslatedRoute = () => {
		const { locale } = this.props.match.params 

		if(typeof locale === 'undefined'){
			return true
		}

		return ['jap','rom','eng'].reduce((acc, lang) => locale === lang ? acc = true : acc, false) 
	};

	handleScroll = () => {
		if(window.pageYOffset > window.screen.availHeight){
			return this.setState({

			})
		}
	};

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
 	
	renderPoems = (N=100) => this.props.poems.slice(0,N).map(poem => (
		<Card 
			key={ poem.id }
			locale={ this.props.match.params.locale || 'jap' }
			poem={ poem } /> 
	));


	render(){
		let poems = this.props.poems ? this.renderPoems(50) : null 

		if(!this.isTranslatedRoute()){
			return (
				<Route component={ NotFound } />
			)
		}

		return (
			<div className='focal-page'>
				<header className='focal-page-header'>
					<h1 className='focal-page-title'> Ogura Hyakunin Isshu </h1>
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

				<LangControl />
				<ScrollControl> 
					<ScrollControl.Button 
						label='T'
						onClick={ this.scrollUp } />
					<ScrollControl.Button
						label='B' 
						onClick={ this.scrollDown } />
				</ScrollControl>

				<main className='focal-page-main cards'>
					{ poems }
				</main>
			</div>

		)
	}

};


const mapStateToProps = (state, intrinsic) => ({
	poems: getPoems(state, intrinsic.match.params.locale),
	isFetching: getIsFetching(state)
})


Home = connect(mapStateToProps)(Home);

export default Home;