import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Base_api } from "../utils/api/Base_api";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState(""); // State for email input
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;

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

  return (
    <div class="bg-[url('../src/assets/mega.png')] bg-no-repeat bg-cover h-screen">
      <ToastContainer /> {/* Toast container for notifications */}
      <div className="mt-4">
        <h1 className="font-bold text-2xl underline text-center">
          Profile Details
        </h1>

        <div className="flex space-x-3 mt-3">
          <div className="flex items-center">
            <label htmlFor="name1" className="mr-2">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              value={userData.username} // Assuming the API returns a name field
              readOnly
              className="text-[#514f4f] border-2 border-[#d2d2e4] w-full p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="pf" className="mr-2">
              <strong>Employee_PF</strong>
            </label>
            <input
              type="text"
              value={userData.userid} // Assuming the API returns a pf field
              readOnly
              className="text-[#514f4f] border-2 border-[#d2d2e4] w-full p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
            />
          </div>
        </div>

        <div className="flex space-x-3 mt-3">
          <div className="flex items-center">
            <label htmlFor="email" className="mr-3">
              <strong>Email</strong>
            </label>
            <input
              type="text"
              value={email} // Use the email state for the input
              onChange={handleEmailChange} // Update email state on change
              className="text-[#514f4f]  border-2 border-[#d2d2e4] w-full p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="designation" className="mr-4">
              <strong>Designation</strong>
            </label>
            <input
              type="text"
              value={userData.designation} // Assuming the API returns a designation field
              readOnly
              className="text-[#514f4f] border-2 border-[#d2d2e4] w-full p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
            />
          </div>
        </div>

        <div className="flex space-x-3 mt-3">
          <div className="flex items-center">
            <label htmlFor="phone" className="mr-2">
              <strong>
                Phone <br /> No
              </strong>
            </label>
            <input
              type="text"
              value={userData.contactno} // Assuming the API returns a phone field
              readOnly
              className="text-[#514f4f] border-2 border-[#d2d2e4]  p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="doj" className="mr-2">
              <strong>Date of Join</strong>
            </label>
            <input
              type="text"
              value={userData.dateofjoining} // Assuming the API returns a dateOfJoin field
              readOnly
              className="text-[#514f4f] border-2 border-[#d2d2e4]  p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
            />
          </div>
        </div>

        <div className="flex space-x-3 mt-3">
          <div className="flex items-center">
            <label htmlFor="unit" className="mr-6">
              <strong>Unit</strong>
            </label>
            <textarea
              type="text"
              value={userData.unit} // Assuming the API returns a unit field
              readOnly
              className="text-[#514f4f] border-2 border-[#d2d2e4] w-[205px]  p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="branch" className="mr-11">
              <strong>
                Branch/ <br /> Division
              </strong>
            </label>
            <textarea
              type="text"
              value={userData.department} // Assuming the API returns a branch field
              readOnly
              className="text-[#514f4f] border-2 border-[#d2d2e4] w-[205px] p-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
            />
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={handleUpdate} // Call handleUpdate on button click
            className="cursor-pointer border-2 border-green-700 p-2 font-semibold rounded-lg w-1/2 text-center hover:bg-green-700 hover:text-white"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
