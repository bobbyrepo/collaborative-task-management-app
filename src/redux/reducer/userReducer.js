import actionTypes from "../constants/actionTypes";

const initialState = [];

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_USER:
      return payload;

    default:
      return state;
  }
};
