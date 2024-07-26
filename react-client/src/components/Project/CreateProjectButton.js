import React from "react";
import { Link } from "react-router-dom";
const CreateProjectButton = () => {
  return (
    <React.Fragment>
      <Link
        to="/addProject"
        className="btn btn-lg btn-info text-white"
        id="btn-create"
      >
        Tạo dự án
      </Link>
    </React.Fragment>
  );
};
export default CreateProjectButton;
