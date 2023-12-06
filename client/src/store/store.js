import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";
import { CUSTOMER_ACTION_TYPES } from "./customer/customer.types";

const loggedMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }
  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("currentState: ", store.getState());

  next(action);

  console.log("next state: ", store.getState());
  // Save customer data to local storage on login action
  if (action.type === CUSTOMER_ACTION_TYPES.SET_CURRENT_CUSTOMER) {
    const { customer } = store.getState();
    localStorage.setItem("loggedCustomer", JSON.stringify(customer));
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

const middlewares = [loggedMiddleware];

const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(
  rootReducer,
  loadCustomerFromLocalStorage() ? { customer: { currentCustomer: loadCustomerFromLocalStorage() } } : undefined,  
  composedEnhancers
);
