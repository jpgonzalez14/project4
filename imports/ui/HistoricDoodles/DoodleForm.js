import React from 'react';
import { Link } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { doodles } from './../../api/doodles';
import { roles } from './../../api/roles';
import Navbar from './../layouts/Navbar';
import Footer from './../layouts/Footer';

class DoodleForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      success: '',
      userRole: 'User',
      img:''
    };
    this.onChangeImgFile = this.onChangeImgFile.bind(this);
    this.changeImgFileState = this.changeImgFileState.bind(this);
    this.postToCloud = this.postToCloud.bind(this);
  }

  componentDidMount() {
    Meteor.subscribe('roles', () => {
      const role = roles.find({ user: Meteor.userId() }).fetch();
      if (role.length === 1) this.setState({ userRole: role[0].role });
    });
  }


  onSubmit(e) {
    e.preventDefault();
    let parrafo = this.refs.parrafo.value.trim();
    let title = this.refs.title.value.trim();
    let date = this.refs.date.value.trim();
    let tipo = this.state.userRole === 'User' ? 'Comunidad' : 'Uniandes';
    this.postToCloud();
    let img = this.state.img;
    console.log(img);
    if (parrafo && title && date && img) {
      Meteor.call('doodles.insert', title, parrafo, date, tipo, img, (err, res) => {
        if (err)
          this.setState({ success: 'Hubo un error. No se pudo crear el hito. :(' });
        else
          this.setState({ success: 'Ha creado correctamente un hito. Felicitaciones!' });
      })
      this.refs.parrafo.value = '';
      this.refs.title.value = '';
      this.refs.date.value = '';
      //this.refs.img.value = '';
    }


  }

  today() {
    const date = (new Date()).toJSON().split('T');
    return date[0];
  }

  changeImgFileState(file){
    this.setState({
      img: file
    });
  }

  onChangeImgFile(){
    var reader = new FileReader();
    reader.changeImgFileState = this.changeImgFileState;
    reader.onload = function() {
      var arrayBuffer = this.result,
      array = new Uint8Array(arrayBuffer)
    }
    reader.onloadend = function(){
      this.changeImgFileState(reader.result);
    }
    let myInput = document.getElementById('inputFile');
    reader.readAsDataURL(myInput.files[0]);
  }

  postToCloud(){
   if(this.state.imgFile !== null){
     let df = new FormData();
     let timestamp =  + new Date();
     let signature = 'timestamp=' + timestamp + 'BaVwVrYvk-ycf9Od2OxIsGhvk1E';
     df.set('file', this.state.img);
     df.set('api_key', '355544572555295');
     df.set('timestamp', timestamp );
     df.set('signature', CryptoJS.SHA1(signature));

     axios({
       method: 'post',
       url: 'https://api.cloudinary.com/v1_1/hitosuniandes/image/upload',
       data: df,
       config: { headers: {'Content-Type': 'multipart/form-data' }}
       })
       .then(function (response) {
         this.setState({
           img: response.data.secure_url
         });
       }.bind(this))
       .catch(function (response) {
           console.log(response);
      });
     }
     else{
        console.log('no se pudo subir la imagen');
     }
 }

  render() {
    return (
      <div>
        <Navbar />
        <br />
        <br />
        <div className="container testh">
          {this.state.success ? <div className="alert alert-success" role="alert">{this.state.success}</div> : undefined}
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="row">
              <div className="form-group col-9">
                <label className="rostext">Titulo</label>
                <input type="text" className="form-control" ref='title' name='title' aria-describedby="titleHelp" placeholder="Enter Title" required />
              </div>
              <div className="form-group col-3">
                <label className="rostext">Fecha</label>
                <input
                  className="form-control"
                  type="date"
                  defaultValue={this.today()}
                  name="fechaIngreso"
                  ref='date'
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="rostext">Contenido</label>
              <textarea className="form-control" rows="5" ref="parrafo" required></textarea>
            </div>
            <label className="rostext">Imagen del Hito</label>
            <input type="file" onChange={()=> this.onChangeImgFile() } ref="file" id="inputFile" accept="image/gif, image/jpeg, image/png" className="form-control-file" required/>
            {' '}
            <button type="submit" className="btn btn-primary btn-lg float-right coll">Crear</button>
          </form>
        </div>
        <br />
        <br />
        <br />
        <Footer />
      </div>
    );
  }
}

export default DoodleForm;
