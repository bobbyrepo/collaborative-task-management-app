import actionTypes from "../constants/actionTypes";

export const setTasks = (dispatch, data) => {
  return dispatch({
    type: actionTypes.SET_TASKS,
    payload: data,
  });
};
export const addTask = (dispatch, data) => {
  return dispatch({
    type: actionTypes.ADD_TASK,
    payload: data,
  });
};

export const removeTask = (dispatch, data) => {
  return dispatch({
    type: actionTypes.REMOVE_TASK,
    payload: data,
  });
};

export const editTask = (dispatch, data) => {
  return dispatch({
    type: actionTypes.EDIT_TASK,
    payload: data,
  });
};

// export const selectInvoice = (data) => {
//   return {
//     type: "SELECT_TO_EDIT",
//     payload: data,
//   };
// };
