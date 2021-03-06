import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { settings } from 'rest-in-model';
import App from './App';
import store from './store';
import { ENDPOINT_URL } from './constants';

settings.addEndpoint({
  name: 'api',
  value: ENDPOINT_URL,
  default: true,
});
settings.addApiPath({ name: 'api', value: '/api', default: true });

// settings.beforeEveryRequest = (response) => console.log('aaaaaa');
// settings.afterEveryRequest = (response) => console.log('aaaaaa');
//settings.setHeader('Authorization', 'Token ' + localStorage.getItem('token'));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
