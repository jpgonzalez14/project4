import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';

class About extends React.Component{
  componentDidMount(){
    document.body.background = '';
    document.body.style.backgroundRepeat = '';
    document.body.style.backgroundSize = '';
  }


  render(){
    return (
      <div>
      <Navbar/>
      <br/>
      <div className="container testh">
      <div className="container">
      <br/>
            <h1 className="card-title title fz1">
              ¡Toda la informacion sobre hitos Uniandes la encontraras aquí!
            </h1>
            <br/>
            <div className="row">
              <div className="col-sm-12 col-lg-6">
              <img className="card-img-top" src="3.jpg" alt="Card image cap" />
              </div>
              <div className="col-sm-12 col-lg-6">
                <h3 className="rostext">¿Qué es hitos Uniandes?</h3>
                <br/>
                <p className="card-text">
                  Hitos Uniandes es un espacio creado por la Oficina
                  de Construcción de Comunidad y   (créditos estudiantes)
                  para visibilizar la investigación sobre algunos
                  hitos históricos de Uniandes, en los que se ha
                  identificado la presencia de distintos miembros
                  de la comunidad uniandina y cuyos resultados han
                  impactado de manera positiva al país.
                  <br/>
                  <br/>
                  Esta plataforma permite consultar diferentes momentos
                  históricos para la Universidad y aportar en la
                  construcción de nuevos hitos a partir de los recuerdos,
                  las experiencias y la memoria colectiva de los
                  miembros de la comunidad uniandina.
                </p>
                </div>
              </div>
              <br/>
              <br/>
              <div className="row">
              <div className="col-sm-12 col-lg-6">
                <h3 className="rostext">¿Qué categorias de hitos hay?</h3>
                <br/>
                <p className="card-text">
                  Hitos uniandes cuenta con dos tipos de hitos, el primero es
                  Hitos Uniandes que muestra un recuento histórico de los
                  eventos más importantes que ha hecho la universidad.
                  <br/>
                  <br/>
                  Por otro lado, tenemos Hitos Comunidad.
                  Este es un espacio que se da a los estudiantes para que
                  den a conocer sus momentos, hechos y/o vivencias más
                  importantes que han tenido dentro de la comunidad uniandina.
                </p>
                </div>
                <div className="col-sm-12 col-lg-6">
                <img className="card-img-top" src="ml.jpg" alt="Card image cap" />
                </div>
              </div>
      </div>
      </div>
      <br/>
      <br/>
      <Footer/>
      </div>
    );
  }
}

export default About;
