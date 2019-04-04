import React from "react";
import { observer } from "mobx-react";
import { store } from "./App";

export const Detail = observer(props => (
	<div>
		<p> Poem Detail </p>
		<p>
			{store.collection.length &&
				store.collection[props.match.params.id].jap.author}
		</p>
		<button onClick={() => props.history.goBack()}>go back</button>
	</div>
));
