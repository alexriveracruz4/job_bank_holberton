import React from 'react';
import HomeNav from "../Componentes/Navegador/HomeNav";
import Main from "../Componentes/Main/Main"
import HomeFooter from "../Componentes/Footer/HomeFooter"

function Home() {
	return (
		<div className='Home'>
			<HomeNav />
      <Main />
      <HomeFooter />
		</div>
	);
}

export { Home };
