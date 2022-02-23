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
			<a href="https://wa.me/51923898366?text=Hola, necesito información"
			target="_blank"
			style={{position: "fixed", right: "30px", bottom: "30px", height: "auto", width: "auto", background: "#25D366", padding: "12.5px", borderRadius: "50px", zIndex: "199"}}>
				<svg xmlns="http://www.w3.org/2000/svg" version="1" width="35" height="35" viewBox="0 0 90 90">
					<path d="M90 44a44 44 0 0 1-66 38L0 90l8-24A44 44 0 0 1 46 0c24 0 44 20 44 44zM46 7C25 7 9 24 9 44c0 8 2 15 7 21l-5 14 14-4a37 37 0 0 0 58-31C83 24 66 7 46 7zm22 47l-2-1-7-4-3 1-3 4h-3c-1 0-4-1-8-5-3-3-6-6-6-8v-2l2-2 1-1v-2l-4-8c0-2-1-2-2-2h-2l-3 1c-1 1-4 4-4 9s4 11 5 11c0 1 7 12 18 16 11 5 11 3 13 3s7-2 7-5l1-5z" fill="#FFF"></path>
				</svg>
			</a>
		</div>
	);
}

export { DescripcionEstudiante };