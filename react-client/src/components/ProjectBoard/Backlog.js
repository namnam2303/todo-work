import React, { Component } from "react";
import ProjectTask from "./ProjectTasks/ProjectTask";

class Backlog extends Component {
  render() {
    const { project_tasks_prop } = this.props;

    // Log fetched data
    console.log("Project tasks prop:", project_tasks_prop);

    let todoItems = [];
    let inProgressItems = [];
    let doneItems = [];

    // Classify project task
    for (let i = 0; i < project_tasks_prop.length; i++) {
      const project_task = project_tasks_prop[i];
      console.log("Task:", project_task); // Log each task

      if (project_task.status === "TODO") {
        todoItems.push(project_task);
      }

      if (project_task.status === "INPROGRESS") {
        inProgressItems.push(project_task);
      }

      if (project_task.status === "DONE") {
        doneItems.push(project_task);
      }
    }
    console.log(inProgressItems);

    const renderTasks = (tasks) =>
      tasks.map((task) => <ProjectTask key={task.id} project_task={task} />);

    // Trả về HTML để hiển thị các nhiệm vụ
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>TO DO</h3>
              </div>
            </div>
            {renderTasks(todoItems)}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>In Progress</h3>
              </div>
            </div>
            {renderTasks(inProgressItems)}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Done</h3>
              </div>
            </div>
            {renderTasks(doneItems)}
          </div>
        </div>
      </div>
    );
  }
}

export default Backlog;
