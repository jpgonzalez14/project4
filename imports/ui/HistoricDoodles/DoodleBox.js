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
    Meteor.call('doodles.remove', this.props.id);
  }


  render() {
    return (
      <div className="card hitbox">
        <Link to={{ pathname: '/doodle', state: { value: this.props } }}><img className="card-img-top" src={this.props.img} alt="Card image cap" /></Link>
        <div className="card-body">
          <small className="card-subtitle mb-2 text-muted">
          Hito <span className={this.props.type === "Uniandes" ? "badge badge-warning" : "badge morado"}>
            {this.props.type}
          </span>
          </small>
          <br/>
          <small className="rostext">
            {this.parseDate(this.props.date)}
          </small>
          <Link to={{ pathname: '/doodle', state: { value: this.props } }}><h5 className="card-title title">{this.props.title}</h5></Link>
          <div className='float-right'>
            <Link to={{ pathname: '/doodlesformsedit', state: { ...this.props } }}>
              <button hidden={!this.props.editable} className='btn btn-success btn-sm coll'>Editar</button>
            </Link>
            {' '}
            <button hidden={!this.props.editable} onClick={(e) => this.removeDoodle(e)} className='btn btn-danger btn-sm coll'>Eliminar</button>
          </div>
        </div>
      </div>
    );

  }
}


export default DoodleBox;
