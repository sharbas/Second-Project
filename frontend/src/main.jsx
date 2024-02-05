import React from "react";
import  ReactDOM  from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store.js";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import './main.css'

const root=ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App/>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
)