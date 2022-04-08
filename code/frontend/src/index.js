import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Modal from "react-modal";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


Modal.setAppElement("#root");

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
