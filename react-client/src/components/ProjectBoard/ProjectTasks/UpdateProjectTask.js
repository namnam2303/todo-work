import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getProjectTask,
  updateProjectTask,
} from "../../../actions/projectTaskAction";

const UpdateProjectTask = ({
  errors,
  project_task,
  getProjectTask,
  updateProjectTask,
}) => {
  const { id, sequence } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    summary: "",
    acceptanceCriteria: "",
    status: "",
    priority: 0,
    dueDate: "",
    projectIdentifier: "",
    errors: {},
  });

  useEffect(() => {
    getProjectTask(id, sequence);
  }, [id, sequence, getProjectTask]);

  useEffect(() => {
    if (project_task) {
      setTask((prevTask) => ({
        ...prevTask,
        summary: project_task.summary || "",
        acceptanceCriteria: project_task.acceptanceCriteria || "",
        status: project_task.status || "",
        priority: project_task.priority || 0,
        dueDate: project_task.dueDate ? project_task.dueDate.split("T")[0] : "",
        projectIdentifier: project_task.projectIdentifier || "",
      }));
    }
  }, [project_task]);

  useEffect(() => {
    if (errors) {
      setTask((prevState) => ({ ...prevState, errors: errors }));
    }
  }, [errors]);

  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      summary: task.summary,
      acceptanceCriteria: task.acceptanceCriteria,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      projectIdentifier: task.projectIdentifier,
    };
    const errorResponse = await updateProjectTask(sequence, newTask);
    if (Object.keys(errorResponse ?? {}).length === 0) {
      navigate(`/projectBoard/${task.projectIdentifier}`);
    }
  };

  return (
    <div className="add-PBI">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link
              to={`/projectBoard/${task.projectIdentifier}`}
              className="btn btn-lg text-white"
              id="btn-create"
            >
              Back to Project Board
            </Link>
            <h4 className="display-4 text-center">Task detail</h4>
            <p className="lead text-center">Project Name + Project Code</p>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={`form-control form-control-lg ${
                    task.errors.summary ? "is-invalid" : ""
                  }`}
                  name="summary"
                  placeholder="Project Task summary"
                  value={task.summary}
                  onChange={onChange}
                />
                {task.errors.summary && (
                  <div className="invalid-feedback">{task.errors.summary}</div>
                )}
              </div>
              <div className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Acceptance Criteria"
                  name="acceptanceCriteria"
                  value={task.acceptanceCriteria}
                  onChange={onChange}
                />
              </div>
              <h6>Due Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="dueDate"
                  value={task.dueDate}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="priority"
                  value={task.priority}
                  onChange={onChange}
                >
                  <option value={0} disabled>
                    Select Priority
                  </option>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
              </div>

              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="status"
                  value={task.status}
                  onChange={onChange}
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="TODO">TO DO</option>
                  <option value="INPROGRESS">IN PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>
              </div>

              <input
                type="submit"
                className="btn btn-primary btn-block mt-4"
                value={"Update"}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

UpdateProjectTask.propTypes = {
  updateProjectTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  project_task: PropTypes.object,
  getProjectTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  project_task: state.backlog.project_task,
});

export default connect(mapStateToProps, { updateProjectTask, getProjectTask })(
  UpdateProjectTask
);
