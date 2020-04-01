import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';

import { initializeStore } from './redux/store';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.store = initializeStore()
  }

  render() {
    return <Provider store={ this.store }>

    </Provider>;
  }
}

export default App;
