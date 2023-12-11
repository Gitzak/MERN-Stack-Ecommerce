import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { CUSTOMER_ACTION_TYPES } from "./customer/customer.types";
import { USER_ACTION_TYPES } from "./user/user.types";

const loggedMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }
  // console.log("type: ", action.type);
  // console.log("payload: ", action.payload);
  // console.log("currentState: ", store.getState());

  next(action);

  // console.log("next state: ", store.getState());
  // Save customer data to local storage on login action
  if (action.type === CUSTOMER_ACTION_TYPES.SET_CURRENT_CUSTOMER) {
    const { customer } = store.getState();
    localStorage.setItem("loggedCustomer", JSON.stringify(customer));
  }
  // / Save customer data to local storage on login action
  if (action.type === USER_ACTION_TYPES.SET_CURRENT_USER) {
    const { user } = store.getState();
    localStorage.setItem("loggedUser", JSON.stringify(customer));
  }
};

// Load customer data from local storage on store creation
const loadCustomerFromLocalStorage = () => {
  try {
    const serializedCustomer = localStorage.getItem("loggedCustomer");
    if (serializedCustomer === null) {
      return undefined;
    }
    return JSON.parse(serializedCustomer);
  } catch (err) {
    return undefined;
  }
};

// Load customer data from local storage on store creation
const loadUserFromLocalStorage = () => {
  try {
    const serializedUser = localStorage.getItem("loggedUser");
    if (serializedUser === null) {
      return undefined;
    }
    return JSON.parse(serializedUser);
  } catch (err) {
    return undefined;
  }
};

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user", "customer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [loggedMiddleware];

const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(
  persistedReducer,
  loadCustomerFromLocalStorage()
    ? { customer: { currentCustomer: loadCustomerFromLocalStorage() } }
    : undefined,
  loadUserFromLocalStorage()
    ? { user: { currentUser: loadUserFromLocalStorage() } }
    : undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
