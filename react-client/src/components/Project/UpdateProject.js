import React, { useEffect, useState } from "react";
import { getProject, updateProject } from "../../actions/projectAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProject = ({ getProject, project, updateProject, errors }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Tạo state mới để lưu trữ dữ liệu của project
  const [projectData, setProjectData] = useState({
    projectName: "",
    projectIdentifier: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [localErrors, setErrors] = useState({});

  useEffect(() => {
    getProject(id, navigate);
  }, [id, getProject, navigate]);

  // Cập nhật projectData khi project thay đổi
  useEffect(() => {
    if (project) {
      setProjectData({
        projectName: project.projectName || "",
        projectIdentifier: project.projectIdentifier || "",
        description: project.description || "",
        startDate: project.startDate || "",
        endDate: project.endDate || "",
      });
    }
    if (errors) {
      setErrors(errors);
    }
  }, [project, errors]);

  // Xử lý sự kiện khi người dùng thay đổi giá trị input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    // Gửi dữ liệu projectData đến server
    e.preventDefault();
    updateProject(projectData);
  };

  return (
    <div className="project">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center">Update Project form</h5>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Project Name"
                  name="projectName"
                  value={projectData.projectName}
                  onChange={handleChange}
                />
                <p>{errors.projectName}</p>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Unique Project ID"
                  name="id"
                  value={projectData.projectIdentifier}
                  disabled
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Project Description"
                  name="description"
                  value={projectData.description}
                  onChange={handleChange}
                />
                <p>{errors.description}</p>
              </div>
              <h6>Start Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="startDate"
                  value={projectData.startDate}
                  onChange={handleChange}
                />
                <p>{errors.startDate}</p>
              </div>
              <h6>Estimated End Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="endDate"
                  value={projectData.endDate}
                  onChange={handleChange}
                />
                <p>{errors.endDate}</p>
              </div>

              <input
                type="submit"
                className="btn btn-primary btn-block mt-4"
                onClick={handleSubmit}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

UpdateProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  updateProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project.project, // Đảm bảo rằng state project đang được lấy đúng
  errors: state.errors,
});

const mapDispatchToProps = {
  getProject,
  updateProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProject);
