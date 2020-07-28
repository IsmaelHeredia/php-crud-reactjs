import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from '../../../components/layouts/home/header';
import Footer from '../../../components/layouts/home/footer';

class FormAgregarProducto extends Component {

    constructor(props) {
      super(props);

      this.state = {
        proveedores: [],
        nombre: "",
        descripcion: "",
        precio: "",
        id_proveedor : ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      const url = window.$url_api;
      axios.post(url, {"tipo" : "listarProveedores"})
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({
            proveedores: res.data.proveedores,
            id_proveedor: res.data.proveedores[0].id
          });          
      }).catch(e => {
          console.log(e);
      });

    }

    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    handleSelectChange = (event) => {
      this.setState({
        id_proveedor: event.target.value
      })
    }

    handleSubmit = (e) => {
      e.preventDefault();

      var { nombre, descripcion, precio, id_proveedor } = this.state;

      axios.post(window.$url_api, { "tipo" : "agregarProducto", "nombre" : nombre, "descripcion" : descripcion, "precio" : precio, "id_proveedor" : id_proveedor })
      .then(res => {
        var estado = res.data.estado;
        if(estado == 1) {
          this.props.history.push({
            pathname: "/productos",
            state: { mensaje : "El producto fue creado exitosamente", tipo : "success" }
          });
        } else {
          this.props.history.push({
            pathname: "/productos",
            state: { mensaje : "Ocurrió un error creando el producto", tipo : "danger" }
          });
        }
      });

    }

    render() {

        const { proveedores, nombre, descripcion, precio, id_proveedor } = this.state;

        return (
          <div>
            <Header />
            <div className="container">
              <br/>
              <h3 align="center">Productos</h3>
              <br/>
              <div className="card card-primary contenedor">
                  <div className="card-header bg-primary">Agregar Producto</div>
                  <div className="card-body">
                      <div className="card-block">
                          <form onSubmit={this.handleSubmit}>
                              <legend>Datos</legend>
                              <div className="form-group">
                                <label>Nombre</label>
                                <input type="text" name="nombre" value={nombre} onChange={this.handleChange} className="form-control" required />
                              </div>
                              <div className="form-group">
                                <label>Descripción</label>
                                <textarea name="descripcion" value={descripcion} onChange={this.handleChange} className="form-control" rows="3" required />
                              </div>
                              <div className="form-group">
                                <label>Precio</label>
                                <input type="text" name="precio" value={precio} onChange={this.handleChange} className="form-control" required />
                              </div>
                              <div className="form-group">
                                <label>Proveedor</label>
                                <select name="id_proveedor" value={id_proveedor} onChange={this.handleSelectChange} className="form-control" required>
                                  {proveedores.length && proveedores.map((item, index) => (
                                       <option key={item.id} value={item.id}>{item.nombre}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="text-center">
                                  <p className="lead">
                                    <button type="submit" name="guardar" id="guardar" className="btn btn-primary boton-largo">Guardar</button>
                                    <a href="/productos" className="btn btn-info boton-largo center-block">Atrás</a>
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
export default FormAgregarProducto;