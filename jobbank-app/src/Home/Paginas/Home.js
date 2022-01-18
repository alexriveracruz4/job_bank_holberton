import React from 'react';
import HomeNav from "../Componentes/Navegador/HomeNav";
import Main from "../Componentes/Main/Main"
import HomeFooter from "../Componentes/Footer/HomeFooter"
import SectionAfterFooter from "../Componentes/Section-footer/section"

function Home() {
	return (
		<div className='Home'>
			<HomeNav />
      <Main />
      <HomeFooter />
			<SectionAfterFooter />
		</div>
	);
}

export { Home };
