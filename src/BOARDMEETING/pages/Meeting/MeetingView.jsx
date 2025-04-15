import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import AgendaAdd from '../Agenda/AgendaAdd';
import { Base_api } from "../../../utils/api/Base_api";
import { decryptId } from '../../../pages/Encrypted/Encrypted';
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { encryptId } from "../../../pages/Encrypted/Encrypted";


const AgendaModal = ({ isOpen, onClose, meetingId }) => {
    if (!isOpen) return null;

    return (
        // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        //     <div className="bg-white rounded-lg shadow-lg w-4/5">
        //     <button 
        //         className="absolute top-2 right-2 text-black text-xl" 
        //         onClick={() => {
        //             onClose(); // Call the onClose function to close the modal
        //             window.location.reload(); // Refresh the page
        //         }}
        //         >
        //         &times; {/* Close button symbol */}
        //     </button>

        //         <AgendaAdd onClose={onClose} meetingId={meetingId} />
        //     </div>
        // </div>

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white rounded-lg shadow-lg w-4/5">
          {/* Close Button */}
          <button  style={{ top: '-6px', right: '4px' }} 
            className="absolute text-black text-2xl hover:text-red-600"
            onClick={() => {
              onClose();
              window.location.reload();
            }}
          >
            &times;
          </button>
      
          {/* Modal Content */}
          <AgendaAdd onClose={onClose} meetingId={meetingId} />
        </div>
      </div>

    );
};

const MeetingView = () => {
    const { id } = useParams(); // Extract meetingId from URL parameters
    const [meetingDetails, setMeetingDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [approvedAgendas, setApprovedAgendas] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const decryptedId = decryptId(id); // Ensure this returns a valid ID
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApprovedAgendas = async () => {
            try {
                const response = await fetch(`${Base_api}/api/dashboard/approvedagenda/${decryptedId}`);
                const data = await response.json();
                console.log("Approved Agendas:", data);
                setApprovedAgendas(data);
            } catch (error) {
                console.error("Error fetching approved agendas:", error);
            }
        };

        fetchApprovedAgendas();
    }, [decryptedId]); 

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const response = await fetch(`${Base_api}/api/meetings/view/${decryptedId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setMeetingDetails(result);
                console.log(result);
            } catch (error) {
                console.error("Error fetching meeting details:", error);
                setError(error.message); // Set error message
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchData();
    }, [decryptedId]); // Use decryptedId as a dependency

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Pagination logic
    const totalPages = Math.ceil(approvedAgendas.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = approvedAgendas.slice(indexOfFirstRow, indexOfLastRow);

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing rows per page
    };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleAgenda = () => {
        setIsModalOpen(true);
    };

    const handleMeeting = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
              `${Base_api}/api/meetings/close/${decryptedId}`,
              {
                method: "PUT", 
              }
            );
        
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }
        
            toast.success("Meeting Closed successfully!", {
              position: "top-right",
              autoClose: 2000,
              theme: "colored",
              transition: Bounce,
            });
            
            setTimeout(() => {
              navigate("../board-meeting-dashboard");
            }, 2000);
          } catch (error) {
            console.error("Update error:", error);
            toast.error(error.message, {
              autoClose: 2000,
            });
          }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleView = (id) => {
         console.log(id);
            navigate(
              `../view-agenda/${encryptId(
                id)}` , { replace: true }
            );
      };

    return (
        <div className="mt-6 mb-6 p-6 border border-gray-300 rounded-lg shadow-lg bg-white w-3/4">
            <h2 className="text-center text-2xl font-bold mb-4">Meeting Details</h2>
            <div className='flex justify-between space-x-4 bg-slate-100'>
                <div className='bg-red w-1/2 text-left p-4'>
                    <div>
                        <p><strong>Meeting ID:</strong> {meetingDetails ? meetingDetails.id : 'Loading...'}</p>
                        <p><strong>Title:</strong> {meetingDetails ? meetingDetails.title : 'Loading...'}</p>
                        <p><strong>Date:</strong> {meetingDetails ? new Date(meetingDetails.date).toLocaleDateString() : 'Loading...'}</p>
                        <p><strong>Time:</strong> {meetingDetails ? meetingDetails.time : 'Loading...'}</p>
                        <p><strong>Type:</strong> {meetingDetails ? meetingDetails.type : 'Loading...'}</p>
                        {meetingDetails && (meetingDetails.type === "Online" || meetingDetails.type === "Hybrid") && (
                            <p><strong>Meeting Link:</strong> <a href={meetingDetails.meetingLink} target="_blank" rel="noopener noreferrer" 
                            style={{ color: '#007bff', textDecoration: 'underline', cursor: 'pointer' }}>
                            {meetingDetails.meetingLink}
                          </a></p>
                        )}
                        <p><strong>Place:</strong> {meetingDetails ? meetingDetails.place : 'Loading...'}</p>
                    </div>
                </div>
                
                {meetingDetails && meetingDetails.close === 0 && (
                    <div className='w-1/2 p-4'>
                        <div className="flex justify-end gap-2">
                            <button
                                className="bg-blue-500 text-white p-1 px-2 rounded text-sm font-medium hover:bg-blue-700"
                                onClick={handleAgenda}
                            >
                                Add/Remove Agenda
                            </button>
                            <button
                                className="bg-green-500 text-white p-1 px-2 rounded text-sm font-medium hover:bg-green-700"
                                onClick={handleMeeting}
                            >
                                Finalize Meeting
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-6 bg-slate-300">
                <h3 className="text-xl font-semibold mb-2 text-center">Meeting Agenda</h3>
                <table className="w-full text-sm text-center rtl:text-right text-gray-500">
                    <thead className="bg-gray-200 top-0 border-slate-900">
                        <tr>
                            <th className="py-2 px-1 border border-slate-900 text-sm font-medium text-black">আলোচ্য নং</th>
                            <th className="py-2 px-1 border border-slate-900 text-sm font-medium text-black">স্মারক নং</th>
                            <th className="py-2 px-1 border border-slate-900 text-sm font-medium text-black">বিষয়</th>
                            {/* <th className="py-2 px-1 border border-slate-900 text-sm font-medium text-black">পাতা</th> */}
                            <th className="py-2 px-1 border border-slate-900 text-sm font-medium text-black">সিদ্ধান্ত</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((item, index) => (
                            <tr key={index}>
                                <td className="w-[100px] border border-slate-900 text-sm font-medium text-black">{index + 1}</td>
                                <td className="w-[100px] border border-slate-900 text-sm font-medium text-black">{item.agendaNumber}</td>
                                <td className="w-[600px] text-left border border-slate-900 text-sm font-medium text-black cursor-pointer underline"
                                    onClick={() => handleView(item.boardMemoId)}
                                    >
                                    {item.agendaSubject}
                                    </td>
                                {/* <td className="w-[100px] border border-slate-900 text-sm font-medium text-black">১-৩</td> */}
                                <td className="w-[100px] border border-slate-900 text-sm font-medium text-black">{item.approverStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination controls */}
                <div className="flex justify-between items-center mt-2">
                    <button onClick={prevPage} disabled={currentPage === 1} className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50">Previous</button>
                    <div className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50">Page {currentPage} of {totalPages}</div>
                    <button onClick={nextPage} disabled={currentPage === totalPages} className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50">Next</button>
                </div>
            </div>
            <AgendaModal isOpen={isModalOpen} onClose={closeModal} meetingId={decryptedId} />
        </div>
    );
};

export default MeetingView;
