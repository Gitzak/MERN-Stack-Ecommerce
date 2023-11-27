import { CUSTOMER_ACTION_TYPES } from "./customer.types";

const CUSTOMER_INITIAL_STATE = {
  currentCustomer: null,
};

export const customerReducer = (state = CUSTOMER_INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case CUSTOMER_ACTION_TYPES.SET_CURRENT_CUSTOMER:
      return {
        ...state,
        currentCustomer: payload,
      };
    default:
      return state;
  }
};
