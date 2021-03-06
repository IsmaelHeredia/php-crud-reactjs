import React, { Component } from "react";

class Header extends Component {
    render() {
        return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">CRUD</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Inicio <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" id="themes">Administrar <span className="caret"></span></a>
                  <div className="dropdown-menu" aria-labelledby="categorias">
                    <a className="dropdown-item" href="/productos">Productos</a>
                    <a className="dropdown-item" href="/proveedores">Proveedores</a>
                  </div>
            </li>
          </ul>
        </div>
      </nav>
        );
    }
}
export default Header;