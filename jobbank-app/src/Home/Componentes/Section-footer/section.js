import "./section.css"
import CodeIcon from '@mui/icons-material/Code';

function SectionAfterFooter () {
  return (
    <section id="copyright" className="padding">
    <div className="container">
      <div className="row justify-content-between">
        <ul className="list-group list-group-horizontal align-items-center">
          <li className="list-group-item">
            <img src="https://holberton-peru.com/storage/media/3rXHgQvQ8LqvY4ClnG2ncJgBrnufN3NRDDRvuCFB.png" alt="logo" />
          </li>
          <li className="list-group-item">
            Copyright © 
            <a href="https://holberton-peru.com"> Holberton</a> 2022. All rights reserved.
          </li>
        </ul>
        <ul className="list-group list-group-vertical align-items-center justify-content-center">
          <li className="list-group-item text">
            
          <CodeIcon sx={{mr: "0px", mb: "2px"}}/> Hecho por
            <a href="https://www.linkedin.com/in/jhonatanjc/"> Jhonatan Jauja </a>
             y 
            <a href="https://www.linkedin.com/in/kennyreyessan/"> Kenny Reyes</a>
          </li>
          <li className="list-group-item text">
            estudiantes de la Cohorte #14 <CodeIcon sx={{mr: "0px", mb: "2px"}}/>
          </li>
        </ul>
        <ul className="list-group list-group-horizontal align-items-center">
          <li className="list-group-item">
            <a href="https://holberton-peru.com/manual-de-conducta" target="_self"> Manual de Conducta </a>
          </li>
          <li className="list-group-item">
            <a href="https://holberton-peru.com/politica-de-privacidad" target="_self"> Políticas de Privacidad</a>
          </li>
        </ul>
      </div>
    </div>
    </section>
  );
};

export default SectionAfterFooter;