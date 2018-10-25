// @flow
// react
import React, { Component } from "react";
// redux
import { connect } from "react-redux";
import { getPoem } from "../../store/selectors";
// router
import { withRouter } from "react-router";
import type { Match } from "react-router";
// components
import { Element } from "react-scroll";
import { CSSTransition } from "react-transition-group";
import SidePanel from "./../sections/PoemDetailSidePanel";
import FlipPanels from "./../sections/PoemDetailFlipPanels";
import { LoremIpsum } from "./../toolbox/Lorem";

const template = [
	"In Naniwa Bay",
	"now the flowers are blossoming",
	"After lying dormant all winter",
	"now the spring has come",
	"and the flowers are blossoming"
];

type Props = {
	// from mapStateToProps
	poem: {
		id: number | null,
		jap: {
			author: string | null,
			verses: string[]
		},
		rom: {
			author: string | null,
			verses: string[]
		},
		eng: {
			author: string | null,
			verses: string[]
		}
	},
	// from react-router
	match: Match,
	_template: string[]
};

type State = {
	pageFadeIn: boolean,
	translations: {
		[string]: string[]
	},
	translator: string
};

class PoemDetail extends Component<Props, State> {
	props: Props;
	state: State;

	constructor(props: Props) {
		super(props);
		this.state = {
			pageFadeIn: false,
			translations: {
				/* prettier-ignore */
				"Template": template
			},
			translator: "Template"
		};
	}

	componentDidMount() {
		// on route switch, scroll to top of the page
		window.scrollTo(0, 0);

		this.setState({
			pageFadeIn: true,
			translations: Object.assign({}, this.state.translations, {
				"Clay MacCauley Revised": this.props.poem.eng.verses
			}),
		});
	}

	componentDidUpdate(prevProps, prevState) {
		/*
			It is not ideal to setState() in componentDidUpdate
			https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md
		*/
		if (prevProps.poem !== this.props.poem) {
			this.setState({
				translations: Object.assign({}, {
					"Template": template,
					"Clay MacCauley Revised": this.props.poem.eng.verses
				})
			});
		}
	}

	endTransition = () =>
		this.setState({
			pageFadeIn: !this.state.pageFadeIn
		});

	switchTranslation = (translator: string) =>
		this.setState({
			translator: translator
		});

	addTranslation = (translator, verses) =>
		this.setState({
			translations: Object.assign({}, this.state.translations, {
				[translator]: verses
			})
		});

	render() {
		return (
			<CSSTransition
				in={this.state.pageFadeIn}
				timeout={500}
				classNames="longfade"
				onEntered={this.endTransition}>
				<div className="lateral-page">
					<SidePanel
						poem={this.props.poem}
						translations={this.state.translations}
						translator={this.state.translator}
						switchTranslation={this.switchTranslation}
					/>

					<main id="main" className="lateral-page-main">
						<FlipPanels poem={this.props.poem} />

						{/* Interpretation section */}
						<Element name="interpretation">
							<div className="panel text">
								<p className="panel-title"> Interpretation </p>
								<LoremIpsum />
							</div>
						</Element>

						{/* Add translation section */}
						<div>
							<div className="panel text">
								<p className="panel-title"> Add Translation </p>

								<div className="panel-translations">
									<Form
										addTranslation={this.addTranslation}
									/>
									<p>
										<i>
											{" "}
											Without admin privileges, no
											translation will be added to the
											database{" "}
										</i>
									</p>
								</div>
							</div>
						</div>
					</main>
				</div>
			</CSSTransition>
		);
	}
	// end component
}

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			translator: "",
			_firstVerse: "",
			_secondVerse: "",
			_thirdVerse: "",
			_fourthVerse: "",
			_fifthVerse: ""
		};
	}

	handleInputChange = event => {
		if (event.target.value.length > 50) {
			return;
		}

		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = event => {
		event.preventDefault();

		const filtered = Object.keys(this.state).filter(
			key => this.state[key].length < 1
		);

		if (filtered.length) {
			return;
		}

		this.props.addTranslation(this.state.translator, [
			this.state._firstVerse,
			this.state._secondVerse,
			this.state._thirdVerse,
			this.state._fourthVerse,
			this.state._fifthVerse
		]);

		this.setState({
			translator: "",
			_firstVerse: "",
			_secondVerse: "",
			_thirdVerse: "",
			_fourthVerse: "",
			_fifthVerse: ""
		});
	};

	render() {
		return (
			<form className="form-underlined" onSubmit={this.handleSubmit}>
				<div className="form-section">
					<h4> Translator </h4>
					<div className="form-group">
						<input
							type="text"
							name="translator"
							value={this.state.translator}
							onChange={this.handleInputChange}
						/>
						<span> {50 - this.state.translator.length} </span>
					</div>
				</div>
				<div className="form-section">
					<h4> Verses </h4>
					<div className="form-group">
						<input
							type="text"
							name="_firstVerse"
							placeholder="In Naniwa Bay"
							value={this.state._firstVerse}
							onChange={this.handleInputChange}
						/>
						<span> {50 - this.state._firstVerse.length} </span>
					</div>
					<div className="form-group">
						<input
							type="text"
							name="_secondVerse"
							placeholder="now the flowers are blossoming"
							value={this.state._secondVerse}
							onChange={this.handleInputChange}
						/>
						<span> {50 - this.state._secondVerse.length} </span>
					</div>
					<div className="form-group">
						<input
							type="text"
							name="_thirdVerse"
							placeholder="After lying dormant all winter"
							value={this.state._thirdVerse}
							onChange={this.handleInputChange}
						/>
						<span> {50 - this.state._thirdVerse.length} </span>
					</div>
					<div className="form-group">
						<input
							type="text"
							name="_fourthVerse"
							placeholder="now the spring has come"
							value={this.state._fourthVerse}
							onChange={this.handleInputChange}
						/>
						<span> {50 - this.state._fourthVerse.length} </span>
					</div>
					<div className="form-group">
						<input
							type="text"
							name="_fifthVerse"
							placeholder="and the flowers are blossoming"
							value={this.state._fifthVerse}
							onChange={this.handleInputChange}
						/>
						<span> {50 - this.state._fifthVerse.length} </span>
					</div>
				</div>
				<input type="submit" value="Submit" className="btn brick" />
			</form>
		);
	}
}

const mapStateToProps = (state, intrinsic) => ({
	poem: getPoem(state, intrinsic.match.params.id)
});

PoemDetail = withRouter(connect(mapStateToProps)(PoemDetail));

export default PoemDetail;

/*
Notes:
	[1]: Not setting default { poem } because returned prop value from mapStateToProps 
		 overrides default props 
		 https://stackoverflow.com/questions/46379467/react-default-props-are-ignored
*/
