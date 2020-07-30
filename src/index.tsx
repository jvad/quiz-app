import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <div className="main-body">
      <div className="content">
        <div className="logo">
          <h3>Quiz App</h3>
        </div>
        <App />
      </div>
      <footer className="myfooter">
        Developed by{" "}
        <a href="https://github.com/jvad/">
          Jvad <i className="fa fa-github" aria-hidden="true"></i>
        </a>
      </footer>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
