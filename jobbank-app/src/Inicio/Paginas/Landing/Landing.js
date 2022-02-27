import React from 'react';
import LoginButton from '../../Componentes/LoginButton';
import Profile from '../../Componentes/Porfile';
import { useAuth0 } from "@auth0/auth0-react";

function Landing() {
	const { isAuthenticated } = useAuth0();

	return (
		<div style={{ 
			background: "#bf013d", 
			backgroundSize: "cover", 
			position: "fixed",
			top: 0,
			width: "100%",
			height: "100%",}}
		>
		<LoginButton />
		<Profile/>
		</div>
	);
}

export { Landing };
