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
      doodlesPerPage: 1
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPageUniandes: Number(event.target.id)
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
    const { doodleUniandes, currentPageUniandes, doodlesPerPage } = this.state;

    const indexOfLastDoodle = currentPageUniandes * doodlesPerPage;
    const indexOfFirstDoodle = indexOfLastDoodle - doodlesPerPage;
    const currentDoodles = doodleUniandes.slice(indexOfFirstDoodle, indexOfLastDoodle);

    return currentDoodles.map((doodle) => {
      return <DoodleBox key={doodle._id} id={doodle._id} parrafo={doodle.parrafo} title={doodle.title} date={doodle.date} type={doodle.tipo} edit={false}/>
    });
  }
  renderDoodlesListComunidad() {
    return this.state.doodleComunidad.map((doodle) => {
        return <DoodleBox key={doodle._id} id={doodle._id} parrafo={doodle.parrafo} title={doodle.title} date={doodle.date} type={doodle.tipo} edit={false}/>
    });
  }
  render() {
    const { doodleUniandes, currentPageUniandes, doodlesPerPage } = this.state;

    const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(doodleUniandes.length / doodlesPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <button className="page-link" key={number} id={number} onClick={this.handleClick}>{number}</button>
      );
    });


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

        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>
            <li className="page-item" >{renderPageNumbers}</li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>

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
