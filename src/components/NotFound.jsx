import React from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  const underConstruction = ["/careers", "/announcements"];

  const isUnderConstruction = underConstruction.includes(location.pathname);

  return (
    <div>
      {isUnderConstruction ? (
        <h1>{location.pathname.slice(1, -1).toUpperCase()}</h1>
      ) : (
        <h1>Not Found</h1>
      )}
    </div>
  );
};

export default NotFound;
