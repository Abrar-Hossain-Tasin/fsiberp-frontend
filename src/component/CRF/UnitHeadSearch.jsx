import { useEffect, useState } from "react";
import { unitHeadSearch } from "../../utils/api/Base_api.jsx";
import { jwtDecode } from "jwt-decode";

const UnitHeadSearch = ({
  unitheaduserid,
  setUnitheaduserid,
  unitheadusername,
  setUnitheadusername,
  unitheadstatus,
  searchTerm,
  setSearchTerm,
  type,
}) => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;

  const [filteredOptions, setFilteredOptions] = useState([]);
  const [eligibleUsers, setEligibleUsers] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  // Unit Head Search Option start
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${unitHeadSearch}/${userid}`);
        const data = await response.json();
        setEligibleUsers(data);
        setFilteredOptions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    const filtered = eligibleUsers.filter((item) =>
      item.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
    setShowOptions(value.trim() !== "");
  };

  const handleOptionClick = (username, userid) => {
    setSearchTerm(`${username} - ${userid}`);
    setShowOptions(false);
    setUnitheaduserid(userid);
    setUnitheadusername(username);
  };
  // Unit Head Search Option End
  return (
    <>
      <div className="my-4 ">
        <table className="w-full text-sm">
          <tr>
            <th className="border border-black w-2/4">
              <label htmlFor="requesting_unit">
                Approved by (Head of Branch/Unit/Division/Department)
              </label>
            </th>
            <th className="border border-black w-1/4">
              <label htmlFor="downtime_duration_desc">Status</label>
            </th>
            <th className="border border-black w-1/4">
              <label htmlFor="downtime_duration_desc ">Comment</label>
            </th>
          </tr>

          <tr className="">
            <td className="border border-black">
              <div className="flex justify-center ">
                <div className="relative ">
                  <input
                    autoComplete="off"
                    type="text"
                    id="search-input"
                    name="search"
                    className="text-[#3b3838] border-[1px]  border-black text-center p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-80 text-sm placeholder-opacity-100"
                    placeholder="Search Here!"
                    value={searchTerm}
                    onChange={handleInputChange}
                    disabled={type === "view"}
                    required
                  />
                  {showOptions && (
                    <ul className="absolute w-full text-center font-[500] bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                      {filteredOptions.map((item) => (
                        <li
                          key={item.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            handleOptionClick(item.username, item.userid)
                          }
                        >
                          {item.username} - {item.userid}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </td>
            <td className="border border-black text-center">
              <strong className="">Pending</strong>
            </td>

            <td className="border border-black text-center">
              <strong className=""></strong>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default UnitHeadSearch;
