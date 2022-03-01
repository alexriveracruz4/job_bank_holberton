import React from 'react';
import swal from 'sweetalert';

const Message = () => {
  swal({
    title: "Conexión Fallida",
    text: `Por favor inténtelo de nuevo.`,
    icon: "warning",
});
  return (
    <div>
      <h2> </h2>
    </div>
  ); 
}
export default Message;