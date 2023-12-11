import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store.js";
import { UserProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import "./assets/scss/style.scss";


ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <UserProvider>
        <App />
      </UserProvider>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
