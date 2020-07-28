import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from '../../../components/layouts/home/header';
import Footer from '../../../components/layouts/home/footer';

class FormBorrarProveedor extends Component {

    constructor(props) {
      super(props);

      this.state = {
        id: "",
        nombre: ""
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
            id: res.data.proveedor.id,
            nombre: res.data.proveedor.nombre
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
      
      axios.post(window.$url_api, { "tipo" : "borrarProveedor", "id" : id })
      .then(res => {
        var estado = res.data.estado;
        if(estado == 1) {
          this.props.history.push({
            pathname: "/proveedores",
            state: { mensaje : "El proveedor fue borrado exitosamente", tipo : "success" }
          });
        } else {
          this.props.history.push({
            pathname: "/proveedores",
            state: { mensaje : "Ocurrió un error borrando el proveedor", tipo : "danger" }
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
              <h3 align="center">Proveedores</h3>
              <br/>
              <div className="jumbotron">
                  <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <input type="hidden" name="id" value={id} onChange={this.handleChange} />
                        <div className="text-center">
                            <h1 className="display-3">Eliminacíon</h1>
                            <p className="lead">¿Estás seguro que deseas eliminar al proveedor { nombre }</p>
                            <p className="lead">
                                <button type="submit" name="guardar" id="guardar" className="btn btn-danger boton-largo">Borrar</button>
                                <a href="/proveedores" className="btn btn-info boton-largo center-block">Atrás</a>
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
export default FormBorrarProveedor;