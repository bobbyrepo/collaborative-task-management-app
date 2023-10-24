import axios from "axios";
import actionTypes from "../constants/actionTypes";

const base_url = process.env.REACT_APP_BACKEND_URL;
let num = 11;

const initialState = [];

export const taskReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_TASKS:
      return payload;

    case actionTypes.ADD_TASK:
      return [...state, payload];

    case actionTypes.REMOVE_TASK:
      state = state.filter((item) => item._id != payload.id);
      return state;

    case actionTypes.EDIT_TASK:
      const updatedState = state.map((task) =>
        task._id === payload._id
          ? {
              ...task,
              ...payload,
            }
          : task
      );
      axios
        .put(`${base_url}/api/tasks/update?id=${payload._id}`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          // console.log(res.data);
        })
        .catch((err) => console.log(err));
      return updatedState;

    // case "SELECT_TO_EDIT":
    //   return { ...state, selected: payload };
    default:
      return state;
  }
};
