import react from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import { initialState } from "./context/initialState";
import { StateProvider } from "./context/StateProvider";
import reducer from "./context/reducer";
ReactDOM.render(
  <Router>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </Router>,

  document.getElementById("root")
);
