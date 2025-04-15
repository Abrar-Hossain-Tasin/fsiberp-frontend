import {
  faCheckCircle,
  faHourglassHalf,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { Base_api } from "../../utils/api/Base_api";
import { encryptId } from "../../pages/Encrypted/Encrypted";

import logo from "../../assets/pdflogo.png";
import jsPDF from "jspdf";
import { CSVLink } from "react-csv";

const BoardMemoAdminDashboard = () => {
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
        `${Base_api}/api/boardmemo/admin/${type}/${userid}`
      );
      const data = await response.json();
      switch (type) {
        case "pending":
          setPendingForm(sortDataBySubmissionTime(data));
          break;
        case "accepted":
          setAcceptedForm(sortDataBySubmissionTime(data));
          break;
        // case "onleave":
        //   setAcceptedForm(sortDataBySubmissionTime(data));
        //   break;
        case "rejected":
          setRejectedForm(sortDataBySubmissionTime(data));
          break;
        default:
          break;
      }
    } catch (error) {
      // console.error("Error fetching data:", error);
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
    // fetchData("onleave");
    fetchData("rejected");
  }, [userid]);

  useEffect(() => {
    localStorage.setItem("activeTable", activeTable);
  }, [activeTable]);

  return (
    <div className="flex flex-col w-10/12">
      <h1 className="text-3xl font-bold mt-2 text-center">Admin Dashboard</h1>
      <div className="flex gap-5 w-full px-10">
        <div className="flex gap-5 w-full px-10 p-2">
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
      {activeTable === "Pending" && (
        <Table data={pendingForm} activeTable="Pending" />
      )}
      {activeTable === "Rejected" && (
        <Table data={rejectedForm} activeTable="Rejected" />
      )}
      {activeTable === "Accepted" && (
        <Table data={acceptedForm} activeTable="Accepted" />
      )}
    </div>
  );
};

// const Table = ({ data }) => {
//   const navigate = useNavigate();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [tableData, setTableData] = useState(data); // State to manage the data

//   useEffect(() => {
//     setTableData(data); // Update tableData when data prop changes
//   }, [data]);

//   const handleView = (userId, formId, id) => {
//     navigate(
//       `../view/${encryptId(userId)}/${encryptId(formId)}/${encryptId(id)}`
//     );
//   };

//   // Calculate total pages
//   const totalPages = Math.ceil(tableData.length / rowsPerPage);

//   // Get current rows
//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

//   // Change rows per page
//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page when changing rows per page
//   };

//   // Handle next and previous page
//   const nextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const prevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   return (
//     <div className="flex justify-center">
//       {/* <div className="bg-white my-5">
//         <table className="w-full">
//           <thead>
//             <tr>
//               <th className="text-left px-1 border">name</th>
//               <th className="text-left px-1 border">name</th>
//               <th className="text-left px-1 border">name</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="even:bg-blue-100">
//               <td className="border">name</td>
//               <td className="border">name</td>
//               <td className="border">name</td>
//             </tr>
//             <tr className="even:bg-blue-100">
//               <td className="border">name</td>
//               <td className="border">name</td>
//               <td className="border">namey</td>
//             </tr>
//           </tbody>
//         </table>
//       </div> */}

