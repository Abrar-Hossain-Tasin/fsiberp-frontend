import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import OfficeNoteFooter from "../OfficeNoteFooter";
import OfficeNoteNavbar from "../OfficeNoteNavbar";

const OfficeNoteDashboardLayout = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isPathActive = () => {
    return location.pathname.startsWith(id);
  };
  const handleNavigate = (path) => {
    navigate(path);
  };

  const OfficeNoteButton = ({ title, path }) => {
    const OfficeNoteClassName = `text-lg font-[500] mb-2 border p-2 rounded-lg transition-colors duration-300 cursor-pointer ${
      isPathActive()
        ? "bg-green-700 text-[#e9e9e9] border-white border-2"
        : "bg-white text-black"
    } hover:bg-green-700 hover:text-white `;
    return (
      <h1 className={OfficeNoteClassName} onClick={() => handleNavigate(path)}>
        {title}
      </h1>
    );
  };

  return (
    <div className="flex flex-col h-[100vh]">
      <OfficeNoteNavbar />
      <div className="flex flex-grow overflow-auto">
        <div className="flex flex-grow justify-center overflow-auto  bg-[url('../src/assets/mega.png')] bg-white bg-cover bg-center">
          {<Outlet />}
        </div>
      </div>
      <div>
        <OfficeNoteFooter />
      </div>
    </div>
  );
};

export default OfficeNoteDashboardLayout;
