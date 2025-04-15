import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Base_api } from "../../../utils/api/Base_api.jsx";

const HandleByViewEdit = ({
  setHandleByUserId,
  handleByUserId,
  type,
  userId,
}) => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;

  const [filteredOptions, setFilteredOptions] = useState([]);
  const [eligibleUsers, setEligibleUsers] = useState([]);
  const [rows, setRows] = useState([
    {
      name: "",
      extraUserName: "",
      userId: "",
      designation: "",
      contactno: "",
      showOptions: false,
    },
  ]);
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

  // // Update the rows based on handleByUserId
  // useEffect(() => {
  //   const initialRows = handleByUserId.map((userId) => {
  //     const user = eligibleUsers.find((user) => user.userid === userId);
  //     return {
  //       name: user ? `${user.username} - ${user.userid}` : "",
  //       email: user ? user.email : "",
  //       userId: userId,
  //       showOptions: false,
  //     };
  //   });
  //   setRows(initialRows);
  // }, [handleByUserId, eligibleUsers]); // Re-run if handleByUserId or eligibleUsers change

  useEffect(() => {
    const initialRows = handleByUserId.map((item) => {
      let name = "";
      let userId = null;

      // Ensure item is a string before performing includes or splitting
      if (typeof item === "string" && item.includes(" - ")) {
        // Split the value into username and userId
        const [username, id] = item.split(" - ").map((str) => str.trim());
        userId = id;

        // Find the user in eligibleUsers using the extracted userId
        const user = eligibleUsers.find((user) => user.userid === userId);
        if (user) {
          name = `${user.username} - ${user.userid}`;
        } else {
          // If no user is found, set the name as just the username
          name = username;
        }
      } else {
        // If the item does not contain ' - ', it's just a username
        name = item;
      }

      return {
        name, // If it had a userId, it will be the full 'username - userid', else just the username
        designation: userId
          ? eligibleUsers.find((user) => user.userid === userId)?.designation
          : "", // Get designation if userId exists
        contactno: userId
          ? eligibleUsers.find((user) => user.userid === userId)?.contactno
          : "", // Get contactno if userId exists

        userId, // Store the userId if it was found
        showOptions: false,
      };
    });
    setRows(initialRows); // Set the processed rows to state
  }, [eligibleUsers]); // Re-run if handleByUserId or eligibleUsers change

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
    // (handleByUserId);

    // Debug: Log to check the final value of handleByUserId
    // (updatedName);
  };

  // const handleInputChange = (e, index, row) => {
  //   const { value } = e.target;

  //   // Copy the rows to update the input field value
  //   const updatedRows = [...rows];
  //   updatedRows[index].name = value;

  //   // Show options when there's a search term
  //   updatedRows[index].showOptions = value.trim() !== "";
  //   setRows(updatedRows);

  //   // Filter eligible users based on the search input value
  //   const filtered = eligibleUsers.filter((item) =>
  //     item.username.toLowerCase().includes(value.toLowerCase())
  //   );
  //   setFilteredOptions(filtered);

  //   // Ensure extraUserName is initialized as an array if not already
  //   if (!Array.isArray(updatedRows[index].extraUserName)) {
  //     updatedRows[index].extraUserName = []; // Initialize as empty array if it's not already an array
  //   }

  //   // Get the existing extraUserName array for the current row
  //   const updatedExtraUserNames = [...updatedRows[index].extraUserName];

  //   // Only push the value if it doesn't already exist for this row
  //   if (value && !updatedExtraUserNames.includes(value)) {
  //     updatedExtraUserNames.push(value);
  //   }

  //   // Update the extraUserName for the current row (preserve previous values)
  //   updatedRows[index].extraUserName = updatedExtraUserNames;

  //   // Merge all selectedUserIds with the extraUserName for all rows and ensure uniqueness
  //   const updatedName = [
  //     ...new Set([
  //       // You can uncomment the following line if selectedUserIds needs to be included:
  //       // ...selectedUserIds,
  //       ...updatedRows.map((row) => row.name).filter((name) => name),
  //     ]),
  //   ];

  //   // Update handleByUserId with the merged array
  //   setHandleByUserId(updatedName);

  //   // Debug: Log to check the final value of handleByUserId
  //   (updatedName);
  // };

  // Handle option click to set username, email, and userId in the respective row

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
  };

  // Update selectedUserIds array
  const updateSelectedUserIds = (updatedRows) => {
    const userIds = updatedRows
      .map((row) => row.userId)
      .filter((userId) => userId !== "");
    setHandleByUserId(userIds); // Update handleByUserId state in the parent
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
                    value={row.name || ""}
                    onChange={(e) => handleInputChange(e, index, row)}
                    onBlur={() => isShowOption(index)} // Hide options on blur for the specific row
                    required
                    // disabled={type === "view"}
                  />
                  {row.showOptions && ( // Show results only when showOptions is true for the row
                    <ul className="absolute w-full text-center font-[500] bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
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

export default HandleByViewEdit;