//       <div className="sm:rounded-lg bg-white p-5 shadow-[0_5px_10px_0px_gray]">
//         <div className="flex justify-between flex-wrap gap-2">
//           <input
//             className="w-40 text-[#3b3838] text-sm border-[1px] border-black px-1 py-[2px] rounded-md font-bold placeholder-gray-500 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100"
//             type="text"
//             placeholder="Search User Id"
//           />
//           <input
//             className="w-40 text-[#3b3838] text-sm border-[1px] border-black px-1 py-[2px] rounded-md font-bold placeholder-gray-500 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100"
//             type="text"
//             placeholder="Search Branch Code"
//           />
//           <input
//             className="w-40 text-[#3b3838] text-sm border-[1px] border-black px-1 py-[2px] rounded-md font-bold placeholder-gray-500 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100"
//             type="text"
//             placeholder="Search Subject"
//           />
//           <input
//             className="w-40 text-[#3b3838] text-sm border-[1px] border-black px-1 py-[2px] rounded-md font-bold placeholder-gray-500 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100"
//             type="text"
//             placeholder="Search Unit"
//           />
//           <div className="flex gap-2 font-[500]">
//             <label>From : </label>
//             <input
//               className="w-40 text-[#3b3838] text-sm border-[1px] border-black px-1 py-[2px] rounded-md font-bold placeholder-gray-500 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100"
//               type="date"
//             />
//             <label>To : </label>
//             <input
//               className="w-40 text-[#3b3838] text-sm border-[1px] border-black px-1 py-[2px] rounded-md font-bold placeholder-gray-500 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100"
//               type="date"
//             />
//           </div>
//         </div>
//         <div className="max-h-60 overflow-y-auto">
//           <table className="w-full h-full text-sm text-left rtl:text-right text-gray-500">
//             <thead className="bg-gray-200 top-0 z-10">
//               <tr>
//                 <th className="py-2 px-1 text-center border   border-slate-400 text-sm font-medium text-gray-600">
//                   S. No.
//                 </th>
//                 <th className="py-2 px-1 text-center border  border-slate-400 text-sm font-medium text-gray-600">
//                   PF Id.
//                 </th>
//                 <th className="py-2 px-1 text-center border  border-slate-400 text-sm font-medium text-gray-600">
//                   Employee Name
//                 </th>
//                 <th className="py-2 px-1 text-center border  border-slate-400 text-sm font-medium text-gray-600">
//                   Branch Code
//                 </th>
//                 <th className="py-2 px-1 text-center border  border-slate-400 text-sm font-medium text-gray-600">
//                   Unit
//                 </th>
//                 <th className="py-2 px-1 text-center border  border-slate-400 text-sm font-medium text-gray-600">
//                   Subject
//                 </th>
//                 <th className="py-2 px-1 text-center border  border-slate-400 text-sm font-medium text-gray-600">
//                   Submitted Date and Time
//                 </th>
//                 <th className="py-2 px-1 text-center border  border-slate-400 text-sm font-medium text-gray-600">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="h-full overflow-auto">
//               {currentRows.map((item, index) => (
//                 <tr key={item.userid} className="even:bg-blue-100">
//                   <td className="text-center border border-l-slate-400 border-r-slate-400 border-b-slate-400  text-sm font-medium text-gray-600">
//                     {indexOfFirstRow + index + 1}
//                   </td>
//                   <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium text-gray-600">
//                     {item.userid}
//                   </td>
//                   <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium text-gray-600">
//                     {item.username}
//                   </td>
//                   <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium text-gray-600">
//                     {item.branchcode}
//                   </td>
//                   <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium text-gray-600">
//                     {item.department}
//                   </td>
//                   <td className="w-[250px] text-justify border border-r-slate-400 border-b-slate-400 text-sm font-medium text-gray-600">
//                     {item.formname}
//                   </td>
//                   <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium text-gray-600">
//                     {new Date(item.submittime).toLocaleString()}
//                   </td>
//                   <td className="text-center border border-r-slate-400  border-b-slate-400 text-sm font-medium text-gray-600">
//                     <button
//                       className="bg-blue-500 text-white mt-2 p-1 px-2 rounded text-sm font-medium hover:bg-blue-700"
//                       onClick={() =>
//                         handleView(item.userid, item.formid, item.id)
//                       }
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* <table className="w-[900px] text-sm text-left rtl:text-right text-gray-500 mt-5">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
//               S. No.
//             </th>
//             <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
//               PF Id.
//             </th>
//             <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
//               Employee Name
//             </th>
//             <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
//               Subject
//             </th>
//             <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
//               Submitted Date and Time
//             </th>
//             <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <DragDropContext onDragEnd={onDragEnd}>
//           <Droppable droppableId="table" direction="vertical">
//             {(provided) => (
//               <tbody {...provided.droppableProps} ref={provided.innerRef}>
//                 {currentRows.map((item, index) => (
//                   <Draggable
//                     key={item.id}
//                     draggableId={item.id.toString()}
//                     index={index}
//                   >
//                     {(provided) => (
//                       <tr
//                         className="hover:bg-gray-100 transition duration-200 even:bg-gray-200"
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                       >
//                         <td className="py-2 px-4 border-b border-gray-200">
//                           {indexOfFirstRow + index + 1}
//                         </td>
//                         <td className="py-2 px-4 border-b border-gray-200">
//                           {item.userid}
//                         </td>
//                         <td className="py-2 px-4 border-b border-gray-200">
//                           {item.username}
//                         </td>
//                         <td className="py-2 px-4 border-b border-gray-200">
//                           {item.formname}
//                         </td>
//                         <td className="py-2 px-4 border-b border-gray-200">
//                           {new Date(item.submittime).toLocaleString()}
//                         </td>
//                         <td className="py-2 px-4 border-b flex gap-1 border-gray-200">
//                           <button
//                             className="bg-blue-500 text-white p-1 px-2 rounded text-sm font-medium hover:bg-blue-700"
//                             onClick={() =>
//                               handleView(item.userid, item.formid, item.id)
//                             }
//                           >
//                             View
//                           </button>
//                           <button
//                             className="bg-green-500 text-white p-1 px-2 rounded text-sm font-medium hover:bg-green-700"
//                             onClick={() =>
//                               handleEdit(item.userid, item.formid, item.id)
//                             }
//                           >
//                             Edit
//                           </button>
//                         </td>
//                       </tr>
//                     )}
//                   </Draggable>
//                 ))}
//               </tbody>
//             )}
//           </Droppable>
//         </DragDropContext>
//       </table> */}

