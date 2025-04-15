import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotificationList from "./Notifications";
import Dropdown from "./Dropdown";
import { Avatar } from "@mui/material";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import NavbarImage from "../../assets/mega.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";

const OfficeNoteNavbar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid, onms } = decoded;

  const openModal = () => setIsModalOpen(true);

  const isPathActive = () => {
    return location.pathname.startsWith(id);
  };
  const handleNavigate = (path) => {
    navigate(path);
  };

  let baseMenuItems = [
    {
      text: "Profile",
      icon: <Avatar sx={{ width: 30, height: 30, color: "blue.500" }} />,
      onClick: () => {
        navigate("/erp-profile");
      },
    },
    {
      text: "Change Password",
      icon: <KeyOutlinedIcon />,
      onClick: openModal,
    },
    {
      divider: true,
    },
  ];
  const OfficeNoteButton = ({ title, path }) => {
    const OfficeNoteClassName = `flex justify-center items-center text-lg font-[500] border p-2 rounded-lg transition-colors duration-300 cursor-pointer ${
      isPathActive()
        ? "text-[#e9e9e9] border-white border-2"
        : "bg-transparent text-white border-transparent"
    } hover:text-black`;

    return (
      <a
        // className={OfficeNoteClassName}
        className="relative px-4 pt-2 pb-2 overflow-hidden font-medium text-white bg-transparent rounded-full group cursor-pointer"
        onClick={() => handleNavigate(path)}
      >
        {/* Top border animation */}
        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-300 border-t-2 border-gray-300 group-hover:w-full hover:border-none ease rounded-t-lg"></span>
        {/* Bottom border animation */}
        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-300 border-b-2 border-gray-300 group-hover:w-full hover:border-none ease rounded-b-lg"></span>
        {/* Background animation top */}
        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-300 group-hover:h-full hover:border-none ease rounded-t-lg"></span>
        {/* Background animation bottom */}
        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-300 group-hover:h-full hover:border-none ease rounded-b-lg"></span>
        {/* Overlay effect */}
        <span
          className="absolute inset-0 w-full h-full duration-300 delay-300 opacity-0 group-hover:opacity-100 rounded-full bg-[#69895B]"
          // style={{
          //   background: "linear-gradient(to bottom right, #99B98B, #AA8597)",
          // }}
        ></span>
        {/* Button Text */}
        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease text-md">
          {title}
        </span>
      </a>
    );
  };

  return (
    <div className="w-full h-[70px]">
      <div
        className="flex h-[60px] bg-no-repeat bg-cover shadow-[0_2px_5px_0px_gray] sticky top-0"
        style={{
          background: `
            url(${NavbarImage}) no-repeat center,
            linear-gradient(to right, #021220, #213570, #304EA8, #7887B4)
          `,
          backgroundSize: "cover",
        }}
      >
        <div className="flex justify-between items-center w-full mx-10">
          <h1 className="font-bold text-2xl text-white">
            Office Note Management System
          </h1>
          <div className="flex justify-between items-center">
            <OfficeNoteButton title="Office-Note" path="create-office-note" />
            <OfficeNoteButton title="Dashboard" path="dashboard" />

            {onms === 1 ? (
              <OfficeNoteButton
                title="Admin Dashboard"
                path="admin-dashboard"
              />
            ) : (
              ""
            )}
            <OfficeNoteButton
              title="Memo Dashboard"
              path="board-memo-dashboard"
            />
            <OfficeNoteButton
              title="Memo Admin Dashboard"
              path="board-memo-admin-dashboard"
            />
          </div>
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              onClick={() => {
                navigate(`../home`);
              }}
              icon={faHome}
              className="text-white w-5 h-5 hover:text-gray-300 transition duration-200 cursor-pointer"
            />
            <NotificationList />
            <Dropdown menuItems={baseMenuItems} userid={userid} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeNoteNavbar;
