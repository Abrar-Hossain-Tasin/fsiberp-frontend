import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Base_api } from "../../../utils/api/Base_api";
import { decryptId } from "../../AdminDashboard/encryption/Encrypted";

const EmployeeTable = ({ handleWitnessChange }) => {
  const { userId, formId, id } = useParams();
  const [showOptions, setShowOptions] = useState([false, false, false]);
  const [employees, setEmployees] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([[], [], []]);

  const [witnessOneUserId, setWitnessOneUserId] = useState("");
  const [witnessTwoUserId, setWitnessTwoUserId] = useState("");
  const [witnessThreeUserId, setWitnessThreeUserId] = useState("");

  const [witnessOneUserInfo, setWitnessOneUserInfo] = useState({});
  const [witnessTwoUserInfo, setWitnessTwoUserInfo] = useState({});
  const [witnessThreeUserInfo, setWitnessThreeUserInfo] = useState({});

  const [searchTerms, setSearchTerms] = useState(["", "", ""]);
  const decryptedUserId = decryptId(userId);
  const decryptedFormId = decryptId(formId);
  const decryptedId = decryptId(id);
  // Fetch existing form data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/user/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );
        const data = await response.json();

        setWitnessOneUserId(data.witness[0] || "");
        setWitnessTwoUserId(data.witness[1] || "");
        setWitnessThreeUserId(data.witness[2] || "");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, formId, id]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const decryptedUserId = decryptId(userId);
        const response = await fetch(
          `${Base_api}/api/incidentreport/emplist/${decryptedUserId}`
        );
        const data = await response.json();
        setEmployees(data);
        // ({ employees });

        setWitnessOneUserInfo(
          data.find((witness) => witness.userid === witnessOneUserId) || {}
        );
        setWitnessTwoUserInfo(
          data.find((witness) => witness.userid === witnessTwoUserId) || {}
        );
        setWitnessThreeUserInfo(
          data.find((witness) => witness.userid === witnessThreeUserId) || {}
        );
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchEmployees();
  }, [userId, witnessOneUserId, witnessTwoUserId, witnessThreeUserId]);

  // Update searchTerms whenever witness info changes
  useEffect(() => {
    setSearchTerms([
      witnessOneUserInfo.username || "",
      witnessTwoUserInfo.username || "",
      witnessThreeUserInfo.username || "",
    ]);
  }, [witnessOneUserInfo, witnessTwoUserInfo, witnessThreeUserInfo]);

  const handleInputChangeUnit = (index) => (e) => {
    const { value } = e.target;
    const newSearchTerms = [...searchTerms];
    newSearchTerms[index] = value;
    setSearchTerms(newSearchTerms);

    const filtered = employees.filter((item) =>
      item.username.toLowerCase().includes(value.toLowerCase())
    );

    const newFilteredOptions = [...filteredOptions];
    newFilteredOptions[index] = filtered;
    setFilteredOptions(newFilteredOptions);
    setShowOptions((prev) => {
      const newShowOptions = [...prev];
      newShowOptions[index] = value.trim() !== "";
      return newShowOptions;
    });

    if (newSearchTerms[index] === "") {
      if (index === 0) {
        setWitnessOneUserInfo("");
        setWitnessOneUserId(""); // Set the user ID for witness one
      } else if (index === 1) {
        setWitnessTwoUserInfo("");
        setWitnessTwoUserId(""); // Set the user ID for witness two
      } else if (index === 2) {
        setWitnessThreeUserInfo("");
        setWitnessThreeUserId(""); // Set the user ID for witness three
      }
    }
  };

  const handleOptionClick = (index, selectedUser) => {
    const { username, userid, contactno, designation } = selectedUser;

    // Update search term
    const newSearchTerms = [...searchTerms];
    newSearchTerms[index] = `${username} - ${userid}`;
    setSearchTerms(newSearchTerms);

    // Update witness user info
    if (index === 0) {
      setWitnessOneUserInfo(selectedUser);
      setWitnessOneUserId(userid); // Set the user ID for witness one
    } else if (index === 1) {
      setWitnessTwoUserInfo(selectedUser);
      setWitnessTwoUserId(userid); // Set the user ID for witness two
    } else if (index === 2) {
      setWitnessThreeUserInfo(selectedUser);
      setWitnessThreeUserId(userid); // Set the user ID for witness three
    }

    // Hide options
    const newShowOptions = [...showOptions];
    newShowOptions[index] = false;
    setShowOptions(newShowOptions);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const witness = [
          witnessOneUserId,
          witnessTwoUserId,
          witnessThreeUserId,
        ].filter((id) => id); // Filter out empty user IDs

        handleWitnessChange(witness); // Pass data to parent
        // ({ witness });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const witness = [
      witnessOneUserId,
      witnessTwoUserId,
      witnessThreeUserId,
    ].filter((id) => id); // Filter out empty user IDs

    // setWitness(payload);
    handleWitnessChange(witness); // Pass data to parent
    ({ witness });
    // ({ witness });
  }, [witnessOneUserId, witnessTwoUserId, witnessThreeUserId]);

  // const handleSubmit = async () => {
  //   const payload = {
  //     witness: [witnessOneUserId, witnessTwoUserId, witnessThreeUserId].filter(
  //       (id) => id
  //     ), // Filter out empty user IDs
  //   };

  //   ("Submitting payload:", payload); // Debugging log

  // try {
  //   const response = await fetch(`${Base_api}/api/submit`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(payload),
  //   });

  //   if (response.ok) {
  //     const result = await response.json();
  //     ("Data submitted successfully:", result);
  //   } else {
  //     console.error("Error submitting data:", response.statusText);
  //   }
  // } catch (error) {
  //   console.error("Error submitting data:", error);
  // }
  // };

  const cellClassName = "border border-black p-2";

  return (
    <div className="relative">
      <h4 className="text-center font-bold bg-gray-300 p-1 my-5 rounded-md text-sm">
        Witness
      </h4>
      <div>
        <table className="w-full text-center text-sm font-[500]">
          <thead>
            <tr>
              <th className={cellClassName}>Witness</th>
              <th className={cellClassName}>Search</th>
              {/* <th className={cellClassName}>Username</th> */}
              <th className={cellClassName}>User ID</th>
              <th className={cellClassName}>Designation</th>
              <th className={cellClassName}>Contact No</th>
            </tr>
          </thead>
          <tbody>
            {[witnessOneUserInfo, witnessTwoUserInfo, witnessThreeUserInfo].map(
              (witnessInfo, index) => (
                <tr key={index}>
                  <td className={cellClassName}>{index + 1}</td>
                  <td className={cellClassName}>
                    <input
                      type="text"
                      value={searchTerms[index]}
                      className="text-[#3b3838] w-80 border-[1px] border-black text-sm p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100 text-center"
                      onChange={handleInputChangeUnit(index)}
                      placeholder="Search Witness"
                    />
                    {showOptions[index] && (
                      <ul className="absolute ml-8 w-80 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                        {filteredOptions[index].map((employee) => (
                          <li
                            key={employee.userid}
                            onClick={() => handleOptionClick(index, employee)}
                            className="py-1 hover:bg-gray-100 cursor-pointer text-sm font-[500]"
                          >
                            {employee.username} - {employee.userid}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  {/* <td className={cellClassName}>{witnessInfo.username}</td> */}
                  <td className={cellClassName}>{witnessInfo.userid}</td>
                  <td className={cellClassName}>{witnessInfo.designation}</td>
                  <td className={cellClassName}>{witnessInfo.contactno}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
        {/* <button
        onClick={handleSubmit}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button> */}
      </div>
    </div>
  );
};

export default EmployeeTable;
