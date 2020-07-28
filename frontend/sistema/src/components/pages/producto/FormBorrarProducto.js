import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from '../../../components/layouts/home/header';
import Footer from '../../../components/layouts/home/footer';

class FormBorrarProducto extends Component {

    constructor(props) {
      super(props);

      this.state = {
        id: "",
        nombre: ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      const url = window.$url_api;
      axios.post(url, {"tipo" : "cargarProducto", "id" : this.props.match.params.id})
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({
            isLoaded: true,
            id: res.data.producto.id,
            nombre: res.data.producto.nombre
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

      var { id, nombre } = this.state;
      
      axios.post(window.$url_api, { "tipo" : "borrarProducto", "id" : id })
      .then(res => {
        var estado = res.data.estado;
        if(estado == 1) {
          this.props.history.push({
            pathname: "/productos",
            state: { mensaje : "El producto fue borrado exitosamente", tipo : "success" }
          });
        } else {
          this.props.history.push({
            pathname: "/productos",
            state: { mensaje : "Ocurrió un error borrando el producto", tipo : "danger" }
          });
        }
        
      });

    }

    render() {

        const { id, nombre } = this.state;

        return (
          <div>
            <Header />
            <div className="container">
              <br/>
              <h3 align="center">Productos</h3>
              <br/>
              <div className="jumbotron">
                  <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <input type="hidden" name="id" value={id} onChange={this.handleChange} />
                        <div className="text-center">
                            <h1 className="display-3">Eliminacíon</h1>
                            <p className="lead">¿Estás seguro que deseas eliminar el producto { nombre }</p>
                            <p className="lead">
                                <button type="submit" name="guardar" id="guardar" className="btn btn-danger boton-largo">Borrar</button>
                                <a href="/productos" className="btn btn-info boton-largo center-block">Atrás</a>
                            </p>
                        </div>
                    </fieldset>
                  </form>
              </div>
            </div>
            <Footer />
          </div>
        );
    }
}
export default FormBorrarProducto;