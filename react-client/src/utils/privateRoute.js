import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  if (auth.isAuthenticated) {
    return <Component {...rest} />;
  } else {
    return <Navigate to="/login" />;
  }
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  component: PropTypes.elementType.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
