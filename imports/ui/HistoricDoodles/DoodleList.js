import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from './../layouts/Navbar';
import Footer from './../layouts/Footer';
import DoodleBox from './DoodleBox';

//server imports
import { doodles } from './../../api/doodles';
import { roles } from './../../api/roles';


class DoodleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doodleUniandes: [],
      doodleComunidad: [],
      userRole: 'User',
      edit: false,
      currentPageUniandes: 1,
      currentPageComunidad: 1,
      doodlesPerPage: 8
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickComunidad = this.handleClickComunidad.bind(this);
    this.handleClickBackComunidad = this.handleClickBackComunidad.bind(this);
    this.handleClickNextComunidad = this.handleClickNextComunidad.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPageUniandes: Number(event.target.id)
    });
  }
  handleClickBack(event) {
    if (this.state.currentPageUniandes > 1) {
      this.setState({
        currentPageUniandes: (this.state.currentPageUniandes - 1)
      });
    }
  }
  handleClickNext(event) {
    if (this.state.currentPageUniandes < Math.ceil(this.state.doodleUniandes.length / this.state.doodlesPerPage)) {
      this.setState({
        currentPageUniandes: (this.state.currentPageUniandes + 1)
      });
    }
  }
  handleClickComunidad(event) {
    this.setState({
      currentPageComunidad: Number(event.target.id)
    });
  }
  handleClickBackComunidad(event) {
    if (this.state.currentPageComunidad > 1) {
      this.setState({
        currentPageComunidad: (this.state.currentPageComunidad - 1)
      });
    }
  }
  handleClickNextComunidad(event) {
    if (this.state.currentPageComunidad < Math.ceil(this.state.doodleComunidad.length / this.state.doodlesPerPage)) {
      this.setState({
        currentPageComunidad: (this.state.currentPageComunidad + 1)
      });
    }
  }

  componentDidMount() {
    document.body.background = '';
    document.body.style.backgroundRepeat = '';
    document.body.style.backgroundSize = '';

    this.doodlesTracker = Tracker.autorun(() => {
      const doodleUniandes = doodles.find({ tipo: 'Uniandes' }).fetch();
      const doodleComunidad = doodles.find({ tipo: 'Comunidad' }).fetch();
      Meteor.subscribe('doodles', () => {
        const doodleUniandes = doodles.find({ tipo: 'Uniandes' }).fetch();
        const doodleComunidad = doodles.find({ tipo: 'Comunidad' }).fetch();
        this.setState({ doodleUniandes, doodleComunidad });
      });
      Meteor.subscribe('roles', () => {
        const role = roles.find({user: Meteor.userId()}).fetch();
        if (role.length === 1) this.setState({userRole: role[0].role});

      });
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
      return <DoodleBox key={doodle._id} id={doodle._id} parrafo={doodle.parrafo} title={doodle.title} date={doodle.date} type={doodle.tipo}
        editable={this.state.userRole === 'Admin'} />
    });
  }
  renderDoodlesListComunidad() {
    const { doodleComunidad, currentPageComunidad, doodlesPerPage } = this.state;

    const indexOfLastDoodleComunidad = currentPageComunidad * doodlesPerPage;
    const indexOfFirstDoodleComunidad = indexOfLastDoodleComunidad - doodlesPerPage;
    const currentDoodlesComunidad = doodleComunidad.slice(indexOfFirstDoodleComunidad, indexOfLastDoodleComunidad);

    return currentDoodlesComunidad.map((doodle) => {
      return <DoodleBox key={doodle._id} id={doodle._id} parrafo={doodle.parrafo} title={doodle.title} date={doodle.date} type={doodle.tipo}
        editable={this.state.userRole === 'Admin'} />
    });
  }
  render() {
    const { doodleUniandes, doodleComunidad, currentPageUniandes, currentPageComunidad, doodlesPerPage } = this.state;

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(doodleUniandes.length / doodlesPerPage); i++) {
      pageNumbers.push(i);
    }
    var pages = Math.ceil(doodleUniandes.length / doodlesPerPage);
    var pagesComunidad = Math.ceil(doodleComunidad.length / doodlesPerPage);
    const renderPageNumbers = pageNumbers.map(number => {
      if (pages >= 1 && pages <= 3) {
        return (
          <li className="page-item" key={number}><button className="page-link" id={number} onClick={this.handleClick}>{number}</button></li>
        );
      }
      else {
        if ((number <= (currentPageUniandes + 1) && number >= (currentPageUniandes - 1))) {
          return (
            <li className="page-item" key={number}><button className="page-link" id={number} onClick={this.handleClick}>{number}</button></li>
          );
        }
      }
    });
    const pageNumbersComunidad = [];
    for (let i = 1; i <= Math.ceil(doodleComunidad.length / doodlesPerPage); i++) {
      pageNumbersComunidad.push(i);
    }
    const renderPageNumbersComunidad = pageNumbersComunidad.map(number => {
      if (pages >= 1 && pages <= 3) {
        return (
          <li className="page-item" key={number}><button className="page-link" id={number} onClick={this.handleClick}>{number}</button></li>
        );
      }
      else {
        if ((number <= (currentPageUniandes + 1) && number >= (currentPageUniandes - 1))) {
          return (
            <li className="page-item" key={number}><button className="page-link" id={number} onClick={this.handleClick}>{number}</button></li>
          );
        }
      }
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
            <br />
            <h1>
              Hitos <span className="badge badge-warning">Uniandes</span>
            </h1>
            <br />
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <button className="page-link" aria-label="Previous" onClick={this.handleClickBack}>
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </button>
                </li>
                {renderPageNumbers}
                <li className="page-item">
                  <button className="page-link" aria-label="Next" onClick={this.handleClickNext}>
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </button>
                </li>
              </ul>
            </nav>

            <hr />
            <div className="row">
              {this.renderDoodlesListUniandes()}
            </div>
            <br />
            <br />
            <h1>
              Hitos <span className="badge morado">Comunidad</span>
            </h1>

            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <button className="page-link" aria-label="Previous" onClick={this.handleClickBackComunidad}>
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </button>
                </li>
                {renderPageNumbersComunidad}
                <li className="page-item">
                  <button className="page-link" aria-label="Next" onClick={this.handleClickNextComunidad}>
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </button>
                </li>
              </ul>
            </nav>

            <hr />
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
