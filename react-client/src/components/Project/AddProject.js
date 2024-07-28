import React, { Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectAction";
import { useNavigate } from "react-router-dom";
const AddProject = ({ createProject, errors }) => {
  const navigate = useNavigate();

  const [projectData, setProjectData] = useState({
    projectName: "",
    projectIdentifier: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [localErrors, setLocalErrors] = useState({});

  useEffect(() => {
    if (errors) {
      setLocalErrors(errors);
    }
  }, [errors]);

  const onChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      projectName: projectData.projectName,
      projectIdentifier: projectData.projectIdentifier,
      description: projectData.description,
      startDate: projectData.startDate,
      endDate: projectData.endDate,
    };
    createProject(newProject, navigate);
  };

  return (
    <div>
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Project form</h5>
              <hr />
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Project Name"
                    name="projectName"
                    value={projectData.projectName}
                    onChange={onChange}
                  />
                  <p>{localErrors.projectName}</p>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Unique Project ID"
                    name="projectIdentifier"
                    value={projectData.projectIdentifier}
                    onChange={onChange}
                  />
                  <p>{localErrors.projectIdentifier}</p>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Project Description"
                    name="description"
                    value={projectData.description}
                    onChange={onChange}
                  ></textarea>
                  <p>{localErrors.description}</p>
                </div>
                <h6>Start Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="startDate"
                    value={projectData.startDate}
                    onChange={onChange}
                  />
                  <p>{localErrors.startDate}</p>
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="endDate"
                    value={projectData.endDate}
                    onChange={onChange}
                  />
                  <p>{localErrors.endDate}</p>
                </div>
                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createProject })(AddProject);
