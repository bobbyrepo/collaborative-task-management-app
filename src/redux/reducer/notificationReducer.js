import actionTypes from "../constants/actionTypes";

export const notificationReducer = (
  state = ["first notification", "second notification"],
  { type, payload }
) => {
  switch (type) {
    case actionTypes.ADD_NOTIFICATION:
      console.log(payload);
      return [...state, payload];

    default:
      return state;
  }
};
