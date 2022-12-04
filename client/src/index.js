import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import Provider from './context/UserContext';
import 'swiper/css/bundle';
import GlobalStyles from './components/GlobalStyles';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// console.log(domain);
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <GlobalStyles />
    <Provider>
      <App />
    </Provider>
  </Auth0Provider>
  // </React.StrictMode>
);
