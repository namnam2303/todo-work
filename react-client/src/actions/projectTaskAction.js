import axios from "axios";
import {
  GET_BACKLOG,
  GET_ERRORS,
  GET_TASKS,
  UPDATE_TASK,
  DELETE_TASK,
  CREATE_TASK,
} from "./type";
export const createProjectTask = (id, task, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/backlog/:id", task);
    dispatch({
      type: CREATE_TASK,
      payload: res.data, // Ensure res.data exists
    });
    window.location.href = "http://localhost:3000/dashboard";
  } catch (error) {
    // Ensure error.response and error.response.data exist
    const errorData = error.response
      ? error.response.data
      : { message: "An error occurred" };
    dispatch({
      type: GET_ERRORS,
      payload: errorData,
    });
  }
};

export const getProjectTask = (id) => async (dispatch) => {
  const res = await axios.get(`/api/backlog/${id}`);
  dispatch({
    type: GET_TASKS,
    payload: res.data,
  });
};
export const deleteProjectTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/backlog/${id}`);
    dispatch({
      type: DELETE_TASK,
      payload: id,
    });
  } catch (error) {
    const errorData = error.response
      ? error.response.data
      : { message: "An error occurred" };
    dispatch({
      type: GET_ERRORS,
      payload: errorData,
    });
  }
};
