import React, { Component } from "react";
import { Context } from "./Provider";
import { observer } from "mobx-react";
// components
import { Poem } from "./Poem";

class Poems extends Component {
	static contextType = Context;
	render() {
		const { poems } = this.context;
		return (
			<section>
				{poems.list.map((p, idx) => (
					<Poem
						key={p.author}
						poem={p}
						index={idx}
						link={`/${idx}/`}
					/>
				))}
			</section>
		);
	}
}

Poems = observer(Poems);

export { Poems };
