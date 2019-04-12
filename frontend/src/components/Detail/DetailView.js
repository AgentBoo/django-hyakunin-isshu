import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { Link } from "react-router-dom";
import { Header, Main } from "./../toolbox";
import { DetailControls as Controls } from "./DetailControls";
import { DetailOriginal as Original } from "./DetailOriginal";
import { DetailTranslations as Translations } from "./DetailTranslations";

function poemInRange(id) {
	return 0 < id && id <= 100;
}

class DetailView extends Component {
	constructor(props) {
		super(props);
		// params.id is a string and must be cast
		// to a number to do arithmetics
		this.id = +props.match.params.id;
	}

	componentDidMount() {
		const poems = this.props.data.collection;

		if (poems.length) {
			this.selectPoem(this.id);
		} else {
			const { data: store } = this.props;
			store
				.retrieve("poems")
				.then(resjson => store.setCollection(resjson))
				.then(_ => this.selectPoem(this.id));
		}
	}

	componentDidUpdate(prevProps) {
		const currId = this.props.match.params.id;
		const prevId = prevProps.match.params.id;

		if (currId !== prevId) {
			this.id = +currId;
			this.selectPoem(currId);
		}
	}

	selectPoem = id => {
		if (poemInRange(id)) {
			const { data: store, detail } = this.props;

			detail.select(id);
			store
				.retrieve("poem", { id })
				.then(resjson => store.extendPoem(resjson, id));
		}
	};

	render() {
		if (poemInRange(this.id)) {
			const { path } = this.props.match;
			const { poem } = this.props.detail;

			/*
			Keys must be declared explicitely for both <Original /> 
			and <Translations />, because react-spring transitions 
			compare component keys (not just props) to observe 
			changes that will trigger transitions. (Not in the docs) 

			Poem.translations is an observable array and must be converted 
			to a JS datastructure using mobx `toJS` or mobx-serializr. See 
			https://stackoverflow.com/a/51704058
			*/

			return (
				<Fragment>
					<Header />
					<Main>
						<Original key={poem.id} poem={toJS(poem)} />
						<Translations
							key={poem.author}
							translations={toJS(poem.translations)}
						/>
						<Link to="/">go back</Link>
					</Main>
					<Controls id={this.id} path={path} />
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					<p>Poem could not be found</p>
					<Link to="/">go back</Link>
				</Fragment>
			);
		}
	}
}

DetailView = inject(provider => ({
	data: provider.store.data,
	detail: provider.store.detail
}))(observer(DetailView));

export { DetailView };
