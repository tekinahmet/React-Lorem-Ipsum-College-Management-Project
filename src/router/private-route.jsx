import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, roles }) => {
  //merkezi state e ulasmak  icin useSelector hook kullaniyoruz
  const { isUSerLogin, user } = useSelector((state) => state.auth);

  if (!isUSerLogin) return <Navigate to="/login" />;

  if (!roles || !Array.isArray(roles) || !roles.includes(user.role))
    return <Navigate to="/unauthorized" />;

  return children;
};

export default PrivateRoute;
