import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { decryptId } from "../../pages/AdminDashboard/encryption/Encrypted.jsx";
import { Base_api, unitHeadSearch } from "../../utils/api/Base_api.jsx";

const ImplementedUnitHeadSearch = ({
  implbyunitheaduserid,
  setImplbyunitheaduserid,
  implbyunitheadusername,
  setImplbyunitheadusername,
  implbyunitheadsearchTerm,
  setImplbyunitheadSearchTerm,
  unit,
  setUnit,
  type,
}) => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [eligibleUsers, setEligibleUsers] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const { userId, formId, id } = useParams();

  // Unit Head Search Option start
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${Base_api}/api/user/implist/${userid}`);
        const data = await response.json();
        setEligibleUsers(data);
        setFilteredOptions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid]);

  useEffect(() => {
    const fetchData = async () => {
      const decryptedUserId = decryptId(userId);
      try {
        const response = await fetch(`${unitHeadSearch}/${decryptedUserId}`);
        const data = await response.json();
        setUnit(data.unit);
        unit;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setImplbyunitheadSearchTerm(value);

    const filtered = eligibleUsers.filter((item) =>
      item.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
    setShowOptions(value.trim() !== "");
    if (!value) {
      setUnit("");
    }
  };

  const handleOptionClick = (username, userid, unit) => {
    setImplbyunitheadSearchTerm(`${username}`);
    setShowOptions(false);
    setImplbyunitheaduserid(userid);
    setImplbyunitheadusername(username);
    implbyunitheaduserid, implbyunitheadusername;
    setUnit(unit);
  };
  // Unit Head Search Option End
  return (
    <div className="flex justify-center ">
      <div className="relative ">
        <input
          autoComplete="off"
          type="text"
          id="Implbyunithead-search-input"
          name="search"
          className="text-[#3b3838] border-[1px]  border-black text-center p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out text-sm placeholder-opacity-100"
          placeholder="Search Here!"
          value={implbyunitheadsearchTerm}
          onChange={handleInputChange}
          required
          disabled={type === "view"}
        />
        {showOptions && (
          <ul className="absolute w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
            {filteredOptions.map((item) => (
              <li
                key={item.id}
                className="text-black px-4 py-2 hover:bg-gray-100 cursor-pointer font-[500]"
                onClick={() =>
                  handleOptionClick(item.username, item.userid, item.unit)
                }
              >
                {item.username} - {item.userid}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ImplementedUnitHeadSearch;
