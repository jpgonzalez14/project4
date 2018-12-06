import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from './../layouts/Navbar';
import Footer from './../layouts/Footer';

class Doodle extends React.Component{
  parseDate(strDate) {
    let date = strDate.split('-');
    let year = date[0];
    let month = this.parseMonth(parseInt(date[1]));
    let day = date[2];
    return `${day} de ${month} de ${year}`;
  }

  parseMonth(month) {
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return months[month - 1];
  }
  render(){
    var textarea = this.props.location.state.value.parrafo.replace(/\r\n/g, "<br>");
    console.log(textarea);
    return (
      <div>
      <Navbar/>
        <div className="container testh">
        <br/>
        <Link to="/"><h4 className="rostext1">{'< Regresar'}</h4></Link>
          <div className="row">
            <div className="col-sm-12 col-lg-4">
              <br/>
              <br/>
              <img className="card-img-top" src={this.props.location.state.value.img} alt="Card image cap" />
              <br/>
            </div>
            <div className="col-sm-12 col-lg-8">
              <h1 className="card-title title fz">
              {this.props.location.state.value.title}
              </h1>
              <h5 className="rostext"><small className="padd">{this.parseDate(this.props.location.state.value.date)}</small></h5>
              <p className="textareatest">
              {this.props.location.state.value.parrafo}
              </p>
            </div>
          </div>
        </div>
      <Footer/>
      </div>
    );
  }
}

export default Doodle;
