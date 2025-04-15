import React from "react";
import { useNavigate } from "react-router-dom";

import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Allformsname = ({ title, path, onClick, disabled }) => {
  const navigate = useNavigate();

  // const handleNavigation = () => {
  //   navigate(path);
  // };

  const handleNavigation = () => {
    if (!disabled) {
      navigate(path);
    }
  };

  return (
    <>
      <div
        onClick={onClick}
        style={{ pointerEvents: disabled ? "none" : "auto" }}
      >
        <h1
          className={`w-80 font-bold text-lg p-2 mb-2 cursor-pointer border-2 ${
            disabled
              ? "border-gray-400 text-gray-400"
              : "border-green-700 text-[#151414] hover:bg-custom-gradient-hover hover:text-white hover:border-white"
          } transition duration-300 rounded-lg shadow-lg`}
          onClick={handleNavigation}
        >
          <FontAwesomeIcon icon={faFile} /> {title}
        </h1>
      </div>
    </>
  );
};

// bg-[#42b883]

export default Allformsname;
