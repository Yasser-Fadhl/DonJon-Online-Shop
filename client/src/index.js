import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
const options = {
  position: positions.TOP_CENTER,
  transition: transitions.FADE,
  timeout: 5000,
  offset: "0px",
};
ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);
