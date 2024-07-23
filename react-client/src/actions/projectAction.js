import axios from "axios";
import {
  GET_ERRORS,
  CREATE_PROJECT,
  GET_PROJECTS,
  UPDATE_PROJECT,
  GET_PROJECT,
} from "./type";
// Action creator for creating a project
export const createProject = (project, history) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:8080/api/project", project);
    dispatch({
      type: CREATE_PROJECT,
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
export const updateProject = (project) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:8080/api/project/${project.projectIdentifier}`,
      project
    );
    dispatch({
      type: UPDATE_PROJECT,
      payload: res.data, // Ensure res.data exists
    });
    window.location.href = "http://localhost:3000/dashboard";
  } catch (error) {
    console.log("Error in updateProject action:", error);
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
export const getProjects = () => async (dispatch) => {
  const res = await axios.get("http://localhost:8080/api/project/all");
  dispatch({
    type: GET_PROJECTS,
    payload: res.data,
  });
};
export const getProject = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/project/${id}`);
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (error) {
    history.push("/dashboard");
  }
};
