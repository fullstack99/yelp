import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react';

import configureStore, { history } from './store';
import YelpSearch from './containers/Main';

const { persistor, store } = configureStore();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter history={history}>
        <YelpSearch />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default App;
