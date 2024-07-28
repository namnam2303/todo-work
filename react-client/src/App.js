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
import initAuth from "./utils/initAuth";
import PrivateRoute from "./utils/privateRoute";

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
            <Route
              path="/dashboard"
              element={<PrivateRoute component={Dashboard} />}
            />
            <Route
              path="/addProject"
              element={<PrivateRoute component={AddProject} />}
            />
            <Route
              path="/updateProject/:id"
              element={<PrivateRoute component={UpdateProject} />}
            />
            <Route
              path="/projectBoard/:id"
              element={<PrivateRoute component={ProjectBoard} />}
            />
            <Route
              path="/addProjectTask/:id"
              element={<PrivateRoute component={AddProject} />}
            />
            <Route
              path="/updateProjectTask/:id/:sequence"
              element={<PrivateRoute component={UpdateProjectTask} />}
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
