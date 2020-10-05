import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { GlobalState } from "./context/GlobalState";
import axios from "axios";

const renderApp = async () => {
  const authResponse = await axios.get("/api/auth/loggedin");
  const user = authResponse.data;
  ReactDOM.render(
    <BrowserRouter>
      <GlobalState>
        <App user={user} />
      </GlobalState>
    </BrowserRouter>,
    document.getElementById("root")
  );
};
renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
