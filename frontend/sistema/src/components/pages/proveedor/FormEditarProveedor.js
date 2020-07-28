import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from '../../../components/layouts/home/header';
import Footer from '../../../components/layouts/home/footer';

class FormEditarProveedor extends Component {

    constructor(props) {
      super(props);

      this.state = {
        id : "",
        nombre: "",
        direccion: "",
        telefono: ""
      };

      console.log("ID");
      console.log(this.props.match.params.id);

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      const url = window.$url_api;
      axios.post(url, {"tipo" : "cargarProveedor", "id" : this.props.match.params.id})
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({
            isLoaded: true,
            id : res.data.proveedor.id,
            nombre: res.data.proveedor.nombre,
            telefono: res.data.proveedor.telefono,
            direccion: res.data.proveedor.direccion
          });          
      }).catch(e => {
          console.log(e);
      });

    }

    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
      e.preventDefault();

      var { id, nombre, direccion, telefono } = this.state;
      
      axios.post(window.$url_api, { "tipo" : "editarProveedor", "id" : id, "nombre" : nombre, "direccion" : direccion, "telefono" : telefono })
      .then(res => {
        console.log(res);
        console.log(res.data.estado);
        var estado = res.data.estado;
        if(estado == 1) {
          this.props.history.push({
            pathname: "/proveedores",
            state: { mensaje : "El proveedor fue editado exitosamente", tipo : "success" }
          });
        } else {
          this.props.history.push({
            pathname: "/proveedores",
            state: { mensaje : "Ocurrió un error editando el proveedor", tipo : "danger" }
          });
        }
      });

    }

    render() {

        const { id, nombre, direccion, telefono } = this.state;

        return (
          <div>
            <Header />
            <div className="container">
              <br/>
              <h3 align="center">Proveedores</h3>
              <br/>
              <div className="card card-primary contenedor">
                  <div className="card-header bg-primary">Editando el proveedor {nombre}</div>
                  <div className="card-body">
                      <div className="card-block">
                          <form onSubmit={this.handleSubmit}>
                              <input type="hidden" name="id" value={id} onChange={this.handleChange} />
                              <legend>Datos</legend>
                              <div className="form-group">
                                <label>Nombre</label>
                                <input type="text" name="nombre" value={nombre} onChange={this.handleChange} className="form-control" required />
                              </div>
                              <div className="form-group">
                                <label>Dirección</label>
                                <input type="text" name="direccion" value={direccion} onChange={this.handleChange} className="form-control" required />
                              </div>
                              <div className="form-group">
                                <label>Teléfono</label>
                                <input type="text" name="telefono" value={telefono} onChange={this.handleChange} className="form-control" required />
                              </div>
                              <div className="text-center">
                                  <p className="lead">
                                    <button type="submit" name="guardar" id="guardar" className="btn btn-primary boton-largo">Guardar</button>
                                    <a href="/proveedores" className="btn btn-info boton-largo center-block">Atrás</a>
                                  </p>
                              </div>               
                          </form>
                      </div>
                  </div>
              </div>
            </div>
            <Footer />
          </div>
        );
    }
}
export default FormEditarProveedor;