//         <div className="flex justify-between items-center mt-5">
//           <button
//             onClick={prevPage}
//             disabled={currentPage === 1}
//             className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <div className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50">
//             Page {currentPage} of {totalPages}
//           </div>

//           <div className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50">
//             <label className="mr-2">Rows per page:</label>
//             <select
//               value={rowsPerPage}
//               onChange={handleRowsPerPageChange}
//               className="bg-transparent"
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={50}>50</option>
//             </select>
//           </div>
//           <button
//             onClick={nextPage}
//             disabled={currentPage === totalPages}
//             className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

const Table = ({ data, activeTable }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tableData, setTableData] = useState(data);

  // Search state variables
  const [userIdSearch, setUserIdSearch] = useState("");
  const [branchCodeSearch, setBranchCodeSearch] = useState("");
  const [subjectSearch, setSubjectSearch] = useState("");
  const [unitSearch, setUnitSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    setTableData(data);
  }, [data]);

  // const handleView = (userId, formId, id) => {
  //   navigate(
  //     `../view/${encryptId(userId)}/${encryptId(formId)}/${encryptId(id)}`
  //   );
  // };
  const handleView = (userId, formId, id) => {
      // navigate(`../view/${userId}/5001/${id}`);
      navigate(
        `../board-memo/view/${encryptId(userId)}/${encryptId(formId)}/${encryptId(
          id
        )}`
      );
    };

  const sortDescending = (array) => {
    return array.sort(
      (a, b) => new Date(b.submittime) - new Date(a.submittime)
    );
  };

  const filteredData = sortDescending(
    tableData.filter((item) => {
      const itemDate = new Date(item.submittime).toISOString().substring(0, 10);

      return (
        (!userIdSearch || item.userid.toString().includes(userIdSearch)) &&
        (!branchCodeSearch || item.branchcode.includes(branchCodeSearch)) &&
        (!subjectSearch ||
          item.formname.toLowerCase().includes(subjectSearch.toLowerCase())) &&
        (!unitSearch ||
          item.department.toLowerCase().includes(unitSearch.toLowerCase())) &&
        (!fromDate || !toDate || (itemDate >= fromDate && itemDate <= toDate))
      );
    })
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Get current rows
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  // Change rows per page
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Handle next and previous page
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const generatePDF = (type) => {
    const doc = new jsPDF();
    const imgElement = new Image();
    imgElement.src = logo; // Use the imported image

    imgElement.onload = () => {
      const imgWidth = doc.internal.pageSize.getWidth() * 0.5; // 50% of page width
      const imgHeight = (imgElement.height / imgElement.width) * imgWidth; // Maintain aspect ratio
      const xPosition = (doc.internal.pageSize.getWidth() - imgWidth) / 2; // Center the image
      const topMargin = 10;
      const imageYPosition = topMargin;

      // Add the image
      doc.addImage(
        imgElement.src,
        "PNG",
        xPosition,
        imageYPosition,
        imgWidth,
        imgHeight
      );

      // Draw a border below the image with 1px thickness
      const borderYPosition = imageYPosition + imgHeight + 4; // 4px below the image

      doc.setDrawColor("#b5b5b5");
      doc.line(35, 30, 100, 30);
      doc.setLineWidth(0.3); // Set the line width to 1px
      doc.line(
        0,
        borderYPosition,
        doc.internal.pageSize.getWidth(),
        borderYPosition
      ); // Draw the line

      // Set dynamic text based on type and convert to uppercase
      const text = `All (${type.charAt(0).toUpperCase() + type.slice(1)})`;
      const textWidth = doc.getTextWidth(text);
      const xTextPosition = (doc.internal.pageSize.getWidth() - textWidth) / 2; // Center the text

      // Set the Y position for the text with a 20px top margin from the border
      const yPosition = borderYPosition + 10; // 20px margin

      doc.text(text, xTextPosition, yPosition);

      const headers = [
        "S. No.",
        "PF Id",
        "Employee Name",
        "Branch Code",
        "Unit",
        "Subject",
        "Submission Date & Time",
      ];

      let data = filteredData.map((item, index) => [
        (currentPage - 1) * rowsPerPage + index + 1,
        item.userid,
        item.username,
        item.branchcode,
        item.department,
        item.formname,
        new Date(item.submittime).toLocaleString(),
      ]);

      // Center the headers in the table
      doc.autoTable({
        head: [headers],
        body: data,
        startY: yPosition + 10,
        headStyles: { halign: "center" }, // Center align headers
        styles: { halign: "center" }, // Center align all cells
      });

      // Set dynamic filename based on type
      doc.save(`All-${type}.pdf`);
    };

    imgElement.onerror = () => {
      // console.error("Error loading image");
    };
  };

  // start csv
  //CSV-Function
  const generateCSV = () => {
    let data = filteredData.map((item, index) => [
      (currentPage - 1) * rowsPerPage + index + 1,
      item.userid,
      item.username,
      item.branchcode,
      item.department,
      item.formname,
      new Date(item.submittime).toLocaleString(),
    ]);

    const headers = [
      "SN",
      "PF Id",
      "Employee Name",
      "Branch Code",
      "Unit",
      "Subject",
      "Submission Date & Time",
    ];

    return { data, headers };
  };

  // end csv

  return (
    <div>
      <div className="flex justify-center">
        <div className="sm:rounded-lg bg-white p-5 shadow-[0_5px_10px_0px_gray]">
          <div className="flex justify-between flex-wrap gap-2 my-3">
            <input
              className="w-40 text-[#3b3838] text-sm border-[1px] border-black px-1 py-[2px] rounded-md font-bold placeholder-gray-500 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100"
              type="text"
              placeholder="Search User Id"
              value={userIdSearch}
              onChange={(e) => setUserIdSearch(e.target.value)}
            />
            <input
              className="w-40 text-[#3b3838] text-sm border-[1px] border-black px-1 py-[2px] rounded-md font-bold placeholder-gray-500 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100"
              type="text"
              placeholder="Search Branch Code"
              value={branchCodeSearch}
              onChange={(e) => setBranchCodeSearch(e.target.value)}
            />
            <input
              className="w-40 text-[#3b3838] text-sm border-[1px] border-black px-1 py-[2px] rounded-md font-bold placeholder-gray-500 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100"
              type="text"
              placeholder="Search Subject"
              value={subjectSearch}
              onChange={(e) => setSubjectSearch(e.target.value)}
            />
            <input
              className="w-40 text-[#3b3838] text-sm border-[1px] border-black px-1 py-[2px] rounded-md font-bold placeholder-gray-500 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100"
              type="text"
              placeholder="Search Unit"
              value={unitSearch}
              onChange={(e) => setUnitSearch(e.target.value)}
            />
            <div className="flex gap-2 font-[500]">
              <label>From : </label>
              <input
                className="w-40 text-[#3b3838] text-sm border-[1px] border-black px-1 py-[2px] rounded-md font-bold placeholder-gray-500 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
              <label>To : </label>
              <input
                className="w-40 text-[#3b3838] text-sm border-[1px] border-black px-1 py-[2px] rounded-md font-bold placeholder-gray-500 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>

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
                    Branch Code
                  </th>
                  <th className="py-2 px-1 text-center border border-slate-400 text-sm font-medium text-gray-600">
                    Unit
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
              <tbody>
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
                    <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium text-gray-600">
                      {item.branchcode}
                    </td>
                    <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium text-gray-600">
                      {item.department}
                    </td>
                    <td className="w-[250px] text-justify border border-r-slate-400 border-b-slate-400 text-sm font-medium text-gray-600">
                      {item.formname}
                    </td>
                    <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium text-gray-600">
                      {new Date(item.submittime).toLocaleString()}
                    </td>
                    <td className="text-center border border-r-slate-400 border-b-slate-400 text-sm font-medium text-gray-600">
                      <button
                        className="bg-blue-500 text-white mt-2 p-1 px-2 rounded text-sm font-medium hover:bg-blue-700"
                        onClick={() =>
                          handleView(
                            item.userid,
                            (item.formId = "6001"),
                            item.id,
                            item
                          )
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-3 font-[500] text-sm">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="bg-gray-300 text-gray-700 px-2 py-1 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <div className="bg-gray-300 text-gray-700 px-2 py-1 rounded disabled:opacity-50">
              Page {currentPage} of {totalPages}
            </div>

            <div className="bg-gray-300 text-gray-700 px-2 py-1 rounded disabled:opacity-50">
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
              onClick={() => generatePDF(activeTable)}
              className="bg-gray-300 text-gray-700 px-2 py-1 rounded disabled:opacity-50"
            >
              Download PDF
            </button>
            <CSVLink
              data={generateCSV().data}
              headers={generateCSV().headers}
              filename={`all-${activeTable}-list.csv`}
              className="bg-gray-300 text-gray-700 px-2 py-1 rounded disabled:opacity-50"
            >
              Export CSV
            </CSVLink>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-300 text-gray-700 px-2 py-1 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardMemoAdminDashboard;
