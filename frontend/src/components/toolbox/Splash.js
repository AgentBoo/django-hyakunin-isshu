import React from "react";
import { inject, observer } from "mobx-react";

let Splash = ({ show }) => {
	return <div>{show && <h1>Loading...</h1>}</div>;
};

Splash = inject(provider => ({
	show: provider.store.data.init
}))(observer(Splash));

export { Splash };
