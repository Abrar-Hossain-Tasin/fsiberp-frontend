import React, { useEffect, useState } from "react";
import { Base_api } from "../../../utils/api/Base_api";

const PreviousBranchSearch = ({
  onBranchSelect,
  previousBranchName,
  required,
}) => {
  const [branches, setBranches] = useState([]);
  const [searchNewBranchTerm, setSearchNewBranchTerm] = useState("");
  const [filteredNewBranches, setFilteredNewBranches] = useState([]);
  const [showNewBranchOptions, setShowNewBranchOptions] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/cbs-user-permission/branches`
        );
        const data = await response.json();
        setBranches(data);
        setSearchNewBranchTerm(previousBranchName);

        setFilteredNewBranches(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [previousBranchName]);

  const handleNewBranchInputChange = (e) => {
    const { value } = e.target;
    setSearchNewBranchTerm(value);

    const filtered = branches.filter((item) =>
      item.branchname.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredNewBranches(filtered);
    setShowNewBranchOptions(value.trim() !== "");
  };

  const handleOptionClick = (branch) => {
    onBranchSelect(branch); // Pass the whole branch object to the parent component
    setSearchNewBranchTerm(`${branch.branchname} - ${branch.branchcode}`);
    setShowNewBranchOptions(false);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="relative mx-1">
        <input
          type="text"
          value={searchNewBranchTerm}
          onChange={handleNewBranchInputChange}
          placeholder="Search Branch"
          className="text-[#3b3838] border-[1px] border-black text-sm p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full placeholder-opacity-100 text-center"
          required={required}
        />
        {showNewBranchOptions && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-96 overflow-y-auto">
            {filteredNewBranches.map((branch) => (
              <li
                key={branch.id}
                onClick={() => handleOptionClick(branch)}
                className="cursor-pointer p-2 hover:bg-green-100 transition duration-200 ease-in-out"
              >
                {branch.branchname}
                {/* {branch.branchname} - {branch.branchcode} */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PreviousBranchSearch;
