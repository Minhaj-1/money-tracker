import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.Suspense>
    <App />
  </React.Suspense>,
  document.getElementById('root')
);
