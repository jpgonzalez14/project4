import { Meteor } from 'meteor/meteor';

import React from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
  onLogout(){
    Accounts.logout(() => {
      console.log('logout');
      this.setState({});
    });
  }

  render() {
    if (Meteor.userId()) {
      return (
        <div className='container-fluid navcolorback'>
        <nav className="navbar navbar-expand-lg navbar-dark container">
          <Link className="navbar-brand" to="/"><img className="logo" src="/logo.png" width="320" height="60" className="d-inline-block align-top" alt="Image text"/></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item px-4">
                <Link className="nav-link" to='/doodles'><span className='ctext'>Hitos</span></Link>
              </li>
              <li className="nav-item px-4">
                <Link className="nav-link" to='/mydoodles'><span className='ctext'>Mis Hitos</span></Link>
              </li>
              <li className="nav-item px-4">
                <Link className="nav-link" to='/doodlesforms'><span className='ctext'>Crear Hito</span></Link>
              </li>
              <li className="nav-item px-4">
                <a className="nav-link" href='/' onClick={this.onLogout.bind(this)}><span className='ctext'>Logout</span></a>
              </li>
            </ul>
          </div>
        </nav>
        </div>
      );
    } else {
      return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark navcolorback">
          <Link className="navbar-brand" to="/"><img className="logo" src="/logo.png" width="320" height="60" className="d-inline-block align-top" alt="Image text"/></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item px-4">
                <Link className="nav-link" to='/doodles'><span className='ctext'>Hitos</span></Link>
              </li>
              <li className="nav-item px-4">
                <Link className="nav-link" to='/about'><span className='ctext'>¿Qué es Hitos Uniandes?</span></Link>
              </li>
              <li className="nav-item px-4">
                <Link className="nav-link" to='/login'><span className='ctext'>Ingresa</span></Link>
              </li>
              <li className="nav-item px-4">
                <Link className="nav-link" to='/register'><span className='ctext'>Registrate</span></Link>
              </li>
            </ul>
          </div>
        </nav>
        </div>
      );
    }
  }
}
