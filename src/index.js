import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import Store from './Redux/Store/Store';
import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={Store}>
  <App />
  </Provider>
//  <React.StrictMode >
//    <Provider store={Store}>
//    <App />
//   </Provider>
//  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

{/* <React.StrictMode >
  <Provider store={Store}>
  <App />
  </Provider>
</React.StrictMode>, */}
reportWebVitals();
