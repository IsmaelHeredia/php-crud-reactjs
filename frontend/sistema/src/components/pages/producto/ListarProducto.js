import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from '../../../components/layouts/home/header';
import Footer from '../../../components/layouts/home/footer';

import Mensajes from '../../../components/layouts/mensajes/Mensajes';

const url = window.$url_api;

export default class ListarProducto extends Component {

    constructor(props){
      super(props);
      this.state = {
        productos: [],
        isLoaded: false,
      }
    }

    componentDidMount() {
      const url = window.$url_api;
      axios.post(url, {"tipo" : "listarProductos"})
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({
            isLoaded: true,
            productos: res.data.productos
          });          
      }).catch(e => {
          console.log(e);
      });

    }

    render() {
        return (
          <div>
            <Header />
            <br/>
            {
              (this.props.location.state) &&
              <Mensajes state = { this.props.location.state } />
            }
            <div className="container">
              <h3 align="center">Lista de productos</h3>
              <br/>
              <table className="table table-bordered order-table ">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Proveedor</th>
                    <th>Fecha registro</th>
                    <th>Opción</th>
                  </tr>
                </thead>
                <tbody id="bodytable">
                    {this.renderList()}
                </tbody>
              </table>
              <div className="doble-espacio"></div>
              <div align="center">
                <a href="/productos/agregar" className="btn btn-primary boton-largo" role="button">Crear nuevo producto</a>
              </div>
            </div>
            <Footer />
          </div>
        );
    }

    renderList(){
      var { productos = [] } = this.props;
      var { isLoaded } = this.state;
      if (!isLoaded) {
        return (
            <tr><td>Loading...</td></tr>
          )

      } else {

        return this.state.productos.map((producto)=>{

          return(
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.precio}</td>
              <td>{producto.nombre_proveedor}</td>
              <td>{producto.fecha_registro}</td>
              <td>
                <a href={"/productos/" + producto.id + "/editar"} className="btn btn-info" role="button">Editar</a>
                <a href={"/productos/" + producto.id + "/borrar"} className="btn btn-danger" role="button">Borrar</a>
              </td>
            </tr>
          )

        })
      }

    }

}