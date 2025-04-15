import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Base_api } from "../utils/api/Base_api";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const ProfileErp = () => {
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState(""); // State for email input

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState(""); // State for username
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${Base_api}/api/users/${userid}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserData(data);
        setEmail(data.email); // Set initial email state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userid]);

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

  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Update email state on input change
  };

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@fsiblbd\.com$/; // Regex for validating the email
    return regex.test(email);
  };

  const handleUpdate = async () => {
    if (!isValidEmail(email)) {
      toast.error("Please provide your official email, e.g., abc@fsiblbd.com", {
        autoClose: 2000,
      });
      return; // Exit early if the email is not valid
    }
    try {
      const response = await fetch(
        `http://localhost:8081/api/users/${userid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }), // Send updated email
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update email");
      }

      const updatedData = await response.json();
      setUserData(updatedData); // Update local state with new data
      toast.success("Your profile has been updated successfully!", {
        autoClose: 2000,
      }); // Show success toast
    } catch (error) {
      console.error("Error updating email:", error);
      toast.error("Error updating your profile.", { autoClose: 2000 }); // Show error toast
    }
  };

  if (!userData) {
    return <div>Loading...</div>; // Show a loading state while fetching
  }

  // dropdown
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

  return (
    <div className="bg-[url('../src/assets/mega.png')] bg-no-repeat bg-cover h-screen">
      <ToastContainer /> {/* Toast container for notifications */}
      <div className="flex flex-col h-full ">
        <div>
          <nav
            className="sticky flex justify-between items-center p-2 text-white shadow-md"
            style={{
              background:
                "linear-gradient(to right, #38761D,  #446B32, #55863F)",
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
              />{" "}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center bg-white  font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 hover:bg-gray-600 focus:outline-none hover:text-white text-black"
                >
                  <span className="mr-2">{userData.username || "User"}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg transition-transform transform scale-95 origin-top-right">
                    <ul className="divide-y divide-gray-200">
                      <li
                        onClick={() => handleDropdownOption("Profile")}
                        className="px-4 py-3 hover:bg-green-100 cursor-pointer transition duration-200"
                      >
                        <strong className="text-green-700">Profile</strong>
                      </li>
                      <li
                        onClick={() => handleDropdownOption("Change Password")}
                        className="px-4 py-3 hover:bg-green-100 cursor-pointer transition duration-200"
                      >
                        <strong className="text-green-700">
                          Change Password
                        </strong>
                      </li>
                      <li
                        onClick={() => handleDropdownOption("Logout")}
                        className="px-4 py-3 hover:bg-green-100 cursor-pointer transition duration-200"
                      >
                        <strong className="text-green-700">Logout</strong>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
        <div className="flex justify-center items-center flex-grow">
          <div className="flex justify-center items-center gap-2 flex-col w-1/2 bg-slate-100 rounded shadow-[0_0_4px_gray] p-5">
            <h1 className="font-bold text-2xl text-center text-slate-800">
              Profile Details
            </h1>
            <div className="flex justify-center w-full">
              <div
                className="flex justify-center items-center bg-slate-200 flex-col text-center w-2/3 p-5 relative"
                style={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  className="absolute inset-0 opacity-50 bg-[url(./assets/bank_img.png)]"
                  style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>

                <div className="z-50 flex flex-col items-center">
                  <div className="flex justify-center items-center w-24 h-24 transform hover:scale-110 transition duration-500 rounded-[50%] bg-white hover:bg-slate-300 hover:shadow-[0_0_5px_gray] border-[5px] border-slate-800 font-[500] text-[30pt] text-slate-700 cursor-pointer">
                    {userData.username.charAt(0) +
                      userData.username.split(" ")[1].charAt(0)}
                  </div>
                  <h1
                    className="text-xl font-[500] text-black"
                    style={{ fontWeight: "700" }}
                  >
                    {userData.username}
                  </h1>
                  <h1
                    className="text-md font-[500] text-black"
                    style={{ fontWeight: "600" }}
                  >
                    {userData.designation}
                  </h1>
                </div>
              </div>
              <div className="w-2/3 p-5 bg-slate-800 ">
                <div>
                  <h1 className="text-xl font-[500] text-white">
                    Name : {userData.username}
                  </h1>
                  <h1 className="text-md font-[500] text-white">
                    Designation : {userData.designation}
                  </h1>
                  <h1 className="text-md font-[500] text-white">
                    PF ID : {userData.userid}
                  </h1>
                  <h1 className="text-md font-[500] text-white">
                    Phone : {userData.contactno}
                  </h1>
                  <div className="text-md font-[500] text-white">
                    Email :{" "}
                    <input
                      type="text"
                      value={email} // Use the email state for the input
                      onChange={handleEmailChange} // Update email state on change
                      className="px-1 bg-slate-300 rounded text-black"
                    />
                  </div>
                  <h1 className="text-md font-[500] text-white">
                    Joining Date : {userData.dateofjoining}
                  </h1>
                  <h1 className="text-md font-[500] text-white">
                    Unit : {userData.unit}
                  </h1>
                  <h1 className="text-md font-[500] text-white">
                    Branch / Division : {userData.department}
                  </h1>
                </div>
              </div>
            </div>
            <button
              onClick={handleUpdate} // Call handleUpdate on button click
              className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
            >
              Update Email
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ProfileErp;
