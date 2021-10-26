import React, { useEffect } from 'react'
import Cookies from 'universal-cookie';


const cookies = new Cookies();

function PuestoEliminado() {

  useEffect(() => {
      if (!cookies.get('id')){
          window.location.href="/login/empresa";
      }
  });

  return (
    <div>
      Has eliminado el puesto de trabajo
    </div>
  )
}

export { PuestoEliminado };
