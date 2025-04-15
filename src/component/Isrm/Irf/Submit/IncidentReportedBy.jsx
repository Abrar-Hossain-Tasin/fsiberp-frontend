import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

const IncidentReportedBy = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  const [name, setName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [employeeData, setEmployeeData] = useState({
    id: "",
    email: "",
    phone: "",
  });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/incidentreport/emplist/${userid}`
        );
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployees();
  }, [userid]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setName(inputValue);

    if (inputValue) {
      const filteredSuggestions = employees.filter(
        (emp) =>
          emp.username &&
          emp.username.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (emp) => {
    setName(emp.username); // Set the name based on the username from API
    setEmployeeData({
      id: emp.userid, // Use userid for the employee ID
      email: emp.email,
      phone: emp.contactno, // Use contactno for the phone number
    });
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className="relative">
      <table className="w-full">
        <tbody>
          <tr>
            <th className="border border-black py-2" colSpan="4">
              Incident Reported By
            </th>
          </tr>
          <tr>
            <th className="border border-black py-2">
              <label htmlFor="reported_by_name">Name</label>
            </th>
            <td className="border border-black text-center py-2">
              <textarea
                rows="1"
                cols="30"
                type="text"
                id="reported_by_name"
                value={name || ""}
                onChange={handleInputChange}
                className="text-[#514f4f] border-2 border-[#d2d2e4] p-1 w-3/4 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                placeholder="Search Name"
              />
              {suggestions.length > 0 && (
                <ul className="absolute bg-white border border-[#d2d2e4] mt-1 z-10 w-3/4">
                  {suggestions.map((emp) => (
                    <li
                      key={emp.id}
                      onClick={() => handleSuggestionClick(emp)}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {emp.username} {/* Show username from API */}
                    </li>
                  ))}
                </ul>
              )}
            </td>
            <th className="border border-black py-2">
              <label htmlFor="reported_by_id">Employee ID</label>
            </th>
            <td className="border border-black text-center py-2">
              <input
                type="text"
                id="reported_by_id"
                value={employeeData.id}
                className="text-[#514f4f] border-2 border-[#d2d2e4] p-1 w-3/4 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                placeholder="ID"
                readOnly
              />
            </td>
          </tr>
          <tr>
            <th className="border border-black py-2">
              <label htmlFor="reported_by_email">Email</label>
            </th>
            <td className="border border-black text-center py-2">
              <input
                type="email"
                id="reported_by_email"
                value={employeeData.email}
                className="text-[#514f4f] border-2 border-[#d2d2e4] p-1 w-3/4 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                placeholder="Email"
                readOnly
              />
            </td>
            <th className="border border-black py-2">
              <label htmlFor="reported_by_number">Phone Number</label>
            </th>
            <td className="border border-black text-center py-2">
              <input
                type="text"
                id="reported_by_number"
                value={employeeData.phone}
                className="text-[#514f4f] border-2 border-[#d2d2e4] p-1 w-3/4 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                placeholder="Number"
                readOnly
              />
            </td>
          </tr>
          {/* <tr>
            <th className="border border-black py-2">
              <label htmlFor="Incident_Handled_By">
                Incident <br /> Handled By
              </label>
            </th>
            <td className="border border-black text-center py-2">
              <input
                type="text"
                id="Incident_Handled_By"
                className="text-[#514f4f] border-2 border-[#d2d2e4] p-1 w-3/4 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                placeholder="Incident Handled By"
              />
            </td>
            <th className="border border-black py-2">
              <label htmlFor="Incident_Verified_By">
                Incident <br /> Verified By
              </label>
            </th>
            <td className="border border-black text-center py-2">
              <input
                type="text"
                id="Incident_Verified_By"
                className="text-[#514f4f] border-2 border-[#d2d2e4] p-1 w-3/4 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                placeholder="Incident Verified By"
              />
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentReportedBy;
