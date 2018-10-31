import React from 'react';
import { Link } from 'react-router-dom';

import { doodles } from './../../api/doodles';

import Navbar from './../layouts/Navbar';
import Footer from './../layouts/Footer';

class DoodleForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      success: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();
    let parrafo = this.refs.parrafo.value.trim();
    let title = this.refs.title.value.trim();
    let date = this.refs.date.value.trim();
    let tipo = this.refs.tipo.value.trim();
    
    //Andrés Felipe López: Si se envía el formulario con algún campo vacío, no hay feedback para el usuario, solo no pasa nada.
    //Deberían mostrar un mensaje avisando lo que pasa y mostrando lo que falta por llenar en caso de que no entre al if.
    if (parrafo && title && date) {
      Meteor.call('doodles.insert', title, parrafo, date, tipo, (err, res) => {
        if (err)
          this.setState({ success: 'Hubo un error. No se pudo crear el hito. :(' });
        else
          this.setState({ success: 'Ha creado correctamente un hito. Felicitaciones!' });
      })
      this.refs.parrafo.value = '';
      this.refs.title.value = '';
      this.refs.date.value = '';
      this.refs.tipo.value = '';
    } else {
      alert('Debes llenar el título, el contenido y la fecha!');

  }
  render() {
    return (
      <div>
        <Navbar />
        <br />
        <br />
        <div className="container testh">
          {this.state.success ? <div className="alert alert-success" role="alert">{this.state.success}</div> : undefined}
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="row">
              <div className="form-group col-9">
                <label className="subtitles">Titulo</label>
                <input type="text" className="form-control" ref='title' name='title' aria-describedby="titleHelp" placeholder="Enter Title" required />
              </div>
              <div className="form-group col-3">
                <label className="subtitles">Fecha</label>
                <input
                  className="form-control"
                  type="date"
                  name="fechaIngreso"
                  ref='date'
                />
              </div>
            </div>
            <div className="form-group">
              <label className="subtitles">Tipo</label>
              <select className="custom-select my-1 mr-sm-2" ref="tipo">
                <option value="Uniandes">Uniandes</option>
                <option value="Comunidad">Comunidad</option>
              </select>
            </div>
            <div className="form-group">
              <label className="subtitles">Contenido</label>
              <textarea className="form-control" rows="5" ref="parrafo"></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-lg float-right coll">Crear</button>
          </form>
        </div>
        <br />
        <br />
        <br />
        <Footer />
      </div>
    );
  }
}

export default DoodleForm;
