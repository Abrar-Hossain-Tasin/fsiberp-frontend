import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

const Witness = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  const [name, setName] = useState({ one: "", two: "", three: "" });
  const [suggestions, setSuggestions] = useState({
    one: [],
    two: [],
    three: [],
  });
  const [selectedEmployees, setSelectedEmployees] = useState({
    one: { id: "", email: "", phone: "", designation: "" },
    two: { id: "", email: "", phone: "", designation: "" },
    three: { id: "", email: "", phone: "", designation: "" },
  });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/incidentreport/emplist/${userid}`
        );
        const data = await response.json();
        "Employees data:", data; // Debugging line
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployees();
  }, [userid]);

  const handleInputChangeTwo = (field) => (e) => {
    const inputValue = e.target.value;
    setName((prev) => ({ ...prev, [field]: inputValue }));

    if (inputValue) {
      const filteredSuggestions = employees.filter(
        (emp) =>
          emp.username &&
          emp.username.toLowerCase().includes(inputValue.toLowerCase())
      );
      `Suggestions for ${field}:`, filteredSuggestions; // Debugging line
      setSuggestions((prev) => ({ ...prev, [field]: filteredSuggestions }));
    } else {
      setSuggestions((prev) => ({ ...prev, [field]: [] }));
    }
  };

  const handleSuggestionClickTwo = (field) => (emp) => {
    setName((prev) => ({ ...prev, [field]: emp.username }));
    setSelectedEmployees((prev) => ({
      ...prev,
      [field]: {
        id: emp.userid, // Ensure this is correctly set
        email: emp.email,
        phone: emp.contactno,
        designation: emp.designation,
      },
    }));
    setSuggestions((prev) => ({ ...prev, [field]: [] }));
  };

  return (
    <div className="my-5">
      <table className="w-full">
        <tbody>
          <tr>
            <th className="border border-black py-2 text-center" colSpan="8">
              Witness
            </th>
          </tr>

          {[1, 2, 3].map((num) => {
            const field = num === 1 ? "one" : num === 2 ? "two" : "three";
            return (
              <tr key={num}>
                <th className="border border-black py-2">
                  <label htmlFor={`witness_name_${num}`} className="px-2">
                    Name
                  </label>
                </th>
                <td className="border border-black text-center py-2 relative">
                  <textarea
                    rows="2"
                    cols="30"
                    type="text"
                    id={`witness_name_${num}`}
                    value={name[field]}
                    onChange={handleInputChangeTwo(field)}
                    className="text-[#514f4f] border-2 border-[#d2d2e4] p-1 w-3/4 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                    placeholder="Name"
                  />
                  {suggestions[field] && suggestions[field].length > 0 && (
                    <ul className="absolute bg-white border border-[#d2d2e4] mt-1 z-10 w-3/4">
                      {suggestions[field].map((emp) => (
                        <li
                          key={emp.id}
                          onClick={() => handleSuggestionClickTwo(field)(emp)}
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                        >
                          {emp.username}
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
                <th className="border border-black py-2">
                  <label htmlFor={`witness_pf_id_${num}`} className="px-2">
                    PF ID
                  </label>
                </th>
                <td className="border border-black text-center py-2">
                  <input
                    type="text"
                    id={`witness_pf_id_${num}`}
                    value={selectedEmployees[field].id} // Use 'id' for PF ID
                    className="text-[#514f4f] border-2 border-[#d2d2e4] p-1 w-3/4 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                    placeholder="PF-ID"
                    readOnly
                  />
                </td>
                <th className="border border-black py-2">
                  <label htmlFor={`witness_desig_${num}`} className="px-2">
                    Designation
                  </label>
                </th>
                <td className="border border-black text-center py-2">
                  <input
                    type="text"
                    id={`witness_desig_${num}`}
                    value={selectedEmployees[field].designation}
                    className="text-[#514f4f] border-2 border-[#d2d2e4] p-1 w-3/4 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                    placeholder="Designation"
                    readOnly
                  />
                </td>

                <th className="border border-black py-2">
                  <label htmlFor={`witness_phn_${num}`} className="px-2">
                    Phone
                  </label>
                </th>
                <td className="border border-black text-center py-2">
                  <textarea
                    rows="1"
                    cols="40"
                    type="text"
                    id={`witness_phn_${num}`}
                    value={selectedEmployees[field].phone}
                    className="text-[#514f4f] border-2 border-[#d2d2e4] p-1 w-3/4 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                    placeholder="Phone"
                    readOnly
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Witness;
