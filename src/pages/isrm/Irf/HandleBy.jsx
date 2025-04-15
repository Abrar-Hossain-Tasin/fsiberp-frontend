import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Base_api } from "../../../utils/api/Base_api.jsx";

const HandleBy = ({ setHandleByUserId, handleByUserId }) => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;

  const [filteredOptions, setFilteredOptions] = useState([]);
  const [eligibleUsers, setEligibleUsers] = useState([]);
  const [rows, setRows] = useState([
    {
      name: "",
      extraUserName: "",
      email: "",
      userId: "",
      designation: "",
      contactno: "",
      showOptions: false,
    },
  ]);
  const [selectedUserIds, setSelectedUserIds] = useState([]); // To store all selected userIds

  // Fetch eligible users on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/incidentreport/emplist/${userid}`
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

  const handleInputChange = (e, index, row) => {
    const { value } = e.target;

    // Copy the rows to update the input field value
    const updatedRows = [...rows];
    updatedRows[index].name = value;

    // Show options when there's a search term
    updatedRows[index].showOptions = value.trim() !== "";
    setRows(updatedRows);

    // Filter eligible users based on the search input value
    const filtered = eligibleUsers.filter((item) =>
      item.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);

    // Ensure extraUserName is initialized as an array if not already
    if (!Array.isArray(updatedRows[index].extraUserName)) {
      updatedRows[index].extraUserName = []; // Initialize as empty array if it's not already an array
    }

    // Get the existing extraUserName array for the current row
    const updatedExtraUserNames = [...updatedRows[index].extraUserName];

    // Only push the value if it doesn't already exist for this row
    if (value && !updatedExtraUserNames.includes(value)) {
      updatedExtraUserNames.push(value);
    }

    // Update the extraUserName for the current row (preserve previous values)
    updatedRows[index].extraUserName = updatedExtraUserNames;

    // Merge all selectedUserIds with the extraUserName for all rows and ensure uniqueness
    const updatedName = [
      ...new Set([
        // You can uncomment the following line if selectedUserIds needs to be included:
        // ...selectedUserIds,
        ...updatedRows.map((row) => row.name).filter((name) => name),
      ]),
    ];

    // Update handleByUserId with the merged array
    setHandleByUserId(updatedName);
    updatedName;
    // Debug: Log to check the final value of handleByUserId
    updatedName;
  };

  // Handle option click to set username, email, and userId in the respective row
  const handleOptionClick = (
    username,
    designation,
    contactno,
    userId,
    index
  ) => {
    const updatedRows = [...rows];
    updatedRows[index].name = `${username} - ${userId}`; // Set value as "userId - username"
    updatedRows[index].userId = userId; // Store userId in the row
    updatedRows[index].designation = designation;
    updatedRows[index].contactno = contactno;
    updatedRows[index].showOptions = false; // Hide options after selection
    setRows(updatedRows);

    // Update the grpMemberUserId array
    updateSelectedUserIds(updatedRows);

    setHandleByUserId(updatedRows.map((row) => row.name)); // Pass the userIds to the parent
    handleByUserId;
  };

  // Update selectedUserIds array
  const updateSelectedUserIds = (updatedRows) => {
    const userIds = updatedRows
      .map((row) => row.userId)
      .filter((userId) => userId !== "");
    setSelectedUserIds(userIds);
  };

  // Add a new row
  const handleAddRow = (e) => {
    e.preventDefault();
    setRows([
      ...rows,
      {
        name: "",
        extraUserName: "",
        email: "",
        userId: "",
        designation: "",
        contactno: "",
        showOptions: false,
      },
    ]);
  };

  // Remove a row
  const handleRemoveRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    updateSelectedUserIds(updatedRows); // Recalculate selected userIds
    const userIds = updatedRows
      .map((row) => row.userId)
      .filter((userId) => userId !== "");
    setHandleByUserId(userIds);
  };

  // Hide the options when onBlur is triggered based on the row index
  const isShowOption = (index) => {
    const updatedRows = [...rows];
    updatedRows[index].showOptions = false; // Hide options when onBlur is triggered
    setRows(updatedRows);
  };

  return (
    <div className="my-4">
      <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md my-5">
        Incident Handled By
      </h4>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="border border-black w-1/2">
              <label htmlFor="requesting_unit">S. No.</label>
            </th>
            <th className="border border-black w-1/2">
              <label htmlFor="requesting_unit">Name</label>
            </th>

            <th className="border border-black w-1/2">
              <label htmlFor="email">Designation</label>
            </th>
            <th className="border border-black w-1/2">
              <label htmlFor="email">Contact No.</label>
            </th>
            <th className="border border-black px-2">
              <label htmlFor="action">Action</label>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border border-black text-center font-bold">
                {index + 1}
              </td>
              <td className="border border-black text-center">
                <div className="relative">
                  <input
                    autoComplete="off"
                    type="text"
                    id={`search-input-${index}`}
                    name="search"
                    className="text-[#3b3838] border-[1px] border-black text-center p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-80 text-sm placeholder-opacity-100"
                    placeholder="Search Here!"
                    value={row.name}
                    onChange={(e) => handleInputChange(e, index, row)}
                    onBlur={() => isShowOption(index)} // Hide options on blur for the specific row
                    required
                  />
                  {row.showOptions && ( // Show results only when showOptions is true for the row
                    <ul className="absolute w-96 text-center font-[500] bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                      {filteredOptions.map((item) => (
                        <li
                          key={item.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onMouseDown={() =>
                            // Use onMouseDown instead of onClick to avoid blur conflict
                            handleOptionClick(
                              item.username,
                              item.designation,
                              item.contactno,
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
                  type="text"
                  className="text-[#3b3838] border-[1px] border-black text-center p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out text-sm placeholder-opacity-100"
                  defaultValue={row.designation}
                  readOnly
                />
              </td>
              <td className="border border-black text-center">
                <input
                  type="text"
                  className="text-[#3b3838] border-[1px] border-black text-center p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out text-sm placeholder-opacity-100"
                  defaultValue={row.contactno}
                  readOnly
                />
              </td>
              <td className="border border-black text-center">
                {index === 0 ? (
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                    onClick={handleAddRow}
                  >
                    +
                  </button>
                ) : (
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleRemoveRow(index)}
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

export default HandleBy;
