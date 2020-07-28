import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import ReactDOM from 'react-dom';
import axios from 'axios';

import Home from './components/pages/home/Home';

import Proveedor from './components/pages/proveedor/ListarProveedor';
import FormAgregarProveedor from './components/pages/proveedor/FormAgregarProveedor';
import FormEditarProveedor from './components/pages/proveedor/FormEditarProveedor';
import FormBorrarProveedor from './components/pages/proveedor/FormBorrarProveedor';

import Producto from './components/pages/producto/ListarProducto';
import FormAgregarProducto from './components/pages/producto/FormAgregarProducto';
import FormEditarProducto from './components/pages/producto/FormEditarProducto';
import FormBorrarProducto from './components/pages/producto/FormBorrarProducto';

export default function App() {

  return (
    <Router>
        {}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/proveedores" component={Proveedor} />
          <Route exact path="/proveedores/agregar" component={FormAgregarProveedor} />
          <Route exact path="/proveedores/:id/editar" component={FormEditarProveedor} />
          <Route exact path="/proveedores/:id/borrar" component={FormBorrarProveedor} />
          <Route exact path="/productos" component={Producto} />
          <Route exact path="/productos/agregar" component={FormAgregarProducto} />
          <Route exact path="/productos/:id/editar" component={FormEditarProducto} />
          <Route exact path="/productos/:id/borrar" component={FormBorrarProducto} />
        </Switch>
    </Router>
  );

}