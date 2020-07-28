import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from '../../../components/layouts/home/header';
import Footer from '../../../components/layouts/home/footer';

class FormAgregarProveedor extends Component {

    constructor(props) {
      super(props);

      this.state = {
        nombre: "",
        direccion: "",
        telefono: ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
      e.preventDefault();

      var { nombre, direccion, telefono } = this.state;

      axios.post(window.$url_api, { "tipo" : "agregarProveedor", "nombre" : nombre, "direccion" : direccion, "telefono" : telefono })
      .then(res => {
        var estado = res.data.estado;
        if(estado == 1) {
          this.props.history.push({
            pathname: "/proveedores",
            state: { mensaje : "El proveedor fue creado exitosamente", tipo : "success" }
          });
        } else {
          this.props.history.push({
            pathname: "/proveedores",
            state: { mensaje : "Ocurrió un error creando el proveedor", tipo : "danger" }
          });
        }
      });

    }

    render() {

        const { nombre, direccion, telefono } = this.state;

        return (
          <div>
            <Header />
            <div className="container">
              <br/>
              <h3 align="center">Proveedores</h3>
              <br/>
              <div className="card card-primary contenedor">
                  <div className="card-header bg-primary">Agregar Proveedor</div>
                  <div className="card-body">
                      <div className="card-block">
                          <form onSubmit={this.handleSubmit}>
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
export default FormAgregarProveedor;