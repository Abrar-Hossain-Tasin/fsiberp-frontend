import React, { useEffect, useState } from "react";

const Test = () => {
  const [users, setUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSelectedUser = (user) => {
    setSelectedUser(user.id); // Set only the user ID
  };

  const handleApproveUser = () => {
    if (selectedUser) {
      const userToApprove = users.find((user) => user.id === selectedUser);
      if (userToApprove) {
        setApprovedUsers([...approvedUsers, userToApprove]);
        setUsers(users.filter((user) => user.id !== selectedUser));
        setSelectedUser(null); // Reset selected user after approval
      }
    }
  };

  const handleRemoveUser = () => {
    if (selectedUser) {
      const userToRemove = approvedUsers.find(
        (user) => user.id === selectedUser
      );
      if (userToRemove) {
        setApprovedUsers(
          approvedUsers.filter((user) => user.id !== selectedUser)
        );
        setUsers([...users, userToRemove]); // Add back to the pending users list
        setSelectedUser(null); // Reset selected user after removal
      }
    }
  };

  return (
    <div className="flex flex-grow">
      {/* Pending User List */}
      <div className="flex flex-col gap-2 w-2/5 bg-slate-500">
        <h1 className="text-center text-lg font-[500] text-white">
          Pending User List
        </h1>
        {users.map((user) => (
          <div
            key={user.id}
            className={`p-1 px-5 bg-green-300 cursor-pointer ${
              user.id === selectedUser ? "bg-green-500" : ""
            }`}
            onClick={() => handleSelectedUser(user)}
          >
            <h1>{user.name}</h1>
          </div>
        ))}
      </div>

      {/* Approve/Remove Buttons */}
      <div className="flex gap-2 flex-col w-1/5 bg-slate-600 items-center justify-center">
        <button
          className="bg-slate-400 active:bg-slate-600 hover:bg-slate-500 cursor-pointer p-1 border rounded-md"
          onClick={handleApproveUser}
          disabled={selectedUser === null}
        >
          {">>"}
        </button>
        <button
          className="bg-slate-400 active:bg-slate-600 hover:bg-slate-500 cursor-pointer p-1 border rounded-md"
          onClick={handleRemoveUser}
          disabled={selectedUser === null}
        >
          {"<<"}
        </button>
      </div>

      {/* Approved User List */}
      <div className="flex flex-col gap-2 w-2/5 bg-slate-500">
        <h1 className="text-center text-lg font-[500] text-white">
          Approved User List
        </h1>
        {approvedUsers.map((user) => (
          <div
            key={user.id}
            className={`p-1 px-5 bg-green-300 cursor-pointer ${
              user.id === selectedUser ? "bg-green-500" : ""
            }`}
            onClick={() => handleSelectedUser(user)}
          >
            <h1>{user.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;
