import React from 'react';
import { Accounts } from 'meteor/accounts-base';

import { Link } from 'react-router-dom';

import Navbar from './../layouts/Navbar';
import Footer from './../layouts/Footer';

class Signup extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  //Zulma Castañeda: Procuren evitar el uso de imagenes tan pesadas pues hace que la pagina cargue mucho mas lento, busquen la calidad y el tamaño correcto para su app 
  componentDidMount(){
    const totalCount = 10;
    var num = Math.ceil( Math.random() * totalCount );
    document.body.background = num+'.jpg';
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.position = "relative";
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    let username = this.refs.name.value.trim();

    if (password.length <= 5) {
      return this.setState({ error: 'Password debe tener al menos 6 caracteres' });
    }
    if (email===undefined || username===undefined) {
      return this.setState({ error: 'Todos los campos son obligatorios' });
    }
    Accounts.createUser({ username, email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        console.log('va crear?');
        this.setState({ error: '' });
        Meteor.call('users.insert', username, email, () => {
          if (err) { console.log(err); return; }
        });
      }
    });
  }
  render() {
    return (
      <div>
        <Navbar/>
        <br/>
        <br/>
        <div className='test'>
        <div className="container">
          <div className="col-6 mx-auto">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title title">Registrate</h1>
                {this.state.error ? <div className="alert alert-danger" role="alert">{this.state.error}</div> : undefined}
                <form onSubmit={this.onSubmit.bind(this)}>
                  <div className="form-group">
                    <label className="subtitles">Name</label>
                    <input type="text" className="form-control" ref='name' name='name' placeholder="Enter name" required />
                  </div>
                  <div className="form-group">
                    <label className="subtitles">Email address</label>
                    <input type="email" className="form-control" ref='email' name='email' aria-describedby="emailHelp" placeholder="Enter email" required />
                    <small className="form-text text-muted">We will never share your email with anyone else.</small>
                  </div>
                  <div className="form-group">
                    <label className="subtitles">Password</label>
                    <input type="password" className="form-control" ref='password' name='password' placeholder="Password" required />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg float-right coll">Registrate</button>
                </form>
                <Link to='/login'><small className='rostext'>Ya tienes una cuenta?</small></Link>
              </div>
            </div>
          </div>
        </div>
        </div>

        <Footer/>
      </div>
    );
  }
}
export default Signup;
