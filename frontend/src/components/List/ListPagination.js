import React from "react";
import { inject, observer } from "mobx-react";
import { pagination } from "./../../config/constants";

let ListPagination = ({ poems }) => (
	<section>
		<span>{"<"}</span>
		{pagination.map(pageNum => (
			<button
				key={`${pageNum}`}
				onClick={() => poems.setPageRange(pageNum)}>
				{pageNum}
			</button>
		))}
		<span>{">"}</span>
	</section>
);

ListPagination = inject(provider => ({
	poems: provider.store.list
}))(observer(ListPagination));

export { ListPagination };
