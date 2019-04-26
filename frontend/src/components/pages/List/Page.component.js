import React, { Fragment } from "react";
import { Header, Localization, Main } from "./../../shared";
import { SearchForm } from "./SearchForm.component";
import { ResultBar } from "./ResultBar.component";
import { Poems } from "./Poems.component";
import { Pagination } from "./Pagination.component";

const ListPage = () => (
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

export default ListPage;
