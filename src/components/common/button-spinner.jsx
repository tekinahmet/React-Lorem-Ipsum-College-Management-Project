import React from "react";
import { Spinner } from "react-bootstrap";

const ButtonSpinner = (size = "sm", animation = "grow", variant = "danger") => {
  return <Spinner animation={animation} variant={variant} size={size} />;
};

export default ButtonSpinner;
