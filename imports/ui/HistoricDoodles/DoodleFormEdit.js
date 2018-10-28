import React from 'react';
import { Link } from 'react-router-dom';

import { doodles } from '../../api/doodles';

import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';

class DoodleFormEdit extends React.Component{

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
    if (parrafo && title && date) {
      Meteor.call('doodles.update', this.props.id, title, parrafo, date, (err, res) => {
        if (err) {
          this.setState({ success: 'Hubo un error. No se pudo editar el hito. :(' });
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
    }

  }
  render(){
    return (
      <div>
        <Navbar/>
        <br/>
        <br/>
        <div className="container">
        {this.state.success ? <div className="alert alert-success" role="alert">{this.state.success}</div> : undefined}
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="row">
          <div className="form-group col-9">
            <label className="subtitles">Titulo</label>
            <input type="text" className="form-control" ref='title' name='title' defaultValue={this.props.title} aria-describedby="titleHelp" placeholder="Enter Title" required />
          </div>
          <div className="form-group col-3">
                <label className="subtitles">Fecha</label>
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
            <label className="subtitles">Contenido</label>
            <textarea className="form-control" rows="5" ref="parrafo" defaultValue={this.props.parrafo}></textarea>
          </div>
          <button type="submit" className="btn btn-primary btn-lg float-right">Editar</button>
        </form>
        </div>
        <br/>
        <br/>
        <br/>
        <Footer/>
      </div>
    );
  }
}

export default DoodleFormEdit;
