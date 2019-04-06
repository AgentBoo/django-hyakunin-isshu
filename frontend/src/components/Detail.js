import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Poem } from "./Poem";
import { store } from "./App";

/* 
Use context through Context.Consumer because using `static contextType`
creates a circular dependency in the App's direct child, making this.context 
always undefined (that is, if you insist on setting up the provider in the 
App.js instead of index.js or anywhere else)
https://github.com/facebook/react/issues/13969#issuecomment-474373021
*/

class Detail extends Component {
	componentDidMount() {
		this.selectPoem();
	}

	componentDidUpdate(prevProps) {
		if (this.props.match.params.index !== prevProps.match.params.index) {
			this.selectPoem();
		}
	}

	selectPoem = () => store.poem.setSelected(this.props.match.params.index);

	render() {
		const { params, path } = this.props.match;
		// params.index is a string and must be cast to number
		const index = +params.index;

		const poem = store.poem.detail;
		const complement = store.poem.complement;

		return (
			<div>
				<p>Poem Detail</p>
				<div>
					{store.data.collection.length && (
						<div>
							<div>
								{poem.jap.author} | {poem.rom.author} |{" "}
								{poem.eng.author}
							</div>
							<Poem poem={poem.jap} />
							<Poem poem={poem.rom} />
							<Poem poem={poem.eng} />
						</div>
					)}
				</div>
				<Link to="/">go back</Link>
				{params.index !== 0 && (
					<Link to={`${path.replace(":index", +params.index - 1)}`}>
						previous
					</Link>
				)}
				{params.index !== store.data.collection.length && (
					<Link to={`${path.replace(":index", +params.index + 1)}`}>
						next
					</Link>
				)}
			</div>
		);
	}
}

Detail = observer(Detail);

export { Detail };
