import React, { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/store';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <Provider store={ store }>
      <App />
    </Provider>,
  );
