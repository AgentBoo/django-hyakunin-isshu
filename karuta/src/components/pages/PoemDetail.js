// react 
import React, { Component } from 'react';
// redux 
import { connect } from 'react-redux';
import { myPoem } from '../../store/selectors';
// router 
import { withRouter } from 'react-router';
// components 
import { Link, Element, animateScroll as scroll } from 'react-scroll'
import { CSSTransition } from 'react-transition-group'; 
import { ScrollTopButtonRound } from './../toolbox/Buttons';
import { LoremIpsum } from './../toolbox/Lorem';



/* POEM DETAIL VIEW */

class PoemDetail extends Component{
	constructor(props){
		super(props)
		this.state = {
			pageUnfold: false,
			translations: {
				'Template': ['In Naniwa Bay','now the flowers are blossoming','After lying dormant all winter','now the spring has come','and the flowers are blossoming']
			},
			author: 'Template' 
		}
	}

	componentDidMount(){
		window.scrollTo(0,0)
		// fetch other translations
	}

	componentDidUpdate(prevProps){
		if(prevProps.poem !== this.props.poem){
			return this.setState({
				translations: Object.assign({}, this.state.translations, {
					'Clay MacCauley Revised': this.props.poem.eng.verses
				}),
			})
		}
	}

	endTransition = () => this.setState({ pageUnfold: !this.state.pageUnfold })

	renderPoem = (lang) => {
		const { verses } = this.props.poem[lang]

		return (
			<section className={ lang === 'jap' ? 'panel jp-vertical' : 'panel' }>
				<div className='card-verses'>
					<p> { verses[0] } </p>
					<p> { verses[1] } </p>
					<p> { verses[2] } </p>
					<p> { verses[3] } </p>
					<p> { verses[4] } </p>
				</div>
			</section>
		)
	};

	renderAuthor = () => (
		<section className='author'>
			<h3> { this.props.poem.rom.author } </h3>
			<p> { this.props.poem.eng.author } </p>
		</section>
	)

	renderTranslation = (author) => {
		const verses = this.state.translations[author]
		return (
			<section>
				<p> { verses[0] } </p>
				<p> { verses[1] } </p>
				<p> { verses[2] } </p>
				<p> { verses[3] } </p>
				<p> { verses[4] } </p>
			</section>
		)
	};

	renderTranslationControls = () => {
		const controls = Object.keys(this.state.translations).map(translation => 
			<button 
				type='button'
				author={ translation }
				onClick={ () => this.switchToTranslation(translation) }> 
				{ translation } 
			</button>
		)
		return (
			<section> { controls } </section>
		)
	}

	switchToTranslation = (translation) => {
		return this.setState({
			author: translation
		})
	}

	scrollToTop = () => scroll.scrollToTop({
		duration: 1600,
		delay: 50,
		smooth: 'easeInOutCubic',
	})

	render(){
		const authorSection = this.props.poem.id ? this.renderAuthor() : null 
		const japPanel = this.props.poem.id ? this.renderPoem('jap') : null 
		const romPanel = this.props.poem.id ? this.renderPoem('rom') : null

		return (
			<CSSTransition
				in={ this.state.pageUnfold }
				timeout={500}
				classNames='longfade'
				onEntered={ this.endTransition }>
				<div className='lateral-page'>
					<aside className='lateral-page-side'>
						<div>
							<h2> [{ this.props.match.params.id }] </h2>
							{ authorSection }
							{ this.renderTranslationControls() }
							{ this.renderTranslation(this.state.author) }
							<ScrollTopButtonRound 
								label='Top'
								onClick={ this.scrollToTop } />
						</div>
					</aside>
					<main id='main' className='lateral-page-main'>
						<section className='panels'>
							{ romPanel }
							
							{ japPanel }				
							
							<div className='panel jp-vertical'>
								{ this.props.poem.id ? this.props.poem.jap.author : null }
							</div>

							<div className='panel'> 
								<Link 
									to='translations'
									duration={1600}
									delay={25}
									offset={50}
									smooth>
									Interpretation
								</Link> 
							</div>
						</section>
						<Element name='translations'>
							<div>
								<p> Interpretation </p>
								<LoremIpsum />
								<p> Add Translation </p>
							</div>
						</Element>
					</main>
				</div>
			</CSSTransition>
		)
	}

};


const mapStateToProps = (state, intrinsic) => ({
	poem: myPoem(state, intrinsic.match.params.id)
})

PoemDetail = withRouter(connect(mapStateToProps)(PoemDetail));

export default PoemDetail;
