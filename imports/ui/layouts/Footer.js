import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component{
  // Zulma Castañeda: Hay varias formas de crear un sticky footer, les dejo aqui una guia para que puedan implementarlo https://css-tricks.com/couple-takes-sticky-footer/
  render(){
    return (
      <div className="mt-auto">
      <footer className="page-footer navcolorback">
        <div className="footer-copyright text-center py-3">
        <span className='ctext'>
          © 2018 Copyright: Derechos Reservados Universidad de los Andes
        </span>
        </div>

      </footer>
      </div>
      );
  }
}

export default Footer;
