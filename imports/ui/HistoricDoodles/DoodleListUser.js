import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from './../layouts/Navbar';
import Footer from './../layouts/Footer';
import DoodleBox from './DoodleBox';
import DoodleFormEdit from './DoodleFormEdit';

//server imports
import { doodles } from './../../api/doodles';


class DoodleListUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doodle: [],
            editable: true,
        };
    }
    componentDidMount() {
        document.body.background = '';
        document.body.style.backgroundRepeat = '';
        document.body.style.backgroundSize = '';

        this.doodlesTracker = Tracker.autorun(() => {
            Meteor.subscribe('doodles');
            const doodle = doodles.find({ userId: Meteor.userId() }).fetch();
            console.log(doodle);
            /*Quitar los logs que imprimen en consola*/
            this.setState({ doodle });
        });
    }
    componentWillUnmount() {
        this.doodlesTracker.stop();
    }
    renderDoodlesList() {
      if (this.state.doodle.length>0) {
        return this.state.doodle.map((doodle) => {
            return (
                <DoodleBox key={doodle._id} id={doodle._id} parrafo={doodle.parrafo} title={doodle.title} date={doodle.date} type={doodle.tipo}
                    editable={this.state.editable} />
            )
        });
      } else {
        return(
          <div className="container">
            <div className="card mb-3 text-center">
              <img className="card-img-top size" src="recortado.png" alt="Card image cap"/>
              <div className="card-body">
                <h5 className="card-title">No tienes ningun Hito</h5>
                <p className="card-text center">Te invitamos a compartir experiencias que inspires a toda la comunidad!</p>
                <Link to="/doodlesforms"><button className="btn btn-primary btn-lg coll">Crea un Hito!</button></Link>
              </div>
            </div>
          </div>
        );
      }

    }

    render() {
            return (
                <div>
                    <Navbar />
                    <br />
                    <div className="testh">
                      <br />
                      <div className="container">

                      {this.state.doodle.length>0 ? <div>
                        <h1>
                          Tus Hitos
                        </h1>
                        <hr/>
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Bienvenido!</strong> Qué historias te gustaria compartir hoy?
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div></div> : undefined}
                          <div className="row">
                                  {this.renderDoodlesList()}
                          </div>
                          </div>
                    </div>
                    <Footer />
                </div>
            );
        }
}

export default DoodleListUser;
