import axios from "axios";
import {
  GET_ERRORS,
  CREATE_PROJECT,
  GET_PROJECTS,
  GET_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from "./types";
import { clearErrors } from "./authAction";
import setAuthToken from "../utils/setAuthToken";

const setUpJwt = () => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    setAuthToken(token);
    console.log(token);
  }
};

export const createProject = (project, navigate) => async (dispatch) => {
  try {
    await dispatch(clearErrors());
    setUpJwt();
    const res = await axios.post("/api/project", project);
    dispatch({
      type: CREATE_PROJECT,
      payload: res.data,
    });
    navigate("/dashboard");
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

export const updateProject = (project, navigate) => async (dispatch) => {
  try {
    await dispatch(clearErrors());
    setUpJwt();
    const res = await axios.put(
      `/api/project/${project.projectIdentifier}`,
      project
    );
    dispatch({
      type: UPDATE_PROJECT,
      payload: res.data,
    });
    navigate("/dashboard");
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

export const getProjects = () => async (dispatch) => {
  setUpJwt();
  const res = await axios.get("/api/project/all");
  dispatch({
    type: GET_PROJECTS,
    payload: res.data,
  });
};

export const getProject = (id, navigate) => async (dispatch) => {
  try {
    setUpJwt();
    const res = await axios.get(`/api/project/${id}`);
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (error) {
    navigate("/dashboard");
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    setUpJwt();
    await axios.delete(`/api/project/${id}`);
    dispatch({
      type: DELETE_PROJECT,
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
