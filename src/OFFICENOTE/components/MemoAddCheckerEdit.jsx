import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { decryptId } from "../../pages/Encrypted/Encrypted";
import { Base_api } from "../../utils/api/Base_api";

const MemoAddCheckerEdit = ({
  setAddCheckerUserId,
  setAddCheckerUserName,
  setAddCheckerUserStatus,
}) => {
  const { userId, formId, id } = useParams();
  const decryptedUserId = decryptId(userId);
  const decryptedFormId = decryptId(formId);
  const decryptedId = decryptId(id);

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;

  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);
  const [rows, setRows] = useState([
    {
      name: "",
      userId: "",
      showOptions: false,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/boardmemo/user/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );
        const result = await response.json();

        // Set the checker user data
        setAddCheckerUserId(result.otherApprovalUserIds);
        setAddCheckerUserName(result.otherApprovalUsernames);
        setAddCheckerUserStatus(result.otherApprovalStatuses);

        // Populate the rows based on the fetched data
        const initialRows = result.otherApprovalUsernames.map(
          (username, index) => ({
            name: `${username}`,
            userId: result.otherApprovalUserIds[index],
            showOptions: false,
          })
        );

        setRows(initialRows);
        ({ initialRows });
      } catch (error) {
        error;
      }
    };
    fetchData();
  }, [userId, formId, id]); // Include dependencies

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/boardmemo/emplist/${userid}`
        );
        const data = await response.json();
        setSearchUsers(data);
        setFilteredOptions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid]);

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index].name = value;
    updatedRows[index].showOptions = value.trim() !== "";
    setRows(updatedRows);

    const filtered = searchUsers.filter((item) =>
      item.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (username, userId, index) => {
    const updatedRows = [...rows];
    updatedRows[index].name = username;
    updatedRows[index].userId = userId;
    updatedRows[index].showOptions = false;
    setRows(updatedRows);

    updateSelectedUserIds(updatedRows);
  };

  const updateSelectedUserIds = (updatedRows) => {
    const userIds = updatedRows.map((row) => row.userId).filter(Boolean);
    const userNames = updatedRows.map((row) => row.name).filter(Boolean);

    setAddCheckerUserId(userIds);
    setAddCheckerUserName(userNames);
    setAddCheckerUserStatus(Array(userIds.length).fill("Pending")); // Set status as "Pending"
  };

  const handleAddRow = () => {
    setRows([...rows, { name: "", userId: "", showOptions: false }]);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    updateSelectedUserIds(updatedRows);
  };

  return (
    <div className="my-4">
      <div className="flex gap-2">
        <h2 className="text-md font-bold">Add Checker :</h2>
        <FontAwesomeIcon
          onClick={handleAddRow}
          icon={faPlus}
          className="bg-slate-600 p-2 rounded-md w-3 h-3 cursor-pointer hover:bg-slate-500"
        />
      </div>

      <table className="w-full text-sm">
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border border-slate-700 text-center p-1">
                <div className="relative">
                  <input
                    type="text"
                    className="text-[#3b3838] w-full border-[1px] border-black text-left p-1 rounded-md"
                    placeholder="Search Here!"
                    value={row.name}
                    onChange={(e) => handleInputChange(e, index)}
                    onBlur={() => {
                      const updatedRows = [...rows];
                      updatedRows[index].showOptions = false; // Hide options on blur
                      setRows(updatedRows);
                    }}
                  />
                  {row.showOptions && (
                    <ul className="absolute bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                      {filteredOptions.map((item) => (
                        <li
                          key={item.id}
                          className="text-black px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onMouseDown={() =>
                            handleOptionClick(item.username, item.userid, index)
                          }
                        >
                          {item.username} - {item.userid}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </td>

              <td className="border border-slate-700 text-center p-1">
                <FontAwesomeIcon
                  onClick={() => handleRemoveRow(index)}
                  icon={faMinus}
                  className="bg-red-500 p-2 rounded-md w-3 h-3 cursor-pointer hover:bg-red-600"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemoAddCheckerEdit;
