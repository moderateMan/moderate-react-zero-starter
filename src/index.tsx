import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider ,Helmet} from "react-helmet-async";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
    <Helmet>
        <title>Hello World</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <Router>
        <App />
      </Router>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
