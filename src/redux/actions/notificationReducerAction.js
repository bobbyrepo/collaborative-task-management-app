import actionTypes from "../constants/actionTypes";

export const addNotification = (dispatch, data) => {
  return dispatch({
    type: actionTypes.ADD_NOTIFICATION,
    payload: data,
  });
};
