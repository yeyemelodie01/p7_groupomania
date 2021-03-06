import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './pages/home';
import Header from "./components/header";
import GlobalStyle from './utils/styles/GlobalStyle'


ReactDOM.render(
  <React.StrictMode>
      <Router>
          <GlobalStyle />
          <Header />
          <Route exact path="/">
              <Home />
          </Route>
      </Router>
  </React.StrictMode>,
    document.getElementById('root')
);
