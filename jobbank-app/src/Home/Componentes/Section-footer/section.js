import "./section.css"

function SectionAfterFooter () {
  return (
    <section id="copyright" class="padding">
    <div class="container">
      <div class="row justify-content-between">
        <ul class="list-group list-group-horizontal align-items-center">
          <li class="list-group-item">
            <img src="https://holberton-peru.com/storage/media/3rXHgQvQ8LqvY4ClnG2ncJgBrnufN3NRDDRvuCFB.png" alt="logo" />
          </li>
          <li class="list-group-item">
            Copyright © 
            <a href="https://holberton-peru.com"> Holberton</a> 2022. All rights reserved.
          </li>
        </ul>
        <ul class="list-group list-group-horizontal align-items-center">
          <li class="list-group-item">
            <a href="https://holberton-peru.com/manual-de-conducta" target="_self"> Manual de Conducta </a>
          </li>
          <li class="list-group-item">
            <a href="https://holberton-peru.com/politica-de-privacidad" target="_self"> Políticas de Privacidad</a>
          </li>
        </ul>
      </div>
    </div>
    </section>
  );
};

export default SectionAfterFooter;