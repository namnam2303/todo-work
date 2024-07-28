import React, { Component, useEffect } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import UpdateProject from "./components/Project/UpdateProject";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import { Provider } from "react-redux";
import store from "./store";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import LoginForm from "./components/Login/loginForm";
import RegisterForm from "./components/Login/registerForm";
import setAuthToken from "./utils/setAuthToken";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authAction";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import initAuth from "./utils/initAuth";

const App = () => {
  useEffect(() => {
    initAuth();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addProject" element={<AddProject />} />
            <Route path="/updateProject/:id" element={<UpdateProject />} />
            <Route path="/projectBoard/:id" Component={ProjectBoard} />
            <Route path="/addProjectTask/:id" Component={AddProjectTask} />
            <Route
              path="/updateProjectTask/:id/:sequence"
              Component={UpdateProjectTask}
            />
            <Route path="/login" element={<LoginForm />} /> {/* Route Login */}
            <Route path="/register" element={<RegisterForm />} />{" "}
            {/* Route Register */}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
