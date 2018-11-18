import React from 'react';
import { Link } from 'react-router-dom';

import { doodles } from '../../api/doodles';

import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';

class DoodleFormEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      success: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();
    console.log('id ' + this.props.id + ' user ' + Meteor.userId());
    let parrafo = this.refs.parrafo.value.trim();
    let title = this.refs.title.value.trim();
    let date = this.refs.date.value.trim();
    let tipo = this.refs.tipo.value.trim();
    if (parrafo && title && date && tipo) {
      console.log('entro con ' + parrafo + title + date + tipo);
      Meteor.call('doodles.update', this.props.id, title, parrafo, date, tipo, (err, res) => {
        if (err) {
          this.setState({ success: 'Hubo un error. No se pudo editar el hito :(' });
        }
        else {
          this.setState({ success: 'Ha editado correctamente un hito. Felicitaciones!' });
          this.props.changeEditForm(false);
          this.props.setDoodleEdit(null);
        }
      });
      this.refs.parrafo.value = '';
      this.refs.title.value = '';
      this.refs.date.value = '';
      this.refs.tipo.value = '';
    }
  }

  cancelEdit(e) {
    e.preventDefault();
    this.props.changeEditForm(false);
    this.props.setDoodleEdit(null);
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
                <label className="rostext">Titulo</label>
                <input type="text" className="form-control" ref='title' name='title' defaultValue={this.props.title} aria-describedby="titleHelp" placeholder="Enter Title" required />
              </div>
              <div className="form-group col-3">
                <label className="rostext">Fecha</label>
                <input
                  className="form-control"
                  type="date"
                  defaultValue={this.props.date}
                  name="fechaIngreso"
                  ref='date'
                />
              </div>
            </div>
            <div className="form-group">
              <label className="rostext">Tipo</label>
              <select className="custom-select my-1 mr-sm-2" ref="tipo" defaultValue={this.props.type}>
                <option value="Uniandes" >Uniandes</option>
                <option value="Comunidad" >Comunidad</option>
              </select>
            </div>
            <div className="form-group">
              <label className="rostext">Contenido</label>
              <textarea className="form-control" rows="5" ref="parrafo" defaultValue={this.props.parrafo}></textarea>
            </div>
            <div className="float-right">
              <button type="submit" className="btn btn-primary btn-lg coll">Editar</button>
              {' '}
              <button onClick={(e) => this.cancelEdit(e)} className="btn btn-primary btn-lg coll">Cancelar</button>
            </div>
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

export default DoodleFormEdit;
