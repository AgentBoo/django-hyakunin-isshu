import React from "react";
import { inject, observer } from "mobx-react";
import styles from "./../../../config/styles";
import Loader from "react-loader-spinner";
import { SplashContainer, SplashTitle } from "./Splash.styled";

let Splash = ({ show, status }) => {
	return (
		<SplashContainer fullSize={show || status === "rejected"}>
			<Loader
				type="Grid"
				color={styles.light.accent}
				height="100"
				width="100"/>
			{show && <SplashTitle>Loading...</SplashTitle>}
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
