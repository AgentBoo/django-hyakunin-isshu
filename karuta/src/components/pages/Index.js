// @flow
// react
import React, { Component } from "react";
// redux
import { connect } from "react-redux";
import { getPoems, getIsFetching } from "./../../store/selectors";
// router
import { Route, NavLink, Link } from "react-router-dom";
import type { Match } from "react-router";
// components
import { animateScroll as scroll } from "react-scroll";
import NotFound from "./NotFound";
import FocalPage from "./../sections/FocalPage";
import Card from "./../subcomponents/Card";
import ScrollControl from "./../subcomponents/ScrollControl";

/* INDEX VIEW */

// utility

const isTranslatedRoute = (route: Match) => {
	const { locale } = route.params;

	if (typeof locale === "undefined") {
		return true;
	}

	return ["jap", "rom", "eng"].reduce(
		(acc, lang) => (locale === lang ? (acc = true) : acc),
		false
	);
};

// component

type Poem = {
	id: number,
	[string]: {
		author: string,
		verses: string[]
	}
};

type Props = {
	poems: Array<Poem>,
	match: Match
};

type State = {
	grid: string
};

class PoemList extends Component<Props, State> {
	static defaultProps = {
		poems: []
	};

	props: Props;
	state: State;

	constructor(props: Props) {
		super(props);
		this.state = {
			grid: "focal-page-main cards"
		};
	}

	componentDidMount() {
		// [1] note
		// on route switch, scroll to the top of the page
		window.scrollTo(0, 0);
	}

	scrollDown = () =>
		scroll.scrollMore(1600, {
			duration: 1600,
			delay: 50,
			smooth: "easeInOutCubic"
		});

	scrollUp = () =>
		scroll.scrollMore(-1600, {
			duration: 1600,
			delay: 50,
			smooth: "easeInOutCubic"
		});

	handleGridSwitch = (gridType = "") =>
		this.setState({
			grid: `focal-page-main cards ${gridType}`
		});

	renderPoems = (N = 100) =>
		this.props.poems
			.slice(0, N)
			.map(poem => (
				<Card
					key={poem.id}
					locale={this.props.match.params.locale || "jap"}
					poem={poem}
				/>
			));

	render() {
		let poems = this.renderPoems(20);

		// filter out anything that is not a language localized route
		if (!isTranslatedRoute(this.props.match)) {
			return <Route component={NotFound} />;
		}

		return (
			<FocalPage>
				<header className="focal-page-header">
					<h1 className="focal-page-title"> Ogura Hyakunin Isshu </h1>
					{/* Language switches */}
					<nav className="focal-page-nav">
						{/* prettier-ignore */}
						<NavLink 
							className="link nav-lang" 
							to="/jap">
							Japanese
						</NavLink>
						{/* prettier-ignore */}
						<NavLink 
							className="link nav-lang" 
							to="/rom">
							Romanji
						</NavLink>
						{/* prettier-ignore */}
						<NavLink 
							className="link nav-lang" 
							to="/eng">
							English
						</NavLink>
					</nav>
				</header>

				{/* Language switches */}
				<aside className="btn-group aside-lang">
					{/* prettier-ignore */}
					<NavLink 
						activeClassName="link active"
						className="link" 
						to="/jap">
						J
					</NavLink>
					{/* prettier-ignore */}
					<NavLink 
						activeClassName="link active"
						className="link" 
						to="/rom">
						R
					</NavLink>
					{/* prettier-ignore */}
					<NavLink 
						activeClassName="link active"
						className="link" 
						to="/eng">
						E
					</NavLink>
				</aside>

				<ScrollControl>
					<ScrollControl.Button
						label={<i className="fas fa-long-arrow-alt-up" />}
						onClick={this.scrollUp}
					/>
					<ScrollControl.Button
						label={<i className="fas fa-long-arrow-alt-down" />}
						onClick={this.scrollDown}
					/>
					<ScrollControl.Button
						label="I"
						onClick={() => this.handleGridSwitch("grid-1")}
					/>
					<ScrollControl.Button
						label="II"
						onClick={() => this.handleGridSwitch("grid-2")}
					/>
					<ScrollControl.Button
						label="IIII"
						onClick={() => this.handleGridSwitch("grid-4")}
					/>
					<ScrollControl.Button
						label={<i className="fas fa-th" />}
						onClick={this.handleGridSwitch}
					/>
					<Link to='/about' className='btn round'>
						<i className="fas fa-question" />
					</Link>
				</ScrollControl>

				{/* 100 poems */}
				<main className={this.state.grid}>{poems}</main>
			</FocalPage>
		);
	}
	// end component
}

const mapStateToProps = (state, intrinsic) => ({
	poems: getPoems(state, intrinsic.match.params.locale),
	isFetching: getIsFetching(state)
});

PoemList = connect(mapStateToProps)(PoemList);

export default PoemList;

/*
Notes:
	[1]: <Component onScroll={} /> does not seem to work, so an alternative would be 
		 `window.addEventListener('scroll', this.handleScroll)`
*/
