import React, { useEffect, useState } from "react";
import { Base_api } from "../../../utils/api/Base_api";
import { toast, Bounce } from "react-toastify";
import NavbarImage from '../../../assets/mega.png'; 


const AgendaAdd = ({onClose,meetingId}) => {
  const [agendas, setAgendas] = useState([]);
  const [approvedAgendas, setApprovedAgendas] = useState([]);
  const [selectedAgenda, setSelectedAgenda] = useState(null);
  
  // console.log("Meeting ID passed to AgendaAdd:", meetingId);
  useEffect(() => {
    const fetchPendingAgendas = async () => {
      try {
        const response = await fetch(`${Base_api}/api/dashboard/allagenda`);
        const data = await response.json();
        console.log("Pending Agendas:", data);
        setAgendas(data.slice(0, 10)); // Limit to 10 items
      } catch (error) {
        console.error("Error fetching pending agendas:", error);
      }
    };

    fetchPendingAgendas();
  }, []);

  useEffect(() => {
    const fetchApprovedAgendas = async () => {
      try {
        const response = await fetch(`${Base_api}/api/dashboard/approvedagenda/${meetingId}`);
        const data = await response.json();
        console.log("Approved Agendas:", data);
        setApprovedAgendas(data);
      } catch (error) {
        console.error("Error fetching approved agendas:", error);
      }
    };

    fetchApprovedAgendas();
  }, [meetingId]); 

  const handleSelectedAgenda = (agenda) => {
    setSelectedAgenda(agenda.id); // Set only the agenda ID
  };

  const handleApproveAgenda = async (e) => {
    e.preventDefault();
    if (selectedAgenda) {
      const agendaToApprove = agendas.find((agenda) => agenda.id === selectedAgenda);
      
      if (agendaToApprove) {
        try {
            const response = await fetch(
              `${Base_api}/api/meetings/addAgenda/${agendaToApprove.id}/${meetingId}`,
              {
                method: "PUT", 
              }
            );
        
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }
          } catch (error) {
            console.error("Update error:", error);
            toast.error(error.message, {
              autoClose: 2000,
            });
          }
        
        setApprovedAgendas([...approvedAgendas, agendaToApprove]);
        setAgendas(agendas.filter((agenda) => agenda.id !== selectedAgenda));
        setSelectedAgenda(null); // Reset selected agenda after approval
      }
    }
  };

  const handleApproveAllAgenda = async (e) => {
    e.preventDefault();
    // Check if there are any agendas to approve
    if (agendas.length > 0) {
      // Add all agendas to approvedAgendas
      setApprovedAgendas([...approvedAgendas, ...agendas]);
      
      // Clear the agendas list
      setAgendas([]); 
      
      // Reset selected agenda
      setSelectedAgenda(null);

      try {
        const response = await fetch(
          `${Base_api}/api/meetings/addAllAgenda/${meetingId}`,
          {
            method: "PUT", 
          }
        );
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error("Update error:", error);
        toast.error(error.message, {
          autoClose: 2000,
        });
      }

    }
  };
  

  const handleRemoveAgenda = async (e) => {
    e.preventDefault();
    if (selectedAgenda) {
      const agendaToRemove = approvedAgendas.find((agenda) => agenda.id === selectedAgenda);
      if (agendaToRemove) {

        try {
          const response = await fetch(
            `${Base_api}/api/meetings/removeAgenda/${agendaToRemove.id}/${meetingId}`,
            {
              method: "PUT", 
            }
          );
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          console.error("Update error:", error);
          toast.error(error.message, {
            autoClose: 2000,
          });
        }

        setApprovedAgendas(approvedAgendas.filter((agenda) => agenda.id !== selectedAgenda));
        setAgendas([...agendas, agendaToRemove]); // Add back to the pending agendas list
        setSelectedAgenda(null); // Reset selected agenda after removal
      }
    }
  };

  const handleRemoveAllAgendas = async (e) => {
    e.preventDefault();
    if (approvedAgendas.length > 0) {
      // Move all approved agendas back to pending list
      setAgendas([...agendas, ...approvedAgendas]);
      // Clear the approved agendas list
      setApprovedAgendas([]); 

      try {
        const response = await fetch(
          `${Base_api}/api/meetings/removeAllAgenda/${meetingId}`,
          {
            method: "PUT", 
          }
        );
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error("Update error:", error);
        toast.error(error.message, {
          autoClose: 2000,
        });
      }
    }
  };
  
  

  return (
    <div className="flex m-6 justify-between rounded shadow-lg relative"
    style={{
              background: `
                url(${NavbarImage}) no-repeat center,
                linear-gradient(to right, #073810, #0b5018, #213570, #021220)  
              `,
              backgroundSize: "cover",
            }}>
       
      {/* Pending Agenda List */}
      
      <div className="flex flex-col gap-2 w-3/6 bg-slate-100 m-3 text-center rounded">
        <h1 className="text-center text-lg font-[500] text-black">Pending Agenda List</h1>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-300">
              <th className="py-2 px-1 border border-slate-400 text-sm font-medium text-gray-600">স্মারক নং</th>
              <th className="py-2 px-1 border border-slate-400 text-sm font-medium text-gray-600">বিষয়</th>
              {/* <th className="py-2 px-1 border border-slate-400 text-sm font-medium text-gray-600">পাতা</th> */}
              <th className="py-2 px-1 border border-slate-400 text-sm font-medium text-gray-600">হতে</th>
            </tr>
          </thead>
          <tbody>
            {agendas.map((agenda) => (
              <tr
                key={agenda.id}
                className={`cursor-pointer rounded ${agenda.id === selectedAgenda ? "table-row selected-bg selected" : ""}`}
                // style={{
                //   backgroundImage: `url(${NavbarImage})`,
                //   backgroundSize: 'cover',
                //   backgroundPosition: 'center',
                // }}
                onClick={() => handleSelectedAgenda(agenda)}
              >
                <td className="w-[100px] border border-slate-400 text-sm font-medium text-gray-600">{agenda.agendaNumber}</td>
                <td className="w-[100px] text-left border border-slate-400 text-sm font-medium text-gray-600">{agenda.agendaSubject}</td>
                {/* <td className="w-[100px] border border-slate-400 text-sm font-medium text-gray-600">১-৩</td> */}
                <td className="w-[100px] border border-slate-400 text-sm font-medium text-gray-600">{agenda.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Approve/Remove Buttons */}
      <div className="flex flex-col items-center justify-center mx-2"> {/* Use mx-2 for minimal horizontal space */}
        <button
          className="bg-slate-400 active:bg-slate-600 hover:bg-slate-500 cursor-pointer p-1 border rounded-md mb-2 w-8"
          onClick={handleApproveAgenda}
          disabled={selectedAgenda === null}
        >
          {">"}
        </button>
        <button
          className="bg-slate-400 active:bg-slate-600 hover:bg-slate-500 cursor-pointer p-1 border rounded-md mb-2 w-8"
          onClick={handleApproveAllAgenda}
        >
          {">>"}
        </button>
        <button
          className="bg-slate-400 active:bg-slate-600 hover:bg-slate-500 cursor-pointer p-1 border rounded-md mb-2 w-8"
          onClick={handleRemoveAllAgendas}
        >
          {"<<"}
        </button>
        <button
          className="bg-slate-400 active:bg-slate-600 hover:bg-slate-500 cursor-pointer p-1 border rounded-md w-8"
          onClick={handleRemoveAgenda}
          disabled={selectedAgenda === null}
        >
          {"<"}
        </button>
      </div>

      {/* Approved Agenda List */}
      <div className="flex flex-col gap-2 w-3/6 bg-slate-100 m-3 text-center rounded">
        <h1 className="text-center text-lg font-[500] text-black">Approved Agenda List</h1>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-300">
              <th className="py-2 px-1 border border-slate-400 text-sm font-medium text-gray-600">স্মারক নং</th>
              <th className="py-2 px-1 border border-slate-400 text-sm font-medium text-gray-600">বিষয়</th>
              {/* <th className="py-2 px-1 border border-slate-400 text-sm font-medium text-gray-600">পাতা</th> */}
              <th className="py-2 px-1 border border-slate-400 text-sm font-medium text-gray-600">হতে</th>
            </tr>
          </thead>
          <tbody>
            {approvedAgendas.map((agenda) => (
              <tr
                key={agenda.id}
                className={`cursor-pointer ${agenda.id === selectedAgenda ? "table-row selected-bg selected" : ""}`}
                onClick={() => handleSelectedAgenda(agenda)}
              >
                <td className="w-[100px] border border-slate-400 text-sm font-medium text-gray-600">{agenda.agendaNumber}</td>
                <td className="w-[100px] text-left border border-slate-400 text-sm font-medium text-gray-600">{agenda.agendaSubject}</td>
                {/* <td className="w-[100px] border border-slate-400 text-sm font-medium text-gray-600">১-৩</td> */}
                <td className="w-[100px] border border-slate-400 text-sm font-medium text-gray-600">{agenda.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgendaAdd;
