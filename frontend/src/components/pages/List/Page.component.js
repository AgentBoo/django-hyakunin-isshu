import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import { Header, Localization, Main } from "./../../shared";
import { SearchForm } from "./SearchForm.component";
import { ResultBar } from "./ResultBar.component";
import { Poems } from "./Poems.component";
import { Pagination } from "./Pagination.component";

class ListPage extends Component {
	componentDidMount() {
		const datastoreIsEmpty = this.props.datastore.isEmpty;

		if (datastoreIsEmpty) {
			const { datastore } = this.props;

			datastore
				.retrieve("poems")
				.then(resjson => this.props.datastore.setCollection(resjson));
		}
	}

	render() {
		return (
			<Fragment>
				<Header>
					<SearchForm />
					<Localization />
				</Header>
				<Main>
					<ResultBar />
					<Poems />
					<Pagination />
				</Main>
			</Fragment>
		);
	}
}

ListPage = inject(provider => ({
	datastore: provider.store.dataStore
}))(observer(ListPage));

export default ListPage;
