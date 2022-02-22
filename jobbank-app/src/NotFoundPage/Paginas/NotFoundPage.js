import React from 'react';
import NotFoundPageNav from "../Componentes/Navegador/NotFoundPageNav";
import NotFoundPageMain from "../Componentes/NotFoundPageMain/NotFoundPage"
import NotFoundPageFooter from "../Componentes/Footer/NotFoundPageFooter"
import NotFoundPageSectionFooter from "../Componentes/Section-footer/NotFoundPageSection"

function NotFoundPage() {
	return (
		<div className='NotFoundPage'>
			<NotFoundPageNav />
      <NotFoundPageMain />
      <NotFoundPageFooter />
			<NotFoundPageSectionFooter />
		</div>
	);
}

export { NotFoundPage };
