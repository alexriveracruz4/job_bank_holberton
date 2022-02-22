import React from 'react';
import HomeNav from "../Componentes/Navegador/HomeNav";
import HomeFooter from "../Componentes/Footer/HomeFooter"
import SectionAfterFooter from "../Componentes/Section-footer/section"
import MainEstudiante from '../Componentes/MainEstudiante/MainEstudiante';

function DescripcionEstudiante() {
	return (
		<div className='Home' style={{backgroundColor: "#DF003C"}}>
			<HomeNav />
      <MainEstudiante />
      <HomeFooter />
			<SectionAfterFooter />
		</div>
	);
}

export { DescripcionEstudiante };