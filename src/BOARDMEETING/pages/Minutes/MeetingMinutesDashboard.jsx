import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Base_api } from "../../../utils/api/Base_api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faHourglassHalf,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import { encryptId } from "../../../pages/Encrypted/Encrypted";
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import Tooltip from '@mui/material/Tooltip';
import EditNoteIcon from '@mui/icons-material/EditNote';

const MeetingMinutesDashboard = () => {
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
        `${Base_api}/api/meeting-minutes/viewAll`
      );
      const data = await response.json();
      console.log("data ", data);
      switch (type) {
        case "accepted":
          setAcceptedForm(sortDataBySubmissionTime(data));
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
    return data.sort((a, b) => new Date(b.submitDate) - new Date(a.submitDate));
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
      <h1 className="text-3xl font-bold mt-2 text-center pb-10">Meeting Minutes Dashboard</h1>
      
      <Table data={acceptedForm} />
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

  const handleView = (id) => {
    // navigate(`../view/${userId}/5001/${id}`);
    navigate(
      `../view-meeting-minutes/${encryptId(id)}`
    );
  };

  const handleEdit = (id) => {
    console.log("id ",id);
    navigate(
      `../edit-meeting-minutes/${encryptId(id)}`
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

      <div className="sm:rounded-lg bg-white p-5 shadow-[0_5px_10px_0px_gray]">
        <div className="max-h-60 overflow-y-auto -pt-10">
          <table className="w-full text-sm text-left rtl:text-right text-black">
            <thead className="bg-gray-200 top-0 border-slate-400">
              <tr>
              <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium underline" style={{ fontWeight: '700' }}>ক্রমিক নং</th>
              <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium underline" style={{ fontWeight: '700' }}>বিষয়</th>
              <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium underline" style={{ fontWeight: '700' }}>সিদ্ধান্ত</th>
              <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium underline" style={{ fontWeight: '700' }}>Action</th>
              </tr>
            </thead>
            <tbody className="h-full overflow-auto">
              {currentRows.map((item, index) => (
                <tr key={index} className="even:bg-blue-100">
                  <td className="text-center border border-l-slate-400 border-r-slate-400 border-b-slate-400 text-sm font-medium ">
                    {index + 1}
                  </td>

                  <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium ">
                    {item.meetingSubject}
                  </td>
                  <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium ">
                    {item.chairmanStatus}
                  </td>
                  <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium ">
                    {/* {item.formid === "0" ? ( */}
                      <div className="flex justify-center gap-2">
                        {/* <button
                          className="bg-blue-500 text-white p-1 px-2 rounded text-sm font-medium hover:bg-blue-700"
                          onClick={() =>
                            handleView(
                              // item.userid,
                              // (item.formId = "6001"),
                              item.meetingId
                            )
                          }
                        >
                          View
                        </button>
                        <button
                          className="bg-green-500 text-white p-1 px-2 rounded text-sm font-medium hover:bg-green-700"
                          onClick={() => {
                            localStorage.setItem("updateDraft", false);
                            handleEdit(
                              // item.userid,
                              // (item.formid = "6001"),
                              item.meetingId
                            );
                          }}
                        >
                          Edit
                        </button> */}

                        <Tooltip title="Meeting Minutes View" arrow placement="top">
                          <button
                            className="text-black rounded border border-slate-500 text-sm font-medium hover:bg-slate-300 flex items-center"
                            onClick={() => handleView(item.meetingId)}
                          >
                            <ViewModuleIcon />
                          </button>
                        </Tooltip>

                        <Tooltip title="Meeting Minutes Update" arrow placement="top">
                          <button
                            className="text-black rounded border border-slate-500 text-sm font-medium hover:bg-slate-300 flex items-center"
                            onClick={() => handleEdit(item.meetingId)}
                          >
                            <EditNoteIcon />
                          </button>
                        </Tooltip>
                      </div>
                    {/* ) : (
                      <button
                        className="bg-green-500 text-white p-1 px-2 rounded text-sm font-medium hover:bg-green-700"
                        onClick={() => {
                          localStorage.setItem("updateDraft", true);
                          handleEdit(
                            item.userid,
                            (item.formid = "6001"),
                            item.id
                          );
                        }}
                      >
                        Edit Draft
                      </button>
                    )} */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="overflow-y-auto max-h-[400px]">
            {/* Set the max-height here */}
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

export default MeetingMinutesDashboard;
