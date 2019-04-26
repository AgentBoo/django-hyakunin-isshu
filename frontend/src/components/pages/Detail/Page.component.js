import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import { Redirect } from "react-router-dom";
import { Header, Main } from "./../../shared";
import { Panels } from "./Panels.component";

function poemInRange(id) {
	return 0 < id && id <= 100;
}

class DetailPage extends Component {
	componentDidMount() {
		const datastoreIsEmpty = this.props.datastore.isEmpty;
		const poemId = this.props.match.params.id;
		
		if (datastoreIsEmpty) {
			const { datastore } = this.props;

			datastore
				.retrieve("poems")
				.then(resjson => datastore.setCollection(resjson))
				.then(_ => this.selectPoem(poemId));
		} else {
			this.selectPoem(poemId);
		}
	}

	componentDidUpdate(prevProps) {
		const currId = this.props.match.params.id;
		const prevId = prevProps.match.params.id;

		if (currId !== prevId) {
			this.selectPoem(currId);
		}
	}

	selectPoem = id => {
		if (poemInRange(id)) {
			const { store, datastore } = this.props;
			store.select(id);

			datastore
				.retrieve("poem", { id })
				.then(resjson => datastore.extendPoem(resjson, id));
		}
	};

	render() {
		// params.id is a string and must be cast
		// to a number to do arithmetics
		const poemId = +this.props.match.params.id;

		if (poemInRange(poemId)) {
			return (
				<Fragment>
					<Header />
					<Main>
						<Panels id={poemId} path={this.props.match.path} />
					</Main>
				</Fragment>
			);
		} else {
			return <Redirect to="/not-found/" />;
		}
	}
}

DetailPage = inject(provider => ({
	store: provider.store.detailStore,
	datastore: provider.store.dataStore
}))(observer(DetailPage));

export default DetailPage;
