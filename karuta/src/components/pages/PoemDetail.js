// react
import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
import { myPoem } from '../../store/selectors';
// router
import { withRouter } from 'react-router';
// components
import { Link as ScrollLink, Element, animateScroll as scroll } from 'react-scroll'
import { CSSTransition } from 'react-transition-group';
import { ButtonRound, ButtonBrick } from './../toolbox/Buttons';
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
			translator: 'Template'
		}
	}

	componentDidMount(){
		window.scrollTo(0,0)
		this.setState({
			pageUnfold: true
		})
		// fetch other translations
		if(this.props.poem.eng){
			return this.setState({
				translations: Object.assign({}, this.state.translations, {
					'Clay MacCauley Revised': this.props.poem.eng.verses
				}),
			})
		}
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
				<div className='cuboid-container'>
					<div className='cuboid-flipper'>
						<div className='card-verses front'>
						<p> { verses[0] } </p>
						<p> { verses[1] } </p>
						<p> { verses[2] } </p>
						<p> { verses[3] } </p>
						<p> { verses[4] } </p>
						</div>
						<div className='card-verses side'>
						<p> { verses[0] } </p>
						<p> { verses[1] } </p>
						<p> { verses[2] } </p>
						<p> { verses[3] } </p>
						<p> { verses[4] } </p>
						</div>
					</div>
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
	
	renderVerses = (verses) => verses.map((verse,i) => <p> verse[i] </p>)
	
	renderTranslation = (translator) => {
		const verses = this.state.translations[translator]
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
		const controls = Object.keys(this.state.translations).map(translator =>
			<button
				className={ translator == this.state.translator ? 'active' : null }
				type='button'
				translator={ translator }
				onClick={ () => this.switchToTranslation(translator) }>
				{ translator }
			</button>
		)
		return (
			<section> { controls } </section>
		)
	}

	switchToTranslation = (translator) => {
		return this.setState({
			translator: translator
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
						<div className='lateral-page-side-content'>
							<h1> { this.props.match.params.id } </h1>
							{ authorSection }
							{ this.renderTranslationControls() }
							{ this.renderTranslation(this.state.translator) }
							<section>
							<ButtonBrick
								label='Back'
								onClick={ this.scrollToTop } />
							<ButtonBrick
								label='Top'
								onClick={ this.scrollToTop } />
							<ButtonBrick
								label='Forw'
								onClick={ this.scrollToTop } />
							</section>
						</div>
					</aside>
					<main id='main' className='lateral-page-main'>
						<section className='panels'>
							{ romPanel }

							{ japPanel }

							<div className='panel jp-vertical'>
								<div className='cuboid-container'>
									<div className='cuboid-flipper'>
										<div className='front'>
											{ this.props.poem.id ? this.props.poem.jap.author : null }
										</div>
										<div className='side'>
											{ this.props.poem.id ? this.props.poem.jap.author : null }
										</div>
									</div>
								</div>
							</div>

							<div className='panel'>
								<ScrollLink
									to='translations'
									duration={1600}
									delay={25}
									offset={10}
									smooth>
									<div className='cuboid-container'>
										<div className='cuboid-flipper'>
											<div className='front'>
												Interpretation
											</div>
											<div className='side'>
												Interpretation
											</div>
										</div>
									</div>
								</ScrollLink>
							</div>
						</section>
						<Element name='translations'>
							<div className='panel text'>
								<p> Interpretation </p>
								<LoremIpsum />
							</div>
						</Element>
						<div className='panel text'>
							<p> Add Translation </p>
							<LoremIpsum />
						</div>
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
