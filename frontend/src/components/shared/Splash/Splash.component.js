import React from "react";
import { inject, observer } from "mobx-react";
import { SplashContainer, SplashTitle } from "./Splash.styled";

let Splash = ({ show, status }) => {
	return (
		<SplashContainer fullSize={show || status === "rejected"}>
			{show && (
				<SplashTitle>Loading...</SplashTitle>
			)}
			{status === "rejected" && (
				<SplashTitle>Something went wrong with our server</SplashTitle>
			)}
		</SplashContainer>
	);
};

Splash = inject(provider => ({
	show: provider.store.dataStore.init,
	status: provider.store.dataStore.status
}))(observer(Splash));

export { Splash };
