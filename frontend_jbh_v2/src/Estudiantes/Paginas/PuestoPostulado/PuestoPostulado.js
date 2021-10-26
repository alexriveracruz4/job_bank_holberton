import React, { useEffect } from 'react'
import Cookies from 'universal-cookie';


const cookies = new Cookies();

function PuestoPostulado() {

  useEffect(() => {
      if (!cookies.get('id')){
          window.location.href="/login/estudiante";
      }
  });

  return (
    <div>
      Has postulado a este trabajo
    </div>
  )
}

export { PuestoPostulado };
