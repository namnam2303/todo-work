import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getProjectTask } from "../../actions/projectTaskAction";
import { useState } from "react";
import Backlog from "../ProjectBoard/Backlog";
import { Link } from "react-router-dom";

const ProjectBoard = ({ project_tasks, getProjectTask, errors }) => {
  const { id } = useParams();
  const [localErrors, setLocalErrors] = useState({});
  useEffect(() => {
    if (errors) {
      setLocalErrors(errors);
    }
  }, [errors]);

  useEffect(() => {
    getProjectTask(id);
  }, [id, getProjectTask]);

  const loadTaskBoard = (localErrors, project_tasks) => {
    if (project_tasks.length < 1) {
      if (localErrors.projectTaskNotFound) {
        return (
          <div className="alert alert-danger text-center" role="alert">
            {localErrors.projectTaskNotFound}
          </div>
        );
      } else {
        return (
          <div className="alert alert-info text-center" role="alert">
            No Project Tasks on this board
          </div>
        );
      }
    } else {
      return <Backlog project_tasks_prop={project_tasks} />;
    }
  };

  let boardContent = loadTaskBoard(localErrors, project_tasks);

  return (
    <div className="container">
      <Link
        to={`/addProjectTask/${id}`}
        className="btn btn-lg btn-info text-white"
        id="btn-create"
      >
        Create Project Task
      </Link>
      <br />
      <hr />
      {boardContent}
    </div>
  );
};

const mapStateToProps = (state) => ({
  project_tasks: state.backlog.project_tasks,
});

const mapDispatchToProps = {
  getProjectTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBoard);
