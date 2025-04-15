import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import Logout from "@mui/icons-material/Logout";
import React, { useState } from "react";

import Avatar from "@mui/material/Avatar";

import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import Formsall from "./Formsall";

import Notifications from "../pages/AdminDashboard/Notifications";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";

const unitsWithAccess = [2, 7, 8, 10, 11, 13];
const divheadWithAccess = [2, 3, 12, 19];

const restrictedAdmins = [
  "system.admin",
  "network.admin",
  "isrm.admin",
  "cbs.admin",
  "soft.admin", // Added soft.admin to the restricted list for Role-Change
];

const Header = ({ children }) => {
  const navigate = useNavigate();
  // const userid = localStorage.getItem("user");

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid, user_roleid, unit, AccessControlUser, department } = decoded;
  // const user_roleid = localStorage.getItem("user_roleid");
  // const department = localStorage.getItem("department");
  // const unit = Number(localStorage.getItem("unit")); // Assuming you have this in localStorage
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Base menu items
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

  // Check for restricted admins
  if (!restrictedAdmins.includes(userid)) {
    // Only show Dashboard if userid is not 'soft.admin'
    if (userid !== "soft.admin") {
      baseMenuItems.splice(2, 0, {
        text: "Dashboard",
        icon: <DashboardCustomizeOutlinedIcon />,
        onClick: () => {
          navigate("/dashboard");
        },
      });
    }

    // Conditionally add the Admin Dashboard menu item
    if (
      user_roleid === 2 ||
      (user_roleid === 3 && unitsWithAccess.includes(unit)) ||
      divheadWithAccess.includes(department) ||
      AccessControlUser === 1
    ) {
      baseMenuItems.splice(3, 0, {
        text: "Admin Dashboard",
        icon: <DashboardCustomizeOutlinedIcon />,
        onClick: () => {
          navigate("/admin-dashboard");
        },
      });
    }
  }

  // Add Role-Change item for soft.admin and restricted admins
  if (restrictedAdmins.includes(userid)) {
    baseMenuItems.push({
      text: "Role-Change",
      icon: <DashboardCustomizeOutlinedIcon />,
      onClick: () => {
        navigate("/role-id-change");
      },
    });
  }

  // Add Super-Admin items if userid is 'soft.admin'
  if (userid === "soft.admin") {
    baseMenuItems.push(
      {
        text: "Functional Role Change",
        icon: <DashboardCustomizeOutlinedIcon />,
        onClick: () => {
          navigate("/functional-role-change");
        },
      },
      {
        text: "Super-Admin Dashboard",
        icon: <DashboardCustomizeOutlinedIcon />,
        onClick: () => {
          navigate("/super-admin-dashboard-allforms");
        },
      }
    );
  }

  // Add the Logout item at the end
  baseMenuItems.push({
    text: "Logout",
    icon: <Logout fontSize="small" />,
    onClick: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("activeTable");

      navigate("/");
    },
  });

  return (
    <div className="flex flex-col h-[100vh]">
      <div className="flex  bg-[url(./assets/menu_header.png)] bg-no-repeat bg-cover shadow-[0_2px_5px_0px_gray] sticky top-0 z-[2]">
        <div className="flex h-[60px] justify-between items-center w-full mx-10">
          <h1 className="font-bold text-2xl p-2 text-white">
            Form Requisition Management
          </h1>
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              onClick={() => {
                navigate(`../home`);
              }}
              icon={faHome}
              className="text-white w-5 h-5 hover:text-gray-300 transition duration-200 cursor-pointer"
            />
            <Notifications />
            <Dropdown menuItems={baseMenuItems} userid={userid} />
          </div>
        </div>
      </div>
      <div className="flex flex-grow overflow-auto">
        <div className="flex bg-gradient-to-b from-[#2e429c] to-[#09750e] border-r-2 border-slate-300 shadow-[2px_0px_10px_0px_gray] z-[1]">
          <div className="w-72 sticky top-20">
            <Formsall />
          </div>
        </div>
        <div className="flex flex-grow justify-center overflow-auto  bg-[url('../src/assets/mega.png')] bg-white bg-cover bg-center">
          {children}
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default Header;
