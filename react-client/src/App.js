import React, { Component } from "react";
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

class App extends Component {
  render() {
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
            </Routes>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
