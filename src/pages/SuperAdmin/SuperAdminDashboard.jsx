// SuperAdminDashboard.js
import React, { useEffect, useState } from "react";
import AddMemberModal from "./AddMemberModal"; // Import the AddMemberModal component
import EditUser from "./EditUser"; // Import the EditUser component
import Pagination from "./Pagination";
import UserSearch from "./UserSearch";

const SuperAdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    userid: "",
    functionalrole: "",
    functionalroleid: "",
    status: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const api = "http://localhost:8081/api";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${api}/admin/members`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      userid: user.userid,
      functionalrole: user.functionalrole,
      functionalroleid: user.functionalroleid,
      status: user.status,
    });
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${api}/admin/members/update/${formData.userid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to update user");

      // Fetch updated user data
      const updatedUsers = await fetch(`${api}/admin/members`);
      const data = await updatedUsers.json();
      setUsers(data);
      setIsModalOpen(false); // Close the modal after updating
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/admin/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add member");

      const updatedUsers = await fetch(`${api}/admin/members`);
      const data = await updatedUsers.json();
      setUsers(data);
      setIsAddMemberModalOpen(false);
      setFormData({
        userid: "",
        functionalrole: "",
        functionalroleid: "",
        status: "",
      });
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOpenAddMemberModal = () => {
    setFormData({
      userid: "",
      functionalrole: "",
      functionalroleid: "",
      status: "",
    }); // Reset formData when opening the Add Member modal
    setIsAddMemberModalOpen(true);
  };

  const filteredUsers = users
    .filter((user) => user.status === "Active") // Filter for Active status
    .filter((user) => {
      const query = searchQuery.toLowerCase();
      return (
        user.userid.toLowerCase().includes(query) ||
        user.functionalrole.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Sort by createdAt in ascending order
  // Sort by createdAt in descending order

  // Pagination Logic
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <>
      <div className="flex flex-col">
        {/* <div className="flex justify-between mt-5">
          <UserSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <button
            onClick={handleOpenAddMemberModal} // Use the new function here
            className="bg-green-500 text-white p-2 rounded"
          >
            Add Member
          </button>
        </div> */}

        <div className="shadow-[0_5px_10px_0px_gray] bg-white p-5 my-7">
          <div className="flex justify-between mb-5">
            <UserSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <div className="">
              <button
                onClick={handleOpenAddMemberModal} // Use the new function here
                className="bg-green-500 text-white p-2 rounded "
              >
                Add Member
              </button>
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th className="px-6 py-2">SL</th>
                <th className="px-6 py-2">UserId</th>
                <th className="px-6 py-2">Functional Role</th>
                <th className="px-6 py-2">Functional Role ID</th>
                <th className="px-6 py-2">Status</th>
                <th className="px-6 py-2">Action</th>
              </tr>
            </thead>

            {/* <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.userid}
                  className="odd:bg-white even:bg-gray-100 border-b text-center"
                >
                  <td className="px-6 py-2">{user.userid}</td>
                  <td className="px-6 py-2">{user.functionalrole}</td>
                  <td className="px-6 py-2">{user.functionalroleid}</td>
                  <td className="px-6 py-2">{user.status}</td>
                  <td className="px-6 py-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      // onClick={() => handleDelete(user.userid)}
                      className="text-red-500 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody> */}

            <tbody>
              {currentUsers.map((user, index) => (
                <tr
                  key={user.userid}
                  className="odd:bg-white even:bg-gray-100 border-b text-center"
                >
                  <td>{index + 1}</td> {/* Auto-incrementing SL column */}
                  <td className="px-6 py-2">{user.userid}</td>
                  <td className="px-6 py-2">{user.functionalrole}</td>
                  <td className="px-6 py-2">{user.functionalroleid}</td>
                  <td className="px-6 py-2">{user.status}</td>
                  <td className="px-6 py-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                    {/* <button className="text-red-500 ml-2">Delete</button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          totalItems={filteredUsers.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white p-5 rounded shadow-lg">
            <EditUser
              formData={formData}
              handleChange={handleChange}
              handleUpdate={handleUpdate}
              handleCancel={handleCancel}
            />
          </div>
        </div>
      )}

      <AddMemberModal
        isOpen={isAddMemberModalOpen}
        handleClose={() => setIsAddMemberModalOpen(false)}
        handleAdd={handleAdd}
        formData={formData}
        handleChange={handleChange}
      />
    </>
  );
};

export default SuperAdminDashboard;
