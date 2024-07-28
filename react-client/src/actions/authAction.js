import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS } from "./types";
import setAuthToken from "../utils/setAuthToken";
// Đăng nhập - Lấy JWT token
export const loginUser = (userData, navigate) => async (dispatch) => {
  try {
    // Xóa lỗi trước khi gửi yêu cầu
    dispatch(clearErrors());
    const res = await axios.post("/api/auth/login", userData);
    const { token } = res.data;
    // Lưu token vào localStorage
    localStorage.setItem("jwtToken", token);
    // Set token vào tiêu đề Authorization của Axios
    setAuthToken(token);
    // Decode token để lấy user data
    const decoded = jwt_decode(token);
    // Set current user
    dispatch(setCurrentUser(decoded));
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

// Set current user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Đăng xuất - Xóa token khỏi localStorage
export const logoutUser = () => (dispatch) => {
  // Xóa token khỏi localStorage
  localStorage.removeItem("jwtToken");
  // Xóa tiêu đề Authorization của Axios
  setAuthToken(false);
  // Xóa user hiện tại khỏi state
  dispatch(setCurrentUser({}));
};

// Xóa lỗi
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
