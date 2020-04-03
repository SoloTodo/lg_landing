import React from 'react';
import './styles.scss';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Home from "./views/Home";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";

import RequiredBundle from './react-utils/components/RequiredBundle';
import { initializeStore } from './redux/store';
import { loadRequiredProducts } from './redux/actions';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.store = initializeStore();
    this.store.dispatch(loadRequiredProducts);
  }

  render() {
    return <Provider store={ this.store }>
      <RequiredBundle resources={['stores', 'categories', 'currencies', 'countries']} loading={ null }>
        <BrowserRouter>
          <Header/>
          <Sidebar/>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/test">
              <div>Ruta de prueba</div>
            </Route>
          </Switch>
        </BrowserRouter>
      </RequiredBundle>
    </Provider>;
  }
}

export default App;
