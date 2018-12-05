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
            this.setState({ doodle });
        });
    }
    componentWillUnmount() {
        this.doodlesTracker.stop();
    }
    renderDoodlesList() {
        return this.state.doodle.map((doodle) => {
            return (
                <DoodleBox key={doodle._id} id={doodle._id} parrafo={doodle.parrafo} title={doodle.title} date={doodle.date} type={doodle.tipo}
                    editable={this.state.editable} />
            )
        });
    }

    render() {
            return (
                <div>
                    <Navbar />
                    <br />
                    <div className="testh">
                      <div className="container">
                        <div className="card mb-3 text-center">
                          <img className="card-img-top size" src="recortado.png" alt="Card image cap"/>
                          <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="container">
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
