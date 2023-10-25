import { combineReducers } from "redux";

import { userReducer } from "./userReducer";
import { taskReducer } from "./taskReducer";
import { selectToEditReducer } from "./selectToEditReducer";
import { notificationReducer } from "./notificationReducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
  taskReducer: taskReducer,
  selectToEditReducer: selectToEditReducer,
  notificationReducer: notificationReducer,
  // searchByName: searchByNameReducer,
  // searchByFilter: searchByFilterReducer,
});

export default rootReducer;
