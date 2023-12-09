import { USER_ACTION_TYPES } from "./user.types";

const USER_INITIAL_STATE = {
  currentUser: undefined,
};

export const userReducer = (state = USER_INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      // Save to local storage on login
      localStorage.setItem("loggedUser", JSON.stringify(payload));

      return {
        ...state,
        currentUser: payload,
      };
    case USER_ACTION_TYPES.LOGOUT_USER:
      // Clear local storage on logout
      localStorage.removeItem("loggedUser");
      localStorage.removeItem("userId");
      localStorage.removeItem("token");

      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};
