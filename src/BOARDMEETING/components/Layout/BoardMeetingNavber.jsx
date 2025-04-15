import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotificationList from "../Notifications";
import BoardMeetingSidebar from "./BoardMeetingSidebar";
import Dropdown from "../Dropdown";
import { Avatar } from "@mui/material";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import NavbarImage from '../../../assets/mega.png'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";

const BoardMeetingNavber = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid, onms } = decoded;

  const openModal = () => setIsModalOpen(true);

  

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


  return (
    <div className="w-full h-[70px]">
      <div
        className="flex h-[60px] bg-no-repeat bg-cover shadow-[0_2px_5px_0px_gray] sticky top-0"
        style={{
          background: `
            url(${NavbarImage}) no-repeat center,
            linear-gradient(to right, #073810, #0b5018, #137b26, #189e30)
          `,
          backgroundSize: "cover",
        }}
      >
        <div className="flex justify-between items-center w-full mx-10">
          <div className="flex items-center "> {/* Flex container for sidebar and title */}
            <BoardMeetingSidebar />
            <h1 className="font-bold text-2xl text-white">
              Board Meeting Management
            </h1>
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

export default BoardMeetingNavber;
