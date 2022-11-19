import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './pages/home';
import Header from "./components/header";
import GlobalStyle from './utils/styles/GlobalStyle'
import Detailposts from './pages/detailposts'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Router>
      <GlobalStyle />
      <Header />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/detail/:id">
        <Detailposts />
      </Route>
    </Router>
  </StrictMode>,
);
