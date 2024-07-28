import React, { Component, useState, useEffect } from "react";
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateProjectButton";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectAction";
import PropTypes from "prop-types";
import Pagination from "../utils/Pagination";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { setCurrentUser, logoutUser } from "../actions/authAction";
import { useNavigate } from "react-router-dom";
import setAuthToken from "../utils/setAuthToken";

const Dashboard = ({
  getProjects,
  project,
  auth,
  setCurrentUser,
  logoutUser,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!auth.isAuthenticated) {
      navigate("/login");
    } else {
      // Kiểm tra tính hợp lệ của JWT
      const token = localStorage.getItem("jwtToken");
      if (token) {
        setAuthToken(token);
        const decoded = jwt_decode(token);
        setCurrentUser(decoded);

        // Kiểm tra thời gian hết hạn của token
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          logoutUser();
          navigate("/login");
        }
      } else {
        navigate("/login");
      }

      getProjects();
    }
  }, [auth.isAuthenticated, getProjects, setCurrentUser, logoutUser, navigate]);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = project.projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Danh sách dự án</h1>
              <br />
              <CreateProjectButton />
              <br />
              <hr />
              {currentProjects.map((project) => (
                <ProjectItem key={project.id} project={project} />
              ))}
              <Pagination
                projectsPerPage={projectsPerPage}
                totalProjects={project.projects.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  project: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getProjects,
  setCurrentUser,
  logoutUser,
})(Dashboard);
