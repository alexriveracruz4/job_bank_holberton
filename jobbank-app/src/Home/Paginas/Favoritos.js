import React from 'react';
import HomeNav from "../Componentes/Navegador/HomeNav";
import HomeFooter from "../Componentes/Footer/HomeFooter"
import SectionAfterFooter from "../Componentes/Section-footer/section"
import MainFavoritos from '../Componentes/Favoritos/MainFavoritos';

function Favoritos() {
	return (
		<div className='Home' style={{backgroundColor: "#DF003C"}}>
			<HomeNav />
      <MainFavoritos />
      <HomeFooter />
			<SectionAfterFooter />
		</div>
	);
}

export { Favoritos };
