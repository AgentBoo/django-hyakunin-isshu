import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Poem } from "./../toolbox";

class ListPoems extends Component {
	render() {
		return (
			<section className="poems">
				{this.props.poems.list.map((p, idx) => (
					<Poem 
						key={p.author} 
						poem={p} 
						link={`/${p.numeral}/`} />
				))}
			</section>
		);
	}
}

ListPoems = inject(provider => ({
	data: provider.store.data,
	poems: provider.store.list
}))(observer(ListPoems));

export { ListPoems };
