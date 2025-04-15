import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import Logout from "@mui/icons-material/Logout";
import React, { useState } from "react";

import Avatar from "@mui/material/Avatar";

import { useNavigate } from "react-router-dom";
import Dropdown from "../ProfileDropdown/Dropdown";

import Footer from "../BmsFooter/Footer";
import NotificationList from "../Notification/NotificationList";
import SidebarItems from "../SidebarItems/SidebarItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
// import Dropdown from "./Dropdown";
// import Formsall from "./Formsall";

// import Notifications from "../pages/AdminDashboard/Notifications";
// import Footer from "./Footer";

const BmsLayout = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid, bms } = decoded;
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

  if (bms === "Admin") {
    baseMenuItems.push({
      text: "Admin Dashboard",
      icon: <DashboardCustomizeOutlinedIcon />,
      onClick: () => {
        navigate("/bms-admin-dashboard");
      },
    });
  }

  // Check for restricted admins
  // if (!restrictedAdmins.includes(userid)) {
  //   // Only show Dashboard if userid is not 'soft.admin'
  //   if (userid !== "soft.admin") {
  //     baseMenuItems.splice(2, 0, {
  //       text: "Dashboard",
  //       icon: <DashboardCustomizeOutlinedIcon />,
  //       onClick: () => {
  //         navigate("/dashboard");
  //       },
  //     });
  //   }

  //   // Conditionally add the Admin Dashboard menu item
  //   if (
  //     user_roleid === "2" ||
  //     (user_roleid === "3" && unitsWithAccess.includes(Number(unit))) // Allow super admin to see Admin Dashboard
  //   ) {
  //     baseMenuItems.splice(3, 0, {
  //       text: "Admin Dashboard",
  //       icon: <DashboardCustomizeOutlinedIcon />,
  //       onClick: () => {
  //         navigate("/bms-admin-dashboard");
  //       },
  //     });
  //   }
  // }

  // Add Role-Change item for soft.admin and restricted admins
  // if (restrictedAdmins.includes(userid)) {
  //   baseMenuItems.push({
  //     text: "Role-Change",
  //     icon: <DashboardCustomizeOutlinedIcon />,
  //     onClick: () => {
  //       navigate("/role-id-change");
  //     },
  //   });
  // }

  // Add Super-Admin items if userid is 'soft.admin'
  if (userid === "soft.admin") {
    baseMenuItems.push(
      {
        text: "Role-Change",
        icon: <DashboardCustomizeOutlinedIcon />,
        onClick: () => {
          navigate("/role-id-change");
        },
      },
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
    <div className="flex flex-col h-screen ">
      <div className="flex h-[80px] bg-[url(./assets/menu_header.png)] bg-no-repeat bg-cover shadow-[0_2px_5px_0px_gray] sticky top-0 z-[2]">
        <div className="flex justify-between items-center w-full ml-3 h-20">
          <h1 className="font-bold text-2xl  text-white">Billing Management</h1>
          <div className="flex items-center gap-3 mr-7">
            <FontAwesomeIcon
              onClick={() => {
                navigate(`../home`);
              }}
              icon={faHome}
              className="text-white w-5 h-5 hover:text-gray-300 transition duration-200 cursor-pointer"
            />
            <NotificationList />
            {/* <Dropdown menuItems={baseMenuItems} userid={userid} /> */}
            <Dropdown menuItems={baseMenuItems} userid={userid} />
          </div>
        </div>
      </div>
      <div className="flex flex-grow overflow-auto">
        <div className="flex bg-gradient-to-b from-[#2e429c] to-[#09750e] border-r-2 border-slate-300 shadow-[2px_0px_10px_0px_gray] z-[1]">
          <div className="w-72 sticky top-20">
            <SidebarItems />
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

export default BmsLayout;
