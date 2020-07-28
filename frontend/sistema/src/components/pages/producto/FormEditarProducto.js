import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from '../../../components/layouts/home/header';
import Footer from '../../../components/layouts/home/footer';

class FormEditarProducto extends Component {

    constructor(props) {
      super(props);

      this.state = {
        proveedores: [],
        id : "",
        nombre: "",
        descripcion : "",
        precio : "",
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

      axios.post(url, {"tipo" : "cargarProducto", "id" : this.props.match.params.id})
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({
            isLoaded: true,
            id : res.data.producto.id,
            nombre: res.data.producto.nombre,
            descripcion: res.data.producto.descripcion,
            precio : res.data.producto.precio,
            id_proveedor : res.data.producto.id_proveedor
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

      var { id, nombre, descripcion, precio, id_proveedor } = this.state;

      axios.post(window.$url_api, { "tipo" : "editarProducto", "id" : id, "nombre" : nombre, "descripcion" : descripcion, "precio" : precio, "id_proveedor" : id_proveedor })
      .then(res => {
        var estado = res.data.estado;
        if(estado == 1) {
          this.props.history.push({
            pathname: "/productos",
            state: { mensaje : "El producto fue editado exitosamente", tipo : "success" }
          });
        } else {
          this.props.history.push({
            pathname: "/productos",
            state: { mensaje : "Ocurrió un error editando el producto", tipo : "danger" }
          });
        }
      });

    }

    render() {

        const { proveedores, id, nombre, descripcion, precio, id_proveedor } = this.state;

        return (
          <div>
            <Header />
            <div className="container">
              <br/>
              <h3 align="center">Productos</h3>
              <br/>
              <div className="card card-primary contenedor">
                  <div className="card-header bg-primary">Editando el producto {nombre}</div>
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
export default FormEditarProducto;