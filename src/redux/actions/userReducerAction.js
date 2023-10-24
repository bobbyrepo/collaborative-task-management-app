import actionTypes from "../constants/actionTypes";

export const setUser = (dispatch, data) => {
  return dispatch({
    type: actionTypes.SET_USER,
    payload: data,
  });
};
