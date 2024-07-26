import axios from "axios";
import {
  GET_ERRORS,
  GET_TASKS,
  UPDATE_TASK,
  DELETE_TASK,
  CREATE_TASK,
  GET_TASK,
  CLEAR_ERRORS,
} from "./type";
export const createProjectTask = (task, navigate) => async (dispatch) => {
  try {
    const res = await axios.post(
      `/api/backlog/${task.projectIdentifier}`,
      task
    );
    dispatch({
      type: CREATE_TASK,
      payload: res.data,
    });
    dispatch({
      type: CLEAR_ERRORS, // Clear errors after successful creation
    });
    navigate(`/projectBoard/${task.projectIdentifier}`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const updateProjectTask =
  (sequence, projectTask) => async (dispatch) => {
    try {
      const res = await axios.put(`/api/backlog/${sequence}`, projectTask);
      dispatch({
        type: UPDATE_TASK,
        payload: res.data,
      });
      dispatch({
        type: CLEAR_ERRORS, // Clear errors after successful update
      });
      return {}; // Return an empty object to indicate success
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      return err.response.data || {}; // Return errors or an empty object
    }
  };

export const getProjectTask = (id, sequence) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/backlog/${id}/${sequence}`);
    dispatch({
      type: GET_TASK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
export const getListProjectTask = (id) => async (dispatch) => {
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
