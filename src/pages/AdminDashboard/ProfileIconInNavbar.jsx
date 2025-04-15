import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faKey,
  faTachometerAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar"; // This remains for the avatar icon

const ProfileIconInNavbar = ({
  userid,
  user_roleid,
  unitsWithAccess,
  unit,
  openModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const baseMenuItems = [
    {
      text: "Profile",
      icon: <Avatar sx={{ width: 30, height: 30, color: "blue.500" }} />,
      onClick: () => {
        navigate("/profile");
      },
    },
    ...(userid === "soft.admin"
      ? []
      : [
          {
            text: "Dashboard",
            icon: <FontAwesomeIcon icon={faTachometerAlt} />,
            onClick: () => {
              navigate("/dashboard");
            },
          },
        ]),
    {
      text: "Change Password",
      icon: <FontAwesomeIcon icon={faKey} />,
      onClick: openModal,
    },
    {
      divider: true,
    },
  ];

  // Conditionally add the Admin Dashboard menu item
  if (
    user_roleid === "2" ||
    (user_roleid === "3" && unitsWithAccess.includes(Number(unit)))
  ) {
    baseMenuItems.splice(2, 0, {
      text: "Admin Dashboard",
      icon: <FontAwesomeIcon icon={faTachometerAlt} />,
      onClick: () => {
        navigate("/admin-dashboard");
      },
    });
  }

  // Add Super-Admin items if userid is 'soft.admin'
  if (userid === "soft.admin") {
    baseMenuItems.push(
      {
        text: "Functional Role Change",
        icon: <FontAwesomeIcon icon={faTachometerAlt} />,
        onClick: () => {
          navigate("/functional-role-change");
        },
      },
      {
        text: "Super-Admin Dashboard",
        icon: <FontAwesomeIcon icon={faTachometerAlt} />,
        onClick: () => {
          navigate("/super-admin-dashboard-allforms");
        },
      },
      {
        text: "Role-Change",
        icon: <FontAwesomeIcon icon={faTachometerAlt} />,
        onClick: () => {
          navigate("/role-id-change");
        },
      }
    );
  }

  // Add the Logout item at the end
  baseMenuItems.push({
    text: "Logout",
    icon: <FontAwesomeIcon icon={faSignOutAlt} />,
    onClick: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("activeTable");
      navigate("/");
    },
  });

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="focus:outline-none">
        <FontAwesomeIcon icon={faUserCircle} className="text-4xl text-white" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
          <ul className="py-2">
            {baseMenuItems.map((item, index) => {
              if (item.divider) {
                return <hr key={index} className="my-2" />;
              }
              return (
                <li key={index}>
                  <button
                    onClick={item.onClick}
                    className="flex items-center px-4 py-2 hover:bg-gray-200 w-full text-left"
                  >
                    {item.icon}
                    <span className="ml-2">{item.text}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileIconInNavbar;
