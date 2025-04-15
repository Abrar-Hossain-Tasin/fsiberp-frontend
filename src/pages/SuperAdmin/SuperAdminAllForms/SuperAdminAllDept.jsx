import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { encryptId } from "../../AdminDashboard/encryption/Encrypted";

const SuperAdminAllDept = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedDept, setSelectedDept] = useState(null);

  const navigate = useNavigate();
  const api = "http://localhost:8081/api/admin/allforms";

  // Mapping department IDs to names
  const departmentNames = {
    7: "ISRM",
    8: "Network",
    11: "System Admin",
    2: "CBS",
  };

  const fetchData = async (deptId) => {
    setLoading(true);
    setSelectedDept(deptId); // Set selected department ID
    try {
      const response = await fetch(`${api}/${deptId}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setFormData(data);
      setCurrentPage(1); // Reset to the first page when new data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return date.toLocaleString(undefined, options);
  };

  const filteredData = formData
    .filter((item) =>
      item.userid.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.submittime) - new Date(a.submittime)); // Sort by submittime in descending order

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      <section>
        <div className="flex gap-4 mt-5 justify-center">
          <div
            onClick={() => fetchData(7)}
            className={`cursor-pointer p-4 ${
              selectedDept === 7
                ? "bg-yellow-600 text-white font-bold rounded"
                : "bg-yellow-100 text-black font-semibold rounded"
            }`}
          >
            <h1>ISRM</h1>
          </div>
          <div
            onClick={() => fetchData(8)}
            className={`cursor-pointer p-4 ${
              selectedDept === 8
                ? "bg-orange-400 text-white font-bold rounded"
                : "bg-orange-100 text-black font-semibold rounded"
            }`}
          >
            <h1>Network</h1>
          </div>
          <div
            onClick={() => fetchData(11)}
            className={`cursor-pointer p-4 ${
              selectedDept === 11
                ? "bg-lime-700 text-white font-bold rounded"
                : "bg-lime-100 text-black font-semibold rounded"
            }`}
          >
            <h1>System Admin</h1>
          </div>
          <div
            onClick={() => fetchData(2)}
            className={`cursor-pointer p-4 ${
              selectedDept === 2
                ? "bg-indigo-400 text-white font-bold rounded"
                : "bg-indigo-100 text-black font-semibold rounded"
            }`}
          >
            <h1>CBS</h1>
          </div>
        </div>

        {/* Search Bar */}

        <div className="shadow-[0_5px_10px_0px_gray] bg-white p-5 my-7">
          <div className="flex justify-between mb-4">
            <h3 className="mt-2">
              Selected Department:{" "}
              <strong>
                {selectedDept
                  ? departmentNames[selectedDept]
                  : "No Dept. Selected!"}
              </strong>
            </h3>

            <input
              type="text"
              placeholder="Search by PF Id"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded p-2 text-[#514f4f] border-2 border-[#007935] placeholder-[#514f4f]"
            />
          </div>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 text-center">
              <tr>
                <th className="px-6 py-2">SL</th>
                <th className="px-6 py-2">PF Id</th>
                <th className="px-6 py-2">Employee Name</th>
                <th className="px-6 py-2">Form Name</th>
                <th className="px-6 py-2">Submission Date & Time</th>
                <th className="px-6 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : (
                currentItems.map((item, index) => (
                  <tr
                    key={index}
                    className="text-center border-b-2 border-[#e3dcdc]"
                  >
                    <td className="px-6 py-2">
                      {index + indexOfFirstItem + 1}
                    </td>
                    <td className="px-6 py-2">{item.userid}</td>
                    <td className="px-6 py-2">{item.username}</td>
                    <td className="px-6 py-2">
                      <td className="px-6 py-2 text-center">
                        {item.formname.includes("CBS-User Permission/Role")
                          ? "CBS-User Permission/Role"
                          : item.formname.split("|").join(", ")}
                      </td>
                    </td>
                    <td className="px-6 py-2">
                      {formatDateTime(item.submittime)}
                    </td>
                    <td className="px-6 py-2">
                      <div className="flex gap-3">
                        <button
                          className="py-1 px-2 font-medium border border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded"
                          onClick={() =>
                            navigate(
                              `/view/${encryptId(item.userid)}/${encryptId(
                                item.formid
                              )}/${encryptId(item.id)}`
                            )
                          }
                        >
                          View
                        </button>
                        <button
                          disabled={item.unitheadstatus === "Accepted"}
                          className={`${"hover:bg-cyan-500 hover:text-white border-cyan-500 text-cyan-500"} py-1 px-2 font-medium border   rounded`}
                          onClick={() =>
                            navigate(
                              `/edit/${encryptId(item.userid)}/${encryptId(
                                item.formid
                              )}/${encryptId(item.id)}`
                            )
                          }
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === 1 ? "text-gray-400" : "text-blue-500"
              }`}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === totalPages ? "text-gray-400" : "text-blue-500"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SuperAdminAllDept;
