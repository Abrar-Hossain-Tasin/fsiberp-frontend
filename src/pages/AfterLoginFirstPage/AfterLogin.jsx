import {
  faFileInvoiceDollar,
  faFileLines,
  faFileWord,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../component/Footer";

import { Base_api } from "../../utils/api/Base_api";
import { jwtDecode } from "jwt-decode";
import ChangePasswordModal from "../../component/ChangePasswordModal";

const AfterLogin = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState(""); // State for username
  const dropdownRef = useRef(null);

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid, cito, user_roleid, bcsuser } = decoded;

  const handleBMSClick = () => {
    navigate("/bms-user-dashboard");
  };
  const handleOfficeNoteSelection = () => {
    navigate("/office-note");
  };
  const handleBoardMeetingsSelection = () => {
    navigate("/board-meetings");
  };

  const handleSelection = (selection) => {
    if (selection === "FRMS") {
      if (userid == cito) {
        navigate("/admin-dashboard");
      } else if (user_roleid === 3 || user_roleid === 2) {
        navigate("/dashboard");
      } else if (user_roleid === 1) {
        navigate("/role-id-change");
      }
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleDropdownOption = (option) => {
    setDropdownOpen(false);
    if (option === "Profile") {
      navigate("/erp-profile");
    } else if (option === "Change Password") {
      navigate("/home-change-password");
    } else if (option === "Logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("activeTable");
      navigate("/");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch username on component mount
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch(`${Base_api}/api/users/${userid}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsername(data.username); // Set username from response
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    if (userid) {
      fetchUsername();
    }
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen bg-[url('../src/assets/mega.png')] bg-white">
        {/* Navbar */}
        <div>
          <nav
            className="sticky flex justify-between items-center p-2 text-white shadow-md"
            // style={{
            //   background:
            //     "linear-gradient(to right, #14270A, #1D3A0E, #6F7D67, #94A78A)",
            // }}
            style={{
              background:
                "linear-gradient(to right, #38761D, #55863F, #92AC86)",
            }}
          >
            <div className="font-extrabold font-pop text-xl ml-10 text-white p-2">
              সংকলন
            </div>
            <div className="flex gap-5 items-center">
              <FontAwesomeIcon
                onClick={() => {
                  navigate(`../home`);
                }}
                icon={faHome}
                className="text-white w-5 h-5 hover:text-gray-300 transition duration-200 cursor-pointer"
              />
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center shadow-[0_0_7px_black] bg-white  font-semibold py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-600 focus:outline-none hover:text-white text-black"
                >
                  <span className="mr-2">{username || "User"}</span>
                  {/* <FontAwesomeIcon icon={faUserCircle} className="text-xl" />{" "} */}
                  {/* Optional icon */}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                    <ul>
                      <li
                        onClick={() => handleDropdownOption("Profile")}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      >
                        Profile
                      </li>
                      <li
                        onClick={() => handleDropdownOption("Change Password")}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      >
                        Change Password
                      </li>
                      <li
                        onClick={() => handleDropdownOption("Logout")}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
        {/* Container */}

        <div className="flex-grow">
          <div className="flex justify-center items-center flex-grow h-full">
            <div className="flex gap-10 items-center">
              <div
                className="w-60 h-80 cursor-pointer shadow-[0_0_20px_black] hover:shadow-[0_0_20px_black] rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col items-center p-8"
                style={{
                  background: "linear-gradient(to right, #4a216a , #7d5a97)",
                }}
                onClick={handleBMSClick}
              >
                <FontAwesomeIcon
                  icon={faFileInvoiceDollar}
                  className="text-white text-6xl mb-4"
                />
                <h2 className="text-2xl font-bold text-white italic">BMS</h2>
                <h3 className="text-lg font-medium text-gray-200 mt-1 text-center italic">
                  Billing Management System
                </h3>
                <button className=" italic mt-4 shadow-[0_0_10px rgba(0, 0, 0, 0.5)] bg-white font-semibold text-black py-2 px-4 rounded hover:bg-gray-200 cursor-pointer transition-colors duration-300">
                  Go to BMS
                </button>
              </div>

              <div
                className="w-60 h-80 cursor-pointer shadow-[0_0_20px_black] hover:shadow-[0_0_20px_black] rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col items-center p-8"
                style={{
                  background: "linear-gradient(to right, #4a216a , #04616E)",
                }}
                onClick={() => handleSelection("FRMS")}
              >
                <FontAwesomeIcon
                  icon={faFileLines}
                  className="text-white text-6xl mb-4"
                />
                <h2 className="text-2xl font-bold text-white italic">FRMS</h2>
                <h3 className="text-lg font-medium text-gray-200 mt-1 text-center italic">
                  Form Requisition Management System
                </h3>
                <button className="italic mt-4 shadow-[0_0_10px rgba(0, 0, 0, 0.5)] bg-white font-semibold text-black py-2 px-4 rounded hover:bg-gray-200 cursor-pointer transition-colors duration-300">
                  Go to FRMS
                </button>
              </div>

              <div
                className="w-60 h-80 cursor-pointer shadow-[0_0_20px_black] hover:shadow-[0_0_20px_black] rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col items-center p-8"
                style={{
                  background: "linear-gradient(to right, #539566  , #04616E )",
                }}
                onClick={() => handleOfficeNoteSelection()}
              >
                <FontAwesomeIcon
                  icon={faFileWord}
                  className="text-white text-6xl mb-4"
                />
                <h2 className="text-2xl font-bold text-white italic">ONMS</h2>
                <h3 className="text-lg font-medium text-gray-200 mt-1 text-center italic">
                  Office Note Management System
                </h3>
                <button className="italic mt-4 shadow-[0_0_10px rgba(0, 0, 0, 0.5)] bg-white font-semibold text-black py-2 px-4 rounded hover:bg-gray-200 cursor-pointer transition-colors duration-300">
                  Go to ONMS
                </button>
              </div>
              
              <div
                className="w-60 h-80 cursor-pointer shadow-[0_0_20px_black] hover:shadow-[0_0_20px_black] rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col items-center p-8"
                style={{
                  background: "linear-gradient(to right, #566139  , #04616E )",
                }}
                // onClick={() => handleBoardMeetingsSelection()}
                onClick={() => {
                  if (bcsuser === '1') {
                    // Allow access to Board Meetings
                    handleBoardMeetingsSelection();
                  } else {
                    // Show alert and do not enter the field
                    alert("You do not have permission to enter Board Meetings.");
                    return; // Ensure no further action is taken
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={faFileWord}
                  className="text-white text-6xl mb-4"
                />
                <h2 className="text-2xl font-bold text-white italic">BM</h2>
                <h3 className="text-lg font-medium text-gray-200 mt-1 text-center italic">
                  Board Meetings
                </h3>
                <button className="italic mt-4 shadow-[0_0_10px rgba(0, 0, 0, 0.5)] bg-white font-semibold text-black py-2 px-4 rounded hover:bg-gray-200 cursor-pointer transition-colors duration-300">
                  Go to BM
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AfterLogin;
