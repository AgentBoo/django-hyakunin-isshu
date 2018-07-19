// react 
import React, { Component } from 'react';
// redux 
import { connect } from 'react-redux';
import { myPoem } from '../../store/selectors';
// router 
import { withRouter } from 'react-router';
// components 
import { CSSTransition } from 'react-transition-group'; 
import { LoremIpsum } from './../toolbox/Lorem';


/* POEM DETAIL VIEW */

class PoemDetail extends Component{
	constructor(props){
		super(props)
		this.state = {
			pageUnfold: false,
			paragraphOpen: false, 
		}
		this.paragraphRef = React.createRef()
	}

	componentDidMount(){
		window.scrollTo(0,0)
		return this.setState({ pageUnfold: !this.state.pageUnfold })
	}

	endTransition = () => this.setState({ pageUnfold: !this.state.pageUnfold })

	scrollToParagraph = (event) => {
		this.setState({ paragraphOpen: true })
		const paragraph = this.paragraphRef.current
		return window.scrollTo(0, paragraph.offsetTop)
	}

	renderAuthor = () => (
		<section className='author'>
			<h3> { this.props.poem.rom.author } </h3>
			<p> { this.props.poem.eng.author } </p>
		</section>
	)

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

	renderTranslation = (lang) => {
		const { verses } = this.props.poem[lang]

		return (
			<section className='panel split'>
				<div className='card-verses'>
					<p> { verses[0] } </p>
					<p> { verses[1] } </p>
					<p> { verses[2] } </p>
					<p> { verses[3] } </p>
					<p> { verses[4] } </p>
				</div>
				<div className='author'>
					<p> { this.props.poem[lang].author } </p>
				</div>
			</section>
		)
	};

	render(){
		const authorPanel = this.props.poem.id ? this.renderAuthor() : null 
		const japPanel = this.props.poem.id ? this.renderPoem('jap') : null 
		const engPanel = this.props.poem.id ? this.renderTranslation('eng') : null 
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
							
							{ authorPanel }
						</div>
					</aside>
					<main className='lateral-page-main'>
						<section className='panels'>
							{ romPanel }
							
							{ japPanel }				
							
							<div className='panel jp-vertical'>
								{ this.props.poem.id ? this.props.poem.jap.author : null }
							</div>

							<div 
								className='panel'
								onClick={ this.scrollToParagraph }> 
								Translations 
							</div>
							
							{ engPanel } 

							{ engPanel }
							
							{ engPanel }

						</section>

						<div ref={ this.paragraphRef }>
							<p> Interpretation </p>
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
