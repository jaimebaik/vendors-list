import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';

import './index.css';
import App from './App';
// import Vendors from './Vendors';
import apolloClient from './gql/client';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
      {/* <Vendors /> */}
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
