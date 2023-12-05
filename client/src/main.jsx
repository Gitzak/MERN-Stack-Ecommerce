import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

import { UserProvider } from "./context/AuthContext.jsx";

import App from "./App.jsx";
import "./assets/scss/style.scss";

// import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
              <App />
      </UserProvider>
    </Provider>
  </React.StrictMode>
);
