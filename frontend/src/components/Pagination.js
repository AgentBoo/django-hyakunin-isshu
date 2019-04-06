import React, { Component } from "react";
import { Context } from "./Provider";
import { observer } from "mobx-react";

class Pagination extends Component {
	static contextType = Context;
	render() {
		const { poems } = this.context;
		return (
			<div>
				{poems.pagination.map((_, i) => (
					<button key={i} onClick={() => poems.setPage(i)}>
						Page{i}
					</button>
				))}
			</div>
		);
	}
}

Pagination = observer(Pagination);

export { Pagination };
