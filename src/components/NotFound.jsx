import React from "react";
import { useLocation } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  const location = useLocation();

  const underConstruction = ["/careers", "/announcements"];

  const isUnderConstruction = underConstruction.includes(location.pathname);
  const pageName = location.pathname.slice(1);

  const message = {
    careers: "No available opening for now.",
    announcements: "No announcements.",
  };

  const Template = (
    <>
      <h1>{pageName.toUpperCase()}</h1>
      <hr />
      <div className="page-body">
        <h2>{message[`${pageName}`]}</h2>
        <h3>Check again tomorrow</h3>
      </div>
    </>
  );

  return (
    <div className="page-container">
      {isUnderConstruction ? Template : <h1>Not Found</h1>}
    </div>
  );
};

export default NotFound;
