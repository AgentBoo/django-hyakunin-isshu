import React from "react";
import { SearchForm } from "./SearchForm";
import { Poems } from "./Poems";
import { Pagination } from "./Pagination";

const List = () => (
	<main>
		<SearchForm />
		<Poems />
		<Pagination />
	</main>
);

export { List };
