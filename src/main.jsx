import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
// Import our custom CSS
import "../src/assets/scss/custom.scss";
import { Provider } from "react-redux";
import store from "./redux/store.js";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
