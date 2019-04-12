import React, { Fragment } from "react";
import { Header, Navigation, Main } from "./../toolbox";
import { ListSearchForm as SearchForm } from "./ListSearchForm";
import { ListPagination as Pagination } from "./ListPagination";
import { ListPoems as Poems } from "./ListPoems";

const ListView = () => (
	<Fragment>
		<Header>
			<Navigation />
		</Header>
		<Main>
			<SearchForm />
			<Pagination />
			<Poems />
		</Main>
	</Fragment>
);

export { ListView };
