import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from './../layouts/Navbar';
import Footer from './../layouts/Footer';
import DoodleBox from './DoodleBox';

//server imports
import { doodles } from './../../api/doodles';


class DoodleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doodleUniandes: [],
      doodleComunidad: [],
      edit: false,
      currentPageUniandes: 1,
      currentPageComunidad: 1,
      doodlesPerPage: 8
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  componentDidMount() {
    document.body.background = '';
    document.body.style.backgroundRepeat = '';
    document.body.style.backgroundSize = '';

    this.doodlesTracker = Tracker.autorun(() => {
      Meteor.subscribe('doodles');
      const doodleUniandes = doodles.find({tipo: 'Uniandes'}).fetch();
      const doodleComunidad = doodles.find({tipo: 'Comunidad'}).fetch();

      this.setState({ doodleUniandes });
      this.setState({ doodleComunidad });
    });
  }
  componentWillUnmount() {
    this.doodlesTracker.stop();
  }
  renderDoodlesListUniandes() {

    return this.state.doodleUniandes.map((doodle) => {
      return <DoodleBox key={doodle._id} id={doodle._id} parrafo={doodle.parrafo} title={doodle.title} date={doodle.date} type={doodle.tipo} edit={false}/>
    });
  }
  renderDoodlesListComunidad() {
    return this.state.doodleComunidad.map((doodle) => {
        return <DoodleBox key={doodle._id} id={doodle._id} parrafo={doodle.parrafo} title={doodle.title} date={doodle.date} type={doodle.tipo} edit={false}/>
    });
  }
  render() {

    return (
      <div>
        <Navbar />
        <br />
        <br />
        <div className="container">
        <div className="jumbotron">
            <h1 className="display-4 title fz">Hitos Uniandes</h1>
            <p className="lead">
            Hitos Uniandes es un espacio creado
            por la Oficina de Construcción de Comunidad
            para visibilizar la investigación sobre algunos
            hitos históricos de nuestra institucion y comunidad.
            Los invitamos a ser parte de esta iniciativa.
            </p>
        </div>
        <div className="container">
        <br/>
        <h1>
        Hitos <span className="badge badge-warning">Uniandes</span>
        </h1>
        <hr/>
          <div className="row">
              {this.renderDoodlesListUniandes()}
          </div>
          <br/>
          <br/>
          <h1>
          Hitos <span className="badge morado">Comunidad</span>
          </h1>
          <hr/>
          <div className="row">
            {this.renderDoodlesListComunidad()}
          </div>
          </div>
        </div>
        <br />
        <Footer />
      </div>
    );
  }
}

export default DoodleList;
