import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import DoodleFormEdit from './DoodleFormEdit';

class DoodleBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editForm: false
    }
  }

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

  removeDoodle(e) {
    e.preventDefault();
    console.log(this.props.id);
    Meteor.call('doodles.remove', this.props.id);
  }

  editDoodle(e) {
    e.preventDefault();
    this.props.setDoodleEdit(this.props.id);
    this.props.changeEditForm(true);
  }


  render() {
    console.log(this.props);
    if (this.props.type === 'Uniandes') {
      return (
        <div className="card hitbox">
          <Link to={{pathname: '/doodle',state: { value: this.props }}}><img className="card-img-top" src="http://placehold.it/400x300" alt="Card image cap" /></Link>
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">
              <small className="rostext">
                {this.parseDate(this.props.date)}
              </small>
              <a href="#" className="badge badge-warning float-right">
                {this.props.type}
              </a>
            </h6>
            <Link to={{pathname: '/doodle',state: { value: this.props }}}><h5 className="card-title title">{this.props.title}</h5></Link>
            <div className='float-right'>
            <button hidden={!this.props.editable} onClick={(e) => this.editDoodle(e)} className='btn btn-success btn-sm coll'>Editar</button>
            {' '}
            <button hidden={!this.props.editable} onClick={(e) => this.removeDoodle(e)} className='btn btn-danger btn-sm coll'>Eliminar</button>
            </div>
          </div>
        </div>
      );
    }else {
      return (
        <div className="card hitbox">
          <Link to={{pathname: '/doodle',state: { value: this.props }}}>
            <img className="card-img-top" src="http://placehold.it/400x300" alt="Card image cap" />
          </Link>
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">
              <small className="rostext">
                {this.parseDate(this.props.date)}
              </small>
              <a href="#" className="badge morado float-right">
                {this.props.type}
              </a>
            </h6>
            <Link to={{pathname: '/doodle',state: { value: this.props }}}><h5 className="card-title title">{this.props.title}</h5></Link>
            <div className='float-right'>
            <button hidden={!this.props.editable} onClick={(e) => this.editDoodle(e)} className='btn btn-success btn-sm coll'>Editar</button>
            {' '}
            <button hidden={!this.props.editable} onClick={(e) => this.removeDoodle(e)} className='btn btn-danger btn-sm coll'>Eliminar</button>
            </div>
          </div>
        </div>
      );
    }
  }
}


export default DoodleBox;
