import { combineReducers } from "redux";
import projectReducer from "./projectReducer";
import errorReducer from "./errorReducer";
import backlogReducer from "./backlogReducer";

const rootReducer = combineReducers({
  project: projectReducer,
  errors: errorReducer,
  backlog: backlogReducer,
});

export default rootReducer;
