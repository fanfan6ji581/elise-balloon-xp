import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {TrialPage} from "./components/trial/TrialPage";
import {ConfigureSettings} from "./components/ConfigureSettings";
import {MainPage} from "./components/MainPage";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
      <BrowserRouter basename="/">
          <nav>
              <ul>
                  <li>
                      <Link to="trial">Trial</Link>
                  </li>
                  <li>
                      <Link to="config">Config</Link>
                  </li>
              </ul>
          </nav>
          <Routes>
              <Route path="trial" element={<TrialPage/>}/>
              <Route path="config" element={<ConfigureSettings/>}/>
          </Routes>
          <App />
      </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
