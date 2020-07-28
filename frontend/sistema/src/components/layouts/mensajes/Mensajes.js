import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

class Mensajes extends Component {
    render() {

        var mensaje = "";
        var tipo = "";

        if (typeof this.props.state !== 'undefined') {
          mensaje = this.props.state.mensaje;
          tipo = this.props.state.tipo;
        }

        return (
        <div className="container">
          <br/>
          {
            (this.props.state) &&
              <div className={"alert alert-" + tipo + " alert-dismissible"}>
                 <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                 { mensaje }
              </div>
          }
          <br/>
        </div>
        );
    }
}
export default Mensajes;