import { createAction } from "../../utils/reducer/reducer.utils";
import { CUSTOMER_ACTION_TYPES } from "./customer.types";

export const setCurrentCustomer = (customer) =>
  createAction(CUSTOMER_ACTION_TYPES.SET_CURRENT_CUSTOMER, customer);

export const logoutCustomer = () =>
  createAction(CUSTOMER_ACTION_TYPES.LOGOUT_CUSTOMER);
