import actionTypes from "../constants/actionTypes";

export const selectToEditReducer = (state = [], { type, payload }) => {
  switch (type) {
    case actionTypes.SELECT_TASK_TO_EDIT:
      return {
        ...state,
        ...payload,
      };
    //   return state;

    default:
      return state;
  }
};
