import { combineReducers } from "redux";
import projectReducer from "./projectReducer";
import errorReducer from "./errorReducer";
import backlogReducer from "./backlogReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  project: projectReducer,
  errors: errorReducer,
  backlog: backlogReducer,
  auth: authReducer,
});

export default rootReducer;
