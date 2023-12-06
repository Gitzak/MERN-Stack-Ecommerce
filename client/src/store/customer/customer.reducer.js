import { CUSTOMER_ACTION_TYPES } from "./customer.types";

const CUSTOMER_INITIAL_STATE = {
  currentCustomer: undefined,
};

export const customerReducer = (state = CUSTOMER_INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CUSTOMER_ACTION_TYPES.SET_CURRENT_CUSTOMER:
      // Save to local storage on login
      localStorage.setItem("loggedCustomer", JSON.stringify(payload));

      return {
        ...state,
        currentCustomer: payload,
      };
    case CUSTOMER_ACTION_TYPES.LOGOUT_CUSTOMER:
      // Clear local storage on logout
      localStorage.removeItem("loggedCustomer");
      localStorage.removeItem("CustomerId");
      localStorage.removeItem("tokenC");

      return {
        ...state,
        currentCustomer: null,
      };
    default:
      return state;
  }
};
