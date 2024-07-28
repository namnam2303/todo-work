import axios from "axios";
import store from "../store";
import { logoutUser } from "../actions/authAction";

const setAuthToken = (token) => {
  if (token) {
    // Thiết lập token vào tiêu đề mặc định của Axios
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Thiết lập Interceptor để kiểm tra JWT trong mỗi yêu cầu
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          store.dispatch(logoutUser());
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  } else {
    // Xóa tiêu đề Authorization nếu không có token
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
