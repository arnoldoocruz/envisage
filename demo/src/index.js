import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';

import "./index.css";
import App from "./app";

ReactDOM.render(
  <Provider store={store}>
    <Router basename="/demos">
      <App />
    </Router>
  </Provider>,
  document.getElementById("root"),
);
