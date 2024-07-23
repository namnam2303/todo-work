import { hover } from "@testing-library/user-event/dist/hover";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ProjectItem extends Component {
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
                    <li className="list-group-item delete">
                      <i className="fa fa-minus-circle pr-1">
                        {" "}
                        <React.Fragment>
                          <Link
                            to={`http:localhost:8080//${project.projectIdentifier}`}
                            className="btn"
                            style={({ color: "red" }, { border: "none" })}
                          >
                            Detelte
                          </Link>
                        </React.Fragment>
                      </i>
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
