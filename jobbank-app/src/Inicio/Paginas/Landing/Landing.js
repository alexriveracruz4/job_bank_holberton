import React from 'react';
import LoginButton from '../../Componentes/LoginButton';
import Profile from '../../Componentes/Porfile';
import { useAuth0 } from "@auth0/auth0-react";
import Loader from '../../../helpers/Loader';


function Landing() {
	const { isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
    return <Loader/>
  }

	return (
		<div className='Landing'>
			{isAuthenticated ? "" : <LoginButton />}
			<Profile/>
		</div>
	);
}

export { Landing };
