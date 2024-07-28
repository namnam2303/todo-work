import {
  GET_TASKS,
  GET_BACKLOG,
  DELETE_TASK,
  GET_TASK,
  UPDATE_TASK,
} from "../actions/types";

const initialState = {
  project_tasks: [],
  project_task: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BACKLOG:
      return {
        ...state,
        project_tasks: action.payload,
      };
    case GET_TASKS:
      return {
        ...state,
        project_tasks: action.payload,
      };
    case GET_TASK:
      return {
        ...state,
        project_task: action.payload,
      };
    case UPDATE_TASK:
      return {
        ...state,
        project_task: action.payload,
      };
    case DELETE_TASK:
      return {
        ...state,
        project_tasks: state.project_tasks.filter(
          (task) => task.projectSequence !== action.payload
        ),
      };
    default:
      return state;
  }
}
