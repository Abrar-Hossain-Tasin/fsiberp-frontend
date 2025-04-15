import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Base_api } from "../../../utils/api/Base_api";
import { decryptId } from "../../AdminDashboard/encryption/Encrypted";

const EmployeeTableView = () => {
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
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const witness = [
          witnessOneUserId,
          witnessTwoUserId,
          witnessThreeUserId,
        ].filter((id) => id); // Filter out empty user IDs

        ({ witness });
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
    ({ witness });
    // ({ witness });
  }, [witnessOneUserId, witnessTwoUserId, witnessThreeUserId]);

  const cellClassName = "border border-slate-400 p-2";

  return (
    <div>
      <h4 className="text-center font-bold bg-gray-300 text-sm p-1 rounded-md my-5">
        Witness
      </h4>

      <table className="w-full text-center text-sm">
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
                    className="text-[#3b3838] text-center border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                    onChange={handleInputChangeUnit(index)}
                    disabled
                  />
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
    </div>
  );
};

export default EmployeeTableView;
