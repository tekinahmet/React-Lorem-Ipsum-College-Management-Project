import React from "react";
import "./page-header.scss";


const PageHeader = ({ title }) => {
  return (
    <div className="page-header">
      <h1>
        <img
          src="../../../public/images/logo/logo.jpg"
          width={50}
          className="rounded-circle me-2"
          alt="Lorem Ipsum College"
        />
        {title}
        <img
          src="../../../public/images/logo/logo.jpg"
          width={50}
          className="rounded-circle ms-2"
          alt="Lorem Ipsum College"
        />
      </h1>
    </div>
  );
};

export default PageHeader;
