import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Base_api } from "../../utils/api/Base_api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faHourglassHalf,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import { encryptId } from "../../pages/AdminDashboard/encryption/Encrypted";

const OfficeNoteDashboard = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  const [pendingForm, setPendingForm] = useState([]);
  const [rejectedForm, setRejectedForm] = useState([]);
  const [acceptedForm, setAcceptedForm] = useState([]);
  const [activeTable, setActiveTable] = useState("Pending");

  // Fetch data
  const fetchData = async (type) => {
    try {
      const response = await fetch(
        `${Base_api}/api/officenote/user/${type}/${userid}`
      );
      const data = await response.json();
      console.log("data " , data);
      switch (type) {
        case "pending":
          setPendingForm(sortDataBySubmissionTime(data));
          break;
        case "accepted":
          setAcceptedForm(sortDataBySubmissionTime(data));
          break;
        case "rejected":
          setRejectedForm(sortDataBySubmissionTime(data));
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Sort data by submission time
  const sortDataBySubmissionTime = (data) => {
    return data.sort((a, b) => new Date(b.submittime) - new Date(a.submittime));
  };

  useEffect(() => {
    const storedTable = localStorage.getItem("activeTable");
    if (storedTable) {
      setActiveTable(storedTable);
    }
    fetchData("pending");
    fetchData("accepted");
    fetchData("rejected");
  }, [userid]);

  useEffect(() => {
    localStorage.setItem("activeTable", activeTable);
  }, [activeTable]);

  return (
    <div className="flex flex-col w-10/12 items-center">
      <h1 className="text-3xl font-bold mt-2 text-center">Dashboard</h1>
      <div className="flex gap-5 w-full px-10">
        <div className="flex gap-5 w-full px-10 p-5">
          <div
            onClick={() => setActiveTable("Pending")}
            className={`p-4 w-1/3 cursor-pointer shadow-[0_5px_10px_0px_gray] ${
              activeTable === "Pending" ? "bg-yellow-500" : ""
            } bg-yellow-100 rounded-lg shadow-sm flex items-center transition-all duration-300 hover:shadow-md`}
          >
            <FontAwesomeIcon
              icon={faHourglassHalf}
              className={`${
                activeTable === "Pending" ? "text-white" : "text-yellow-500"
              } w-7 h-7 mr-4`}
            />
            <div>
              <p
                className={`text-lg font-semibold ${
                  activeTable === "Pending" ? "text-white" : ""
                }`}
              >
                Pending
              </p>
              <p
                className={`text-2xl font-bold ${
                  activeTable === "Pending" ? "text-white" : ""
                }`}
              >
                {pendingForm.length}
              </p>
            </div>
          </div>
          <div
            onClick={() => setActiveTable("Rejected")}
            className={`p-4 w-1/3 cursor-pointer shadow-[0_5px_10px_0px_gray]  ${
              activeTable === "Rejected" ? "bg-red-500" : "bg-red-100"
            }  rounded-lg shadow-sm flex items-center transition-all duration-300 hover:shadow-md`}
          >
            <FontAwesomeIcon
              icon={faTimesCircle}
              className={`${
                activeTable === "Rejected" ? "text-white" : "text-red-500"
              } w-7 h-7 mr-4`}
            />
            <div>
              <p
                className={`text-lg font-semibold ${
                  activeTable === "Rejected" ? "text-white" : ""
                }`}
              >
                Rejected
              </p>
              <p
                className={`text-2xl font-bold ${
                  activeTable === "Rejected" ? "text-white" : ""
                }`}
              >
                {rejectedForm.length}
              </p>
            </div>
          </div>
          <div
            onClick={() => setActiveTable("Accepted")}
            className={`p-4 w-1/3 cursor-pointer shadow-[0_5px_10px_0px_gray] ${
              activeTable === "Accepted" ? "bg-green-500" : "bg-green-100"
            } rounded-lg shadow-sm flex items-center transition-all duration-300 hover:shadow-md`}
          >
            <FontAwesomeIcon
              icon={faCheckCircle}
              className={`${
                activeTable === "Accepted" ? "text-white" : "text-green-500"
              } w-7 h-7 mr-4`}
            />
            <div>
              <p
                className={`text-lg font-semibold ${
                  activeTable === "Accepted" ? "text-white" : ""
                }`}
              >
                Accepted
              </p>
              <p
                className={`text-2xl font-bold ${
                  activeTable === "Accepted" ? "text-white" : ""
                }`}
              >
                {acceptedForm.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Conditional Rendering of Tables */}
      {activeTable === "Pending" && <Table data={pendingForm} />}
      {activeTable === "Rejected" && <Table data={rejectedForm} />}
      {activeTable === "Accepted" && <Table data={acceptedForm} />}
    </div>
  );
};

const Table = ({ data }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tableData, setTableData] = useState(data); // State to manage the data

  useEffect(() => {
    setTableData(data); // Update tableData when data prop changes
  }, [data]);

  const handleView = (userId, formId, id) => {
    // navigate(`../view/${userId}/5001/${id}`);
    navigate(
      `../view/${encryptId(userId)}/${encryptId(formId)}/${encryptId(id)}`
    );
  };

  const handleEdit = (userId, formId, id) => {
    navigate(
      `../edit/${encryptId(userId)}/${encryptId(formId)}/${encryptId(id)}`
    );
  };

  // Calculate total pages
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  // Get current rows
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

  // Handle drag-and-drop
  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    const updatedData = Array.from(tableData);
    const [reorderedItem] = updatedData.splice(source.index, 1);
    updatedData.splice(destination.index, 0, reorderedItem);

    setTableData(updatedData); // Update the state with the new order
  };

  // Change rows per page
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  // Handle next and previous page
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="w-full">
      {/* <div className="shadow-[0_5px_10px_0px_gray] bg-white p-5 sm:rounded-lg">
            <div className="h-64 pt-0 relative overflow-y-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-200"></thead> */}

      <div className="sm:rounded-lg bg-white p-5 shadow-[0_5px_10px_0px_gray]">
        <div className="max-h-60 overflow-y-auto -pt-10">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="bg-gray-200 top-0 border-slate-400">
              <tr>
                <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium text-gray-600">
                  S. No.
                </th>
                <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium text-gray-600">
                  PF Id.
                </th>
                <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium text-gray-600">
                  Employee Name
                </th>
                <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium text-gray-600">
                  Subject
                </th>
                <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium text-gray-600">
                  Submitted Date and Time
                </th>
                <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="h-full overflow-auto">
              {currentRows.map((item, index) => (
                <tr key={index} className="even:bg-blue-100">
                  <td className="text-center border border-l-slate-400 border-r-slate-400 border-b-slate-400 text-sm font-medium text-gray-600">
                    {index + 1}
                  </td>

                  <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium text-gray-600">
                    {item.userid}
                  </td>
                  <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium text-gray-600">
                    {item.username}
                  </td>
                  <td className="w-[400px] text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium text-gray-600">
                    {item.formname}
                  </td>
                  <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium text-gray-600">
                    {new Date(item.submittime).toLocaleString()}
                  </td>
                  <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium text-gray-600">
                    <button
                      className="bg-blue-500 text-white p-1 px-2 mr-1 rounded text-sm font-medium hover:bg-blue-700"
                      onClick={() =>
                        handleView(
                          item.userid,
                          (item.formId = "5001"),
                          item.id,
                          item
                        )
                      }
                    >
                      View
                    </button>
                    <button
                      className="bg-green-500 text-white p-1 px-2 mr-1 rounded text-sm font-medium hover:bg-green-700"
                      onClick={() =>
                        handleEdit(item.userid, (item.formid = "5001"), item.id)
                      }
                    >
                      Edit
                    </button>
                    {item.formid === "2" && item.mdstatus === "Accepted" ? (
                      <button
                        className="bg-slate-500 text-white p-1 px-2 rounded text-sm font-medium hover:bg-slate-700"
                        onClick={() =>
                          navigate(`../create-board-memo/${item.id}`)
                        }
                      >
                        Create Memo
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="overflow-y-auto max-h-[400px]">
            {/* Set the max-height here */}
          </div>

          <div className="max-h-60 overflow-y-auto">
            {/* Set a max-height for the scrollable body */}
            {/* <table className="w-full text-sm text-center text-gray-500">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="table" direction="vertical">
                {(provided) => (
                  <tbody {...provided.droppableProps} ref={provided.innerRef}>
                    {currentRows.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <tr
                            className="hover:bg-gray-100 transition duration-200 even:bg-gray-200"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <td className="py-2 px-4 border-b border-gray-200">
                              {indexOfFirstRow + index + 1}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                              {item.userid}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                              {item.username}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                              {item.formname}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                              {new Date(item.submittime).toLocaleString()}
                            </td>
                            <td className="py-2 px-4 border-b flex justify-center gap-1 border-gray-200">
                              <button
                                className="bg-blue-500 text-white p-1 px-2 rounded text-sm font-medium hover:bg-blue-700"
                                onClick={() =>
                                  handleView(item.userid, item.formid, item.id)
                                }
                              >
                                View
                              </button>
                              <button
                                className="bg-green-500 text-white p-1 px-2 rounded text-sm font-medium hover:bg-green-700"
                                onClick={() =>
                                  handleEdit(item.userid, item.formid, item.id)
                                }
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                  </tbody>
                )}
              </Droppable>
            </DragDropContext>
          </table> */}
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <div className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50">
            Page {currentPage} of {totalPages}
          </div>

          <div className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50">
            <label className="mr-2">Rows per page:</label>
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="bg-transparent"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={50}>50</option>
            </select>
          </div>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfficeNoteDashboard;
