import React, { Component, useState, useEffect } from "react";
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateProjectButton";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectAction";
import PropTypes from "prop-types";
import Pagination from "../utils/Pagination";

const Dashboard = ({ getProjects, project }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(3);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

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
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, { getProjects })(Dashboard);
