import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from '../../../components/layouts/home/header';
import Footer from '../../../components/layouts/home/footer';

import Mensajes from '../../../components/layouts/mensajes/Mensajes';

class Home extends Component {

    render() {

        return (
          <div>
            <Header />
            <br />
            <h3 align="center">Bienvenido</h3>
            <Footer />
          </div>
        );
    }
}

export default Home;