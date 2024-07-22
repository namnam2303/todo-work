import axios from "axios";
import { GET_ERRORS, CREATE_PROJECT } from "./type";
// Action creator for creating a project
export const createProject = (project, history) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:8080/api/project", project);
    dispatch({
      type: CREATE_PROJECT,
      payload: res.data, // Ensure res.data exists
    });
    history.push("/dashboard");
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
