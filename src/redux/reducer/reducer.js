import { combineReducers } from "redux";

import { userReducer } from "./userReducer";
import { taskReducer } from "./taskReducer";
import { selectToEditReducer } from "./selectToEditReducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
  taskReducer: taskReducer,
  selectToEditReducer: selectToEditReducer,
  // searchByName: searchByNameReducer,
  // searchByFilter: searchByFilterReducer,
});

export default rootReducer;
