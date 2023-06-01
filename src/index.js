import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//React-bootstrap
import '../node_modules/react-bootstrap/dist/react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

// import { ThemeProvider } from 'styled-components';
import { App } from 'components/App';
// import { ThemeProvider } from 'react-bootstrap';
// import { theme } from './constants/theme';
import { persistor, store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename="/btc-test-frontend/">
        {/* <ThemeProvider theme={theme}> */}
        <App />
        {/* </ThemeProvider> */}
      </BrowserRouter>
    </PersistGate>
  </Provider>

  // </React.StrictMode>
);
