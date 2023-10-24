import actionTypes from "../constants/actionTypes";

export const selectToEdit = (dispatch, data) => {
  return dispatch({
    type: actionTypes.SELECT_TASK_TO_EDIT,
    payload: data,
  });
};
