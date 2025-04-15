import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { encryptId } from "../../../pages/AdminDashboard/encryption/Encrypted";
import { Base_api } from "../../../utils/api/Base_api";

const NotificationList = () => {
  // const userid = localStorage.getItem("user");
  // const user_roleid = localStorage.getItem("user_roleid");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/bms/notifications/${userid}`
        );
        const data = await response.json();
        // console.log("Fetched notifications:", data); // Log the fetched data

        // Sort notifications by createdAt in descending order
        const sortedNotifications = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotifications(sortedNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [userid]);

  const handleNotificationClick = async (notification) => {
    const { fuserid, formid, submissionId } = notification; // Destructure properties

    // Check if any of the values are null or undefined
    if (!fuserid || !formid || !submissionId) {
      console.error("Missing values:", { fuserid, formid, submissionId });
      alert("Some notification details are missing.");
      return; // Exit if any value is missing
    }

    // Update the notification status to viewed
    setNotifications((prevNotifications) =>
      prevNotifications.map((n) =>
        n.id === notification.id ? { ...n, viewed: true } : n
      )
    );

    // Navigate using properties from the clicked notification
    navigate(
      `/bms/view/${encryptId(fuserid)}/${encryptId(formid)}/${encryptId(
        submissionId
      )}`
    );

    // Optionally update the notification status on the server
    await fetch(`${Base_api}/api/bms/notifications/view/${notification.id}`, {
      method: "PUT",
    });
    setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev); // Toggle state using the previous state
  };

  const handleClickOutside = (event) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setShowNotifications(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button onClick={toggleNotifications} className="p-2 cursor-pointer">
        <div className="relative">
          <NotificationsActiveIcon className="text-white text-2xl hover:text-gray-300 transition duration-200 cursor-pointer" />
          {notifications.filter((notification) => !notification.viewed).length >
            0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
              {
                notifications.filter((notification) => !notification.viewed)
                  .length
              }
            </span>
          )}
        </div>
      </button>

      {showNotifications && (
        <div
          ref={notificationRef}
          className="absolute right-0 mt-1 w-72 bg-white  shadow-[0_5px_10px_0px_gray] rounded-lg z-10"
        >
          <h2 className="text-lg font-bold mb-1 p-4 border-b">Notifications</h2>
          <ul className="max-h-60 overflow-y-auto space-y-2 p-2">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`p-2 rounded-lg cursor-pointer transition duration-200 ${
                  notification.viewed ? "bg-white" : "bg-[#93b8f5]"
                } hover:bg-gray-200`}
              >
                <p className="text-gray-700">{notification.message}</p>
                <span className="text-sm text-gray-500">
                  {new Date(notification.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationList;
