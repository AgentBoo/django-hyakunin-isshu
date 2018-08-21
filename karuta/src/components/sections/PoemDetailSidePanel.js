// react
import React, { Component } from 'react';
// router
import { Link } from 'react-router-dom';
// components 
import { animateScroll as scroll } from 'react-scroll'
import { ButtonBrick } from './../toolbox/Buttons';


class PoemDetailSidePanel extends Component{
	getPreviousPage = () => this.props.poemId !== '1' ? 1*this.props.poemId - 1 : 1;

	getNextPage = () => this.props.poemId !== '100' ? 1*this.props.poemId + 1 : 100;

	scrollToTop = () => scroll.scrollToTop({
		duration: 1600,
		delay: 50,
		smooth: 'easeInOutCubic',
	})

	renderTranslationControls = () => {
		const controls = Object.keys(this.props.translations).map((translator,idx) => (
			<button
				key={idx}
				className={ translator === this.props.translator ? 'active' : null }
				type='button'
				onClick={ () => this.props.switchTranslation(translator) }>
				{ translator }
			</button>
		))

		return (
			<section> 
				{ controls }
			</section>
		)
	}

	render(){
		const { translator, translations } = this.props

		return (
			<aside className='lateral-page-side'>
			<div className='lateral-page-side-content'>
				{/* Numeral */}
				<h1> { this.props.poemId } </h1>
				
				{/* Author */}
				<section className='author'>
					<h3> { this.props.romAuthor } </h3>
					<p> { this.props.engAuthor } </p>
				</section>

				{/* Different translators */}
				{ this.renderTranslationControls() }
				
				{/* Displayed translation */}
				<section>
					<p> { translations[translator][0] } </p>
					<p> { translations[translator][1] } </p>
					<p> { translations[translator][2] } </p>
					<p> { translations[translator][3] } </p>
					<p> { translations[translator][4] } </p>
				</section>
				
				{/* Page controls */}
				<section>
					<div className='btn-group page-control'>
						<Link 
							to='/'
							className='btn brick'>
							Poems
						</Link>
						<Link 
							to={`/detail/${ this.getPreviousPage() }`}
							className='btn brick'>
							Previous
						</Link>
						<ButtonBrick
							label='Top'
							onClick={ this.scrollToTop } />
						<Link 
							to={`/detail/${ this.getNextPage() }`}
							className='btn brick'>
							Next
						</Link>
					</div>
				</section>
			</div>
		</aside>
		)
	}
// end component
};

export default PoemDetailSidePanel;