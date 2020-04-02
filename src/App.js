import React from 'react';
import './App.css';
import { Provider } from 'react-redux';

import Home from "./views/Home";

import RequiredBundle from "./react-utils/components/RequiredBundle";
import { initializeStore } from './redux/store';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.store = initializeStore()
  }

  render() {
    return <Provider store={ this.store }>
      <RequiredBundle resources={['stores', 'categories', 'currencies', 'countries']} loading={ null }>
        <Home/>
      </RequiredBundle>
    </Provider>;
  }
}

export default App;
