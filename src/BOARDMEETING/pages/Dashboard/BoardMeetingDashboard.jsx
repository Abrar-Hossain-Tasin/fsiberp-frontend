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
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditNoteIcon from '@mui/icons-material/EditNote';

const BoardMeetingDashboard = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  const [pendingForm, setPendingForm] = useState([]);
  const [rejectedForm, setRejectedForm] = useState([]);
  const [acceptedForm, setAcceptedForm] = useState([]);
  const [activeTable, setActiveTable] = useState("Pending");
  const [userInfo, setUserInfo] = useState({}); // State to hold user info


  // Fetch data
  const fetchData = async (type) => {
    try {
      const response = await fetch(
        `${Base_api}/api/dashboard/boardmemo`
      );
      const data = await response.json();
      
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

  const fetchUserInfo = async (userIds) => {
    try {
      const promises = userIds.map(async (id) => {
        const response = await fetch(`${Base_api}/api/users/${id}`); // Adjust the endpoint as needed
        return response.json();
      });
      
      const users = await Promise.all(promises);
      
      const userMap = users.reduce((acc, user) => {
        acc[user.id] = user; 
        setUserInfo(user);
        return acc;
      }, {});
      
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // Sort data by submission time
  const sortDataBySubmissionTime = (data) => {
    return data.sort((a, b) => new Date(b.submitTime) - new Date(a.submitTime));
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

  useEffect(() => {
    if (acceptedForm.length > 0) {
      const userIds = acceptedForm.map(item => item.userid);
      fetchUserInfo(userIds);
    }
  }, [acceptedForm]);

  return (
    <div className="flex flex-col w-10/12 items-center">
      <h1 className="text-3xl font-bold mt-2 text-center pb-10">Board Memo Dashboard</h1>

      {/* Conditional Rendering of Tables */}
      {/* {activeTable === "Pending" && <Table data={pendingForm} />}
      {activeTable === "Rejected" && <Table data={rejectedForm} />} */}
      <Table data={acceptedForm}  userInfo={userInfo} userid={userid}/>
    </div>
  );
};

const Table = ({ data, userInfo, userid }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tableData, setTableData] = useState(data); // State to manage the data

  useEffect(() => {
    setTableData(data); // Update tableData when data prop changes
  }, [data]);

    const handleView = (userId, formId, id) => {
      navigate(
        `/office-note/board-memo/view/${encryptId(userId)}/${encryptId(formId)}/${encryptId(
          id
        )}` 
      );
    };

  const handleCreateAgenda = ( id) => {
    console.log("userid ", userid);
    navigate(
      `../create-agenda/${encryptId(
        id)}` , { replace: true }
    );
  };

  const handleEditAgenda = (id) => {
    // console.log(userId, formId, id);
    navigate(
      `../edit-agenda/${encryptId(
        id)}` , { replace: true }
    );
  };

  const handleViewAgenda = (id) => {
    console.log(id);
    navigate(
      `../view-agenda/${encryptId(
        id)}` , { replace: true }
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
          <table className="w-full text-sm text-left rtl:text-right text-black">
            <thead className="bg-gray-200 top-0 border-slate-400">
              <tr>
                <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium underline" style={{ fontWeight: '700' }}>
                ক্রমিক নং
                </th>
                <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium underline" style={{ fontWeight: '700' }}>
                হতে
                </th>
                <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium underline" style={{ fontWeight: '700' }}>
                বিষয়
                </th>
                <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium underline" style={{ fontWeight: '700' }}>
                  Submitted Date and Time
                </th>
                <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium underline" style={{ fontWeight: '700' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="h-full overflow-auto">
              {currentRows.map((item, index) => (
                <tr key={index} className="even:bg-blue-100">
                  <td className="text-center border border-l-slate-400 border-r-slate-400 border-b-slate-400 text-sm font-medium ">
                    {index + 1}
                  </td>
                  <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium ">
                  {userInfo.nativeDivisionName || "Loading..."}
                  </td>
                  <td className="w-[400px] text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium ">
                    {item.memoSubject}
                  </td>
                  <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium ">
                    {new Date(item.submitTime).toLocaleString()}
                  </td>
                  <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium ">
                    {/* {item.formid === "0" ? ( */}
                      <div className="flex justify-center gap-2">
                        {/* <button
                          className="bg-blue-500 text-white p-1 px-2 rounded text-sm font-medium hover:bg-blue-700"
                          onClick={() => {console.log("agenda" , item.formid);
                            handleView(
                              item.userid,
                              (item.formId = "6001"),
                              item.id,
                              item
                            )
                          }}
                        >
                          View Memo
                        </button> */}

                          <Tooltip title="View Memo" arrow placement="top">
                              <button
                                className="text-black rounded border border-gray-500 text-sm font-medium hover:bg-slate-300 flex items-center"
                                onClick={() => {console.log("agenda" , item.formid);
                                  handleView(
                                    item.userid,
                                    (item.formId = "6001"),
                                    item.id,
                                    item
                                  )
                                }}
                              >
                                <ViewModuleIcon />
                              </button>
                            </Tooltip>

                        {item.agendaNumber === "0" ? (
                                // <button
                                //   className="bg-green-500 text-white p-1 px-2 rounded text-sm font-medium hover:bg-green-700"
                                //   onClick={() => {
                                //     handleCreateAgenda(item.id);
                                //   }}
                                // >
                                //   Create Agenda
                                // </button>
                                <Tooltip title="Agenda Create" arrow placement="top">
                              <button
                                className="text-black rounded border border-gray-500 text-sm font-medium hover:bg-slate-300 flex items-center"
                                onClick={() => {console.log("agenda" , item.formid);
                                  handleCreateAgenda(item.id);
                                }}
                              >
                                <AddBoxIcon />
                              </button>
                            </Tooltip>
                              ) : (
                                <div className="flex justify-center gap-2">
                                  {/* <button
                                    className="bg-[#e68a00] text-white p-1 px-2 rounded text-sm font-medium hover:bg-[#b36b00]"
                                    onClick={() => {
                                      handleEditAgenda(item.id);
                                    }}
                                  >
                                    Edit Agenda
                                  </button> */}

                                <Tooltip title="Agenda Edit" arrow placement="top">
                                    <button
                                      className="text-black rounded border border-gray-500 text-sm font-medium hover:bg-slate-300 flex items-center"
                                      onClick={() => {console.log("agenda" , item.formid);
                                        handleEditAgenda(item.id);
                                      }}
                                    >
                                      <EditNoteIcon />
                                    </button>
                                  </Tooltip>

                                  <Tooltip title="Agenda View" arrow placement="top">
                                    <button
                                      className="text-black rounded border border-gray-500 text-sm font-medium hover:bg-slate-300 flex items-center"
                                      onClick={() => {console.log("agenda" , item.formid);
                                        handleViewAgenda(item.id);
                                      }}
                                    >
                                      <ViewAgendaIcon />
                                    </button>
                                  </Tooltip>
                                  
                                  {/* <button
                                    className="bg-[#008080] text-white p-1 px-2 rounded text-sm font-medium hover:bg-[#004d4d]"
                                    onClick={() => {
                                      handleViewAgenda(item.id);
                                    }}
                                  >
                                    View Agenda
                                  </button> */}
                                </div>
                              )}

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

export default BoardMeetingDashboard;
