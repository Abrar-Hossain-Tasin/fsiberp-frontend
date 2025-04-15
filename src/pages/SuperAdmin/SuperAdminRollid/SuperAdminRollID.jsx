import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Base_api } from "../../../utils/api/Base_api";

const SuperAdminRollID = () => {
  const [userid, setSearchTerm] = useState(""); // To store the user input
  const [userData, setUserData] = useState(null); // To store fetched user data
  const [error, setError] = useState(null); // To store any error messages
  const [isModalOpen, setIsModalOpen] = useState(false); // To handle modal visibility
  const [newRoleId, setNewRoleId] = useState(""); // To store selected new role ID
  const [hours, setHours] = useState(""); // To store hours
  const [selectedUserId, setSelectedUserId] = useState(null); // To store selected user ID for editing

  // Function to handle search and fetch user data
  const handleSearch = async () => {
    if (!userid) {
      setError("Please enter a valid user ID");
      return;
    }

    try {
      setError(null); // Clear previous error
      const response = await fetch(`${Base_api}/api/users/${userid}`);

      if (!response.ok) {
        throw new Error("User not found");
      }

      const data = await response.json();
      setUserData(data); // Set fetched user data
    } catch (err) {
      setError(err.message);
      setUserData(null); // Clear user data if there's an error
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Function to handle opening the modal
  const handleEditClick = (userId) => {
    setSelectedUserId(userId); // Set the user ID for editing
    setNewRoleId(userData.roleid); // Set the current role ID for the modal
    setIsModalOpen(true); // Open the modal
  };

  // Function to handle submitting the modal form
  const handleSubmit = async () => {
    if (!newRoleId || !hours) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        `${Base_api}/api/admin/members/temporarily-update-role/${selectedUserId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newRoleId: parseInt(newRoleId), // Ensure newRoleId is a number
            hours: parseInt(hours), // Ensure hours is a number
          }),
        }
      );

      if (!response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update role");
        } else {
          const errorText = await response.text();
          throw new Error(errorText || "Failed to update role");
        }
      }

      // Successfully updated role
      toast.success("Role updated successfully", { autoClose: 2000 });
      setIsModalOpen(false); // Close the modal after successful submission

      // Update userData with new roleId
      setUserData((prevData) => ({
        ...prevData,
        roleid: parseInt(newRoleId), // Update the roleid with the newRoleId
      }));

      setNewRoleId(""); // Clear role id
      setHours(""); // Clear hours field
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error updating role");
    }
  };

  return (
    <>
      <div>
        {/* Search Input */}
        <div className="my-4 ml-5">
          <input
            type="text"
            placeholder="Search by User ID"
            value={userid}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress} // Trigger search on "Enter" key press
            className="px-4 py-2 border rounded-md"
          />
          <button
            onClick={handleSearch}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Search
          </button>
        </div>

        {/* Display Error if Any */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Table to Display Data */}
        <div className="relative overflow-hidden shadow-[0_5px_10px_0px_gray] sm:rounded-lg bg-white p-2">
          <table
            className="mx-5 w-full text-sm text-left rtl:text-right text-gray-500 mt-5"
            style={{ width: "800px" }}
          >
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 text-center">
              <tr>
                <th className="px-6 py-2" style={{ width: "50px" }}>
                  SL
                </th>
                <th className="px-6 py-2" style={{ width: "100px" }}>
                  User ID
                </th>
                <th className="px-6 py-2" style={{ width: "150px" }}>
                  User Name
                </th>
                <th className="px-6 py-2" style={{ width: "200px" }}>
                  Designation
                </th>
                <th className="px-6 py-2" style={{ width: "150px" }}>
                  Department
                </th>
                <th className="px-6 py-2" style={{ width: "100px" }}>
                  Branch Code
                </th>
                <th className="px-6 py-2" style={{ width: "100px" }}>
                  Role
                </th>
                <th className="px-6 py-2" style={{ width: "100px" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {/* Render user data */}
              {userData ? (
                <tr>
                  <td className="px-6 py-2">1</td>
                  <td className="px-6 py-2">{userData.userid}</td>
                  <td className="px-6 py-2">{userData.username}</td>
                  <td className="px-6 py-2">{userData.designation}</td>
                  <td className="px-6 py-2">{userData.department}</td>
                  <td className="px-6 py-2">{userData.branchcode}</td>
                  <td className="px-6 py-2">
                    {userData.roleid === 2
                      ? "Admin-(2)"
                      : userData.roleid === 3
                      ? "User-(3)"
                      : "Unknown Role"}
                  </td>
                  <td className="px-6 py-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => handleEditClick(userData.userid)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td className="px-6 py-2" colSpan="8">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-lg w-[400px]">
            <h2 className="text-xl mb-4">Update Role</h2>
            <div className="mb-4">
              <label className="block mb-1">New Role ID</label>
              <select
                value={newRoleId}
                onChange={(e) => setNewRoleId(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="">Select Role</option>
                <option value="2">Admin</option>
                <option value="3">User</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Hours</label>
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-400 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
};

export default SuperAdminRollID;
