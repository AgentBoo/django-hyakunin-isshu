// react
import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
import { getPoem } from '../../store/selectors';
// router
import { withRouter } from 'react-router';
// components
import { Link as ScrollLink, Element, animateScroll as scroll } from 'react-scroll'
import { CSSTransition } from 'react-transition-group';
import SidePanel from './../sections/PoemDetailSidePanel'
import FlipPanels from './../sections/PoemDetailFlipPanels';
import { LoremIpsum } from './../toolbox/Lorem';


class PoemDetail extends Component{
	constructor(props){
		super(props)
		this.state = {
			pageFadeIn: false,
			translations: {
				'Template': [
					'In Naniwa Bay',
					'now the flowers are blossoming',
					'After lying dormant all winter',
					'now the spring has come',
					'and the flowers are blossoming'
				]
			},
			translator: 'Template'
		}
	}

	componentDidMount(){
		// on route switch, scroll to top of the page 
		window.scrollTo(0,0)

		// trigger CSSTransition
		this.setState({
			pageFadeIn: true
		})
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

	endTransition = () => this.setState({ 
		pageFadeIn: !this.state.pageFadeIn 
	})

	scrollToTop = () => scroll.scrollToTop({
		duration: 1600,
		delay: 50,
		smooth: 'easeInOutCubic',
	})

	switchTranslation = (translator) => this.setState({ 
		translator: translator 
	})

	render(){
		return (
			<CSSTransition
				in={ this.state.pageFadeIn }
				timeout={500}
				classNames='longfade'
				onEntered={ this.endTransition }>
				<div className='lateral-page'>
					<SidePanel
						romAuthor={ this.props.poem.id ? this.props.poem.rom.author : null }
						engAuthor={ this.props.poem.id ? this.props.poem.eng.author : null } 
						poemId={ this.props.match.params.id }
						translator={ this.state.translator }
						translations={ this.state.translations } 
						switchTranslation={ this.switchTranslation }/>

					<main 
						id='main' 
						className='lateral-page-main'>
						<FlipPanels 
							poem={ this.props.poem.id ? this.props.poem : null }/>

						{/* Interpretation section */}
						<Element name='interpretation'>
							<div className='panel text'>
								<p> Interpretation </p>
								<LoremIpsum />
							</div>
						</Element>
						
						{/* Add translation section */}
						<div>
							<div className='panel text'>
								<p> Add Translation </p>
								<LoremIpsum />
							</div>
						</div>
					</main>
				</div>
			</CSSTransition>
		)
	}
// end component
};


const mapStateToProps = (state, intrinsic) => ({
	poem: getPoem(state, intrinsic.match.params.id)
})

PoemDetail = withRouter(connect(mapStateToProps)(PoemDetail));

export default PoemDetail;
