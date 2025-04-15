import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { Base_api } from "../../../utils/api/Base_api";
import { jwtDecode } from "jwt-decode";
import { encryptId } from "../../../pages/Encrypted/Encrypted";
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import Tooltip from '@mui/material/Tooltip';
import EditNoteIcon from '@mui/icons-material/EditNote';

const AgendaDashboard = () => {
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
      // console.log("User Info Map:", userMap);
      
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };
  

  // Fetch data
  const fetchData = async () => {
    // try {
    //   const response = await fetch(`${Base_api}/api/dashboard/allagenda`);
    //   // console.log("User Info Map:", response);
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   const data = await response.json();
    //   console.log("id " , data);
    //   setAcceptedForm(sortDataBySubmissionTime(data));
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
    try {
            const response = await fetch(`${Base_api}/api/dashboard/allagenda`);
            const data = await response.json();
            console.log("Pending Agendas:", data);
            setAcceptedForm(sortDataBySubmissionTime(data));
          } catch (error) {
            console.error("Error fetching pending agendas:", error);
          }
  };

const sortDataBySubmissionTime = (data) => {
  return data.sort((a, b) => new Date(b.submitDate) - new Date(a.submitDate));
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
    <div className="flex flex-col w-10/12 items-center">
      <h1 className="text-3xl font-bold mt-2 text-center pb-10">Agenda Dashboard</h1>
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
     console.log(id);
        navigate(
          `../view-agenda/${encryptId(
            id)}` , { replace: true }
        );
  };

  const handleEdit = (id) => {
     navigate(
          `../edit-agenda/${encryptId(
            id)}` , { replace: true }
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

  return (
    <div className="w-full">
      <div className="sm:rounded-lg bg-white p-5 shadow-[0_5px_10px_0px_gray]">
        <div className="max-h-60 overflow-y-auto -pt-10">
        <table className="w-full text-sm text-left rtl:text-right text-black">
          <thead className="bg-gray-200 top-0 border-slate-400">
            <tr>
              <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium underline" style={{ fontWeight: '700' }}>ক্রমিক নং</th>
              <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium underline" style={{ fontWeight: '700' }}>স্মারক নং</th>
              <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium underline" style={{ fontWeight: '700' }}>বিষয়</th>
              <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium underline" style={{ fontWeight: '700' }}>হতে</th>
              <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium underline" style={{ fontWeight: '700' }}>Created By</th>
              <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium underline" style={{ fontWeight: '700' }}>Create Date</th>
              <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium underline" style={{ fontWeight: '700' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, index) => (
              <tr key={item.meetingid} className="even:bg-blue-100">
                <td className="text-center border border-l-slate-400 border-r-slate-400 border-b-slate-400 text-sm font-medium">{index + 1}</td>
                <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium">{item.refNo}</td>
                <td className="w-[400px] text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium">{item.agendaSubject}</td>
                <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium">{item.department}</td>
                <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium">{userInfo[item.userid] ? userInfo[item.userid].username : 'Loading...'}</td>
                <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium">{new Date(item.submitDate ).toLocaleString()}</td>
                <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium">
                <div className="flex justify-center gap-2">
                        {/* <button
                          className="bg-blue-500 text-white p-1 px-2 rounded text-sm font-medium hover:bg-blue-700"
                          onClick={() =>
                            handleView(
                              item.boardMemoId,
                            )
                          }
                        >
                          View
                        </button>
                        <button
                          className="bg-green-500 text-white p-1 px-2 rounded text-sm font-medium hover:bg-green-700"
                          onClick={() => {
                            // localStorage.setItem("updateDraft", false);
                            handleEdit(
                              item.boardMemoId
                            );
                          }}
                        >
                          Edit
                        </button> */}

                        <Tooltip title="Agenda Edit" arrow placement="top">
                          <button
                            className="text-black rounded border border-gray-500 text-sm font-medium hover:bg-slate-300 flex items-center"
                            onClick={() => {console.log("agenda" , item.formid);
                              handleEdit(item.boardMemoId);
                            }}
                          >
                            <EditNoteIcon />
                          </button>
                        </Tooltip>

                        <Tooltip title="Agenda View" arrow placement="top">
                          <button
                            className="text-black rounded border border-gray-500 text-sm font-medium hover:bg-slate-300 flex items-center"
                            onClick={() => {console.log("agenda" , item.formid);
                              handleView(item.boardMemoId);
                            }}
                          >
                            <ViewModuleIcon />
                          </button>
                        </Tooltip>
                      </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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

export default AgendaDashboard;
