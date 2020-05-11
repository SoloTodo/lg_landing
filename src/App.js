import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import MobileLayout from "./Layout/Mobile/MobileLayout";

import RequiredBundle from './react-utils/components/RequiredBundle';
import { initializeStore } from './redux/store';
import { loadRequiredProducts } from './redux/actions';
import './styles.scss';
import DesktopLayout from "./Layout/Desktop/DesktopLayout";


class App extends React.Component{
  constructor(props) {
    super(props);
    this.store = initializeStore();
    this.store.dispatch(loadRequiredProducts);
  }

  render() {
    const state = this.store.getState();
    const isMobile = state.browser.lessThan['large']
    return <Provider store={ this.store }>
      <RequiredBundle resources={['stores', 'categories', 'currencies', 'countries']} loading={ null }>
        <BrowserRouter>
          {isMobile?
              <MobileLayout/>:
              <DesktopLayout/>}
        </BrowserRouter>
      </RequiredBundle>
    </Provider>;
  }
}

export default App;
