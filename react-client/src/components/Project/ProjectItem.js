import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProject } from "../../actions/projectAction";

class ProjectItem extends Component {
  onDeleteClick = (id) => {
    this.props.deleteProject(id);
  };
  render() {
    const { project } = this.props;
    return (
      <div>
        {
          //<!-- Project Item Component -->
        }
        <div className="container">
          <div className="card card-body bg-light mb-3">
            <div className="row">
              <div className="col-2">
                <span className="mx-auto">{project.projectIdentifier}</span>
              </div>
              <div className="col-lg-6 col-md-4 col-8">
                <h3>{project.projectName}</h3>
                <h6>{project.description}</h6>
              </div>
              <div className="col-md-4 d-none d-lg-block">
                <ul className="list-group">
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1">Project Board </i>
                  </li>

                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1">
                      <React.Fragment>
                        <Link
                          to={`/updateProject/${project.projectIdentifier}`}
                          className="btn"
                          style={({ color: "#18a2b9" }, { border: "none" })}
                        >
                          Update
                        </Link>
                      </React.Fragment>
                    </i>
                  </li>
                  <a href="">
                    <li
                      className="list-group-item delete"
                      onClick={this.onDeleteClick.bind(
                        this,
                        project.projectIdentifier
                      )}
                    >
                      <i className="fa fa-minus-circle pr-1">Delete</i>
                    </li>
                  </a>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {
          //<!-- End of Project Item Component -->
        }
      </div>
    );
  }
}
ProjectItem.propTypes = {
  deleteProject: PropTypes.func.isRequired,
};

export default connect(null, { deleteProject })(ProjectItem);
