import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { Base_api } from "../../../utils/api/Base_api";
import { jwtDecode } from "jwt-decode";
import { encryptId } from "../../../pages/Encrypted/Encrypted";
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import SummarizeIcon from '@mui/icons-material/Summarize';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

const MeetingDashboard = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  const [acceptedForm, setAcceptedForm] = useState([]);
  // const [userInfo, setUserInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});


  const fetchUserInfo = async (userIds) => {
    try {
      const promises = userIds.map(async (id) => {
        const response = await fetch(`${Base_api}/api/users/${id}`);
        return response.json();
      });
      
      const users = await Promise.all(promises);
      console.log("response ", users);
      
      const userMap = users.reduce((acc, user) => {
        acc[user.userid] = user; // Use userid as key
        return acc;
      }, {});
  
      setUserInfo(userMap); // Set userInfo once after constructing the map
      console.log("User Info Map:", userMap);
      
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };
  

  // Fetch data
  const fetchData = async () => {
    try {
      const response = await fetch(`${Base_api}/api/meetings/view`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("id " , data);
      setAcceptedForm(sortDataBySubmissionTime(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

const sortDataBySubmissionTime = (data) => {
  return data.sort((a, b) => new Date(b.creationTime) - new Date(a.creationTime));
};

  useEffect(() => {
    fetchData(); // Call fetchData to load initial data
  }, [userid]); // Add userid as a dependency

  useEffect(() => {
      if (acceptedForm.length > 0) {
        const userIds = acceptedForm.map(item => item.userid);
        fetchUserInfo(userIds);
      }
    }, [acceptedForm]);

  return (
    <div className="flex flex-col w-11/12 items-center">
      <h1 className="text-3xl font-bold mt-2 text-center pb-10">Board Meeting Dashboard</h1>
      <Table data={acceptedForm} userInfo={userInfo} />
    </div>
  );
};

const Table = ({ data, userInfo }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tableData, setTableData] = useState(data); // State to manage the data

  useEffect(() => {
    setTableData(data); // Update tableData when data prop changes
  }, [data]);

  const handleView = (id) => {
    navigate(`/board-meetings/meeting-view/${encryptId(id)}`);
  };

  const handleEdit = (id) => {
    navigate(`/board-meetings/meeting-edit/${encryptId(id)}`);
  };

  const handleCreateMinutes = (id) => {
    navigate(
      `/board-meetings/create-meeting-minutes/${encryptId(id)}`
    );
  };

  // Calculate total pages
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  // Get current rows
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

  // Handle next and previous page
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Change rows per page
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  const handleViewMinutes = (id) => {
      // navigate(`../view/${userId}/5001/${id}`);
      navigate(
        `../view-meeting-minutes/${encryptId(id)}`
      );
    };
  
    const handleEditMinutes = (id) => {
      console.log("id ",id);
      navigate(
        `../edit-meeting-minutes/${encryptId(id)}`
      );
    };

  return (
    <div className="w-full">
      <div className="sm:rounded-lg bg-white p-5 shadow-[0_5px_10px_0px_gray]">
      <div className="max-h-60 overflow-y-auto -pt-10">
        <table className="w-full text-sm text-left rtl:text-right text-black">
          <thead className="bg-gray-200 top-0 border-slate-400">
            <tr>
              <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium underline" style={{ fontWeight: '700' }}>S. No.</th>
              <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium underline" style={{ fontWeight: '700' }}>Meeting Id.</th>
              <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium underline" style={{ fontWeight: '700' }}>Meeting Title</th>
              <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium underline" style={{ fontWeight: '700' }}>Meeting Type</th>
              <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium underline" style={{ fontWeight: '700' }}>Created By</th>
              <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium underline" style={{ fontWeight: '700' }}>Meeting Date</th>
              <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium underline" style={{ fontWeight: '700' }}>Meeting Time</th>
              <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium underline" style={{ fontWeight: '700' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, index) => (
              <tr key={item.meetingid} className="even:bg-blue-100">
                <td className="px-1 text-center border border-l-slate-400 border-r-slate-400 border-b-slate-400 text-sm font-medium ">{index + 1}</td>
                <td className="px-1 text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium ">{item.id}</td>
                <td className="px-1 w-[400px] text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium ">{item.title}</td>
                <td className="px-1 text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium ">{item.type}</td>
                <td className="px-1 text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium ">{userInfo[item.userid] ? userInfo[item.userid].username : 'Loading...'}</td>
                <td className="px-1 text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium ">{(item.date ).toLocaleString()}</td>
                <td className="px-1 text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium ">{new Date(`1970-01-01T${item.time}`).toLocaleTimeString('en-US', {
                                                                                                              hour: '2-digit',
                                                                                                              minute: '2-digit',
                                                                                                              hour12: true
                                                                                                            })}</td>
                <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium ">
                <div className="flex justify-center gap-2">
                <Tooltip title="Meeting View" arrow placement="top">
                    <button
                      className="text-black rounded border border-slate-500 text-sm font-medium hover:bg-slate-300 flex items-center"
                      onClick={() => handleView(item.id, item)}
                    >
                      <ViewModuleIcon />
                    </button>
                  </Tooltip>


                        {item && item.close === 0 ? (

                        <Tooltip title="Meeting Edit" arrow placement="top">
                          <button
                            className="text-black rounded border border-slate-500 text-sm font-medium hover:bg-slate-300 flex items-center"
                            onClick={() => handleEdit(item.id)}
                          >
                            <EditIcon />
                          </button>
                        </Tooltip>

                      ) : item.minutesCreated === true ? (
                        <div className="flex justify-center gap-2">

                            <Tooltip title="Meeting Minutes Update" arrow placement="top">
                                <button
                                  className="text-black rounded border border-slate-500 text-sm font-medium hover:bg-slate-300 flex items-center"
                                  onClick={() => handleEditMinutes(item.meetingId)}
                                >
                                  <EditCalendarIcon />
                                </button>
                              </Tooltip>
                              {/* <button
                                  className="bg-[#e68a00] text-white p-1 rounded text-sm font-medium hover:bg-[#b36b00]"
                                  onClick={() => {
                                    // localStorage.setItem("updateDraft", false);
                                    handleEditMinutes(
                                      item.meetingId
                                    );
                                  }}
                                >
                                  Edit Minutes
                                </button> */}

                              {/* <button
                                  className="bg-[#008080] text-white p-1 rounded text-sm font-medium hover:bg-[#004d4d]"
                                  onClick={() => {
                                    // localStorage.setItem("updateDraft", false);
                                    handleViewMinutes(
                                      item.meetingId
                                    );
                                  }}
                                >
                                  View Minutes
                                </button> */}

                                <Tooltip title="Meeting Minutes View" arrow placement="top">
                                <button
                                  className="text-black rounded border border-slate-500 text-sm font-medium hover:bg-slate-300 flex items-center"
                                  onClick={() => handleViewMinutes(item.meetingId)}
                                >
                                  <SummarizeIcon />
                                </button>
                              </Tooltip>
                          </div>
                        ) : (
                          // <button
                          //         className="bg-green-500 text-white p-1 rounded text-sm font-medium hover:bg-green-700"
                          //         onClick={() => {
                          //           // localStorage.setItem("updateDraft", false);
                          //           handleCreateMinutes(
                          //             item.id
                          //           );
                          //         }}
                          //       >
                          //         Create Minutes
                          //       </button>

                              <Tooltip title="Create Meeting Minutes" arrow placement="top">
                                <button
                                  className="text-black rounded border border-gray-500 text-sm font-medium hover:bg-slate-300 flex items-center"
                                  onClick={() => handleCreateMinutes(item.id)}
                                >
                                  <NoteAddIcon />
                                </button>
                              </Tooltip>
                      )}
                      </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <div className="flex justify-between items-center mt-2">
          <button onClick={prevPage} disabled={currentPage === 1} className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50">Previous</button>
          <div className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50">Page {currentPage} of {totalPages}</div>
          <button onClick={nextPage} disabled={currentPage === totalPages} className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50">Next</button>
        </div> */}

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
    </div>
  );
};

export default MeetingDashboard;
