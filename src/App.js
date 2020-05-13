import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import RequiredBundle from './react-utils/components/RequiredBundle';
import Layout from "./Layout/Layout";
import { initializeStore } from './redux/store';
import { loadRequiredProducts } from './redux/actions';
import './styles.scss';


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
          <Layout/>
        </BrowserRouter>
      </RequiredBundle>
    </Provider>;
  }
}

export default App;
