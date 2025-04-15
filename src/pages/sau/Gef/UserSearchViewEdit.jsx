import { useEffect, useState } from "react";
import { Base_api } from "../../../utils/api/Base_api.jsx";
import { jwtDecode } from "jwt-decode";

const UserSearchViewEdit = ({
  setGrpMemberUserId,
  grpMemberUserId,
  type,
  userId,
}) => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;

  const [filteredOptions, setFilteredOptions] = useState([]);
  const [eligibleUsers, setEligibleUsers] = useState([]);
  const [rows, setRows] = useState([]); // Start with an empty array of rows

  // Fetch eligible users on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/incidentreport/emplist/${userId}`
        );
        const data = await response.json();
        setEligibleUsers(data);
        setFilteredOptions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid]);

  // Update the rows based on grpMemberUserId
  useEffect(() => {
    const initialRows = grpMemberUserId.map((userId) => {
      const user = eligibleUsers.find((user) => user.userid === userId);
      return {
        name: user ? `${user.username} - ${user.userid}` : "",
        email: user ? user.email : "",
        userId: userId,
        showOptions: false,
      };
    });
    setRows(initialRows);
  }, [grpMemberUserId, eligibleUsers]); // Re-run if grpMemberUserId or eligibleUsers change

  // Handle the search input change and filter the eligible users
  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index].name = value;
    updatedRows[index].showOptions = value.trim() !== ""; // Show options when there's a search term
    setRows(updatedRows);

    const filtered = eligibleUsers.filter((item) =>
      item.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  // Handle option click to set username, email, and userId in the respective row
  const handleOptionClick = (username, email, userId, index) => {
    const updatedRows = [...rows];
    updatedRows[index].name = `${username} - ${userId}`; // Set value as "userId - username"
    updatedRows[index].email = email;
    updatedRows[index].userId = userId; // Store userId in the row
    updatedRows[index].showOptions = false; // Hide options after selection
    setRows(updatedRows);

    // Update the grpMemberUserId array in the parent
    updateSelectedUserIds(updatedRows);
    setGrpMemberUserId(updatedRows.map((row) => row.userId)); // Pass the userIds to the parent
    // setGrpMemberUserName(username); // Update the group member name (optional)
  };

  // Update selectedUserIds array
  const updateSelectedUserIds = (updatedRows) => {
    const userIds = updatedRows
      .map((row) => row.userId)
      .filter((userId) => userId !== "");
    setGrpMemberUserId(userIds); // Update grpMemberUserId state in the parent
  };

  // Add a new row
  const handleAddRow = () => {
    setRows([...rows, { name: "", email: "", showOptions: false, userId: "" }]);
  };

  // Remove a row
  const handleRemoveRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    updateSelectedUserIds(updatedRows); // Recalculate selected userIds
  };

  return (
    <div className="my-4">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="border border-black w-1/3">
              <label htmlFor="requesting_unit">Name</label>
            </th>
            <th className="border border-black w-1/3">
              <label htmlFor="email">Email</label>
            </th>
            <th className="border border-black w-1/3">
              <label htmlFor="action">Action</label>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border border-black">
                <div className="relative">
                  <input
                    autoComplete="off"
                    type="text"
                    id={`search-input-${index}`}
                    name="search"
                    className="text-[#3b3838] border-[1px] border-black text-center p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-96 text-sm placeholder-opacity-100"
                    placeholder="Search Here!"
                    value={row.name}
                    onChange={(e) => handleInputChange(e, index)}
                    disabled={type === "view"}
                    required
                  />
                  {row.showOptions && ( // Show results only when showOptions is true for the row
                    <ul className="absolute w-full text-center font-[500] bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                      {filteredOptions.map((item) => (
                        <li
                          key={item.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            handleOptionClick(
                              item.username,
                              item.email,
                              item.userid,
                              index
                            )
                          }
                        >
                          {item.userid} - {item.username}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </td>
              <td className="border border-black text-center">
                <input
                  className="text-[#3b3838] border-[1px] border-black text-center p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-96 text-sm placeholder-opacity-100"
                  value={row.email}
                  disabled={type === "view"}
                  readOnly={type === "view"}
                />
              </td>
              <td className="border border-black text-center">
                {index === 0 ? (
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                    onClick={handleAddRow}
                    disabled={type === "view"}
                  >
                    +
                  </button>
                ) : (
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleRemoveRow(index)}
                    disabled={type === "view"}
                  >
                    -
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserSearchViewEdit;
