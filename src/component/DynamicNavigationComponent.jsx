import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

const DynamicNavigationComponent = ({ path, title, activePathPrefix }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = () => {
    navigate(path);
  };

  const isPathActive = () => {
    return location.pathname.startsWith(activePathPrefix);
  };

  return (
    <h4
      className={`text-lg mb-2 border p-2 rounded-lg transition-colors duration-300 ${
        isPathActive()
          ? "bg-green-700 text-[#e9e9e9] border-white border-2"
          : "bg-white text-black"
      } hover:bg-green-700 hover:text-white `}
      onClick={handleNavigation}
    >
      {/* <FontAwesomeIcon icon={faFile} />  */}
      {title}
    </h4>
  );
};

export default DynamicNavigationComponent;
