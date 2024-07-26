import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProject } from "../../actions/projectAction";
import { confirmAlert } from "react-confirm-alert"; // Import thư viện
import "react-confirm-alert/src/react-confirm-alert.css"; // Import CSS

class ProjectItem extends Component {
  onDeleteClick = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Do you want to delete the project and data relate to it?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.deleteProject(id),
          className: "btn",
        },
        {
          label: "No",
          onClick: () => {},
          className: "btn",
        },
      ],
    });
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
                  <Link to={`/projectBoard/${project.projectIdentifier}`}>
                    <li className="list-group-item board">
                      <i className="fa fa-flag-checkered pr-1"> Chi tiết</i>
                    </li>
                  </Link>

                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1">
                      <React.Fragment>
                        <Link
                          to={`/updateProject/${project.projectIdentifier}`}
                          className="no-underline"
                        >
                          <i class="bi bi-box-arrow-in-down fa"> Cập nhật</i>
                        </Link>
                      </React.Fragment>
                    </i>
                  </li>
                  <li
                    className="list-group-item delete"
                    onClick={() =>
                      this.onDeleteClick(project.projectIdentifier)
                    }
                  >
                    <i className="fa fa-minus-circle pr-1"> Xóa</i>
                  </li>
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
