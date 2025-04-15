import {
  faCheckCircle,
  faHourglassHalf,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Base_api } from "../../utils/api/Base_api";
import { bmsApiEightyOne } from "../../../utils/api/Base_api";
import { encryptId } from "../Encrypted/Encrypted.jsx";

import { jwtDecode } from "jwt-decode";

const Bms_Dashboard = () => {
  const [isOpenPending, setIsOpenPending] = useState(true);
  const [isOpenRejected, setisOpenRejected] = useState(false);
  const [isOpenAccepted, setIsOpenAccepted] = useState(false);
  const [pendingForm, setPendingForm] = useState([]);
  const [acceptedForm, setAcceptedForm] = useState([]);
  const [rejectedForm, setRejectedForm] = useState([]);
  const [currentPagePending, setCurrentPagePending] = useState(1);
  const [currentPageRejected, setCurrentPageRejected] = useState(1);
  const [currentPageAccepted, setCurrentPageAccepted] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchPending, setSearchPending] = useState("");
  const [searchRejected, setSearchRejected] = useState("");
  const [searchAccepted, setSearchAccepted] = useState("");

  // const userid = localStorage.getItem("user");

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;

  const navigate = useNavigate();

  // Handle toggling of sections
  const handlePending = () => {
    setIsOpenPending(true);
    setisOpenRejected(false);
    setIsOpenAccepted(false);
  };
  const handleRejected = () => {
    setisOpenRejected(true);
    setIsOpenPending(false);
    setIsOpenAccepted(false);
  };
  const handleAccepted = () => {
    setIsOpenAccepted(true);
    setisOpenRejected(false);
    setIsOpenPending(false);
  };

  // Fetch data
  const fetchData = async (type) => {
    try {
      const response = await fetch(
        `${bmsApiEightyOne}/api/bms_dashboard/${type}/${userid}`
      );
      const data = await response.json();
      switch (type) {
        case "pending":
          setPendingForm(data);
          break;
        case "accepted":
          setAcceptedForm(data);
          break;
        case "rejected":
          setRejectedForm(data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData("pending");
    fetchData("accepted");
    fetchData("rejected");
  }, [userid]);

  // Pagination Logic
  const paginate = (array, pageNumber, itemsPerPage) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    return array.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePageChange = (page, type) => {
    switch (type) {
      case "pending":
        setCurrentPagePending(page);
        break;
      case "rejected":
        setCurrentPageRejected(page);
        break;
      case "accepted":
        setCurrentPageAccepted(page);
        break;
      default:
        break;
    }
  };

  const totalPages = (data) => Math.ceil(data.length / itemsPerPage);

  // // Filter Functions
  // const filteredPendingForm = pendingForm.filter((item) =>
  //   item.userid.includes(searchPending)
  // );
  // const filteredRejectedForm = rejectedForm.filter((item) =>
  //   item.userid.includes(searchRejected)
  // );
  // const filteredAcceptedForm = acceptedForm.filter((item) =>
  //   item.userid.includes(searchAccepted)
  // );

  // Sort Function
  const sortDescending = (array) => {
    return array.sort((a, b) => (a.submittime < b.submittime ? 1 : -1)); // Adjust the field as needed
  };

  // Filter Functions
  const filteredPendingForm = sortDescending(
    pendingForm.filter((item) => item.userid.includes(searchPending))
  );
  const filteredRejectedForm = sortDescending(
    rejectedForm.filter((item) => item.userid.includes(searchRejected))
  );
  const filteredAcceptedForm = sortDescending(
    acceptedForm.filter((item) => item.userid.includes(searchAccepted))
  );

  return (
    <div className="flex flex-col w-10/12 items-center">
      <div className="flex gap-5 w-full px-10 py-5">
        <div
          onClick={handlePending}
          className={`p-4 w-1/3 cursor-pointer shadow-[0_5px_10px_0px_gray] ${
            isOpenPending ? "bg-yellow-500" : ""
          } bg-yellow-100 rounded-lg shadow-sm flex items-center transition-all duration-300 hover:shadow-md`}
        >
          <FontAwesomeIcon
            icon={faHourglassHalf}
            className={`${
              isOpenPending ? "text-white" : "text-yellow-500"
            } w-7 h-7 mr-4`}
          />
          <div>
            <p
              className={`text-lg font-semibold ${
                isOpenPending ? "text-white" : ""
              }`}
            >
              Pending
            </p>
            <p
              className={`text-2xl font-bold ${
                isOpenPending ? "text-white" : ""
              }`}
            >
              {pendingForm.length}
            </p>
          </div>
        </div>
        <div
          onClick={handleRejected}
          className={`p-4 w-1/3 cursor-pointer shadow-[0_5px_10px_0px_gray]  ${
            isOpenRejected ? "bg-red-500" : "bg-red-100"
          }  rounded-lg shadow-sm flex items-center transition-all duration-300 hover:shadow-md`}
        >
          {/* <DashboardCustomizeOutlinedIcon
              className={`${
                isOpenRejected ? "text-white" : "text-red-500"
              } w-10 h-10 mr-4`}
            /> */}
          <FontAwesomeIcon
            icon={faTimesCircle}
            className={`${
              isOpenRejected ? "text-white" : "text-red-500"
            } w-7 h-7 mr-4`}
          />
          <div>
            <p
              className={`text-lg font-semibold ${
                isOpenRejected ? "text-white" : ""
              }`}
            >
              Rejected
            </p>
            <p
              className={`text-2xl font-bold ${
                isOpenRejected ? "text-white" : ""
              }`}
            >
              {rejectedForm.length}
            </p>
          </div>
        </div>
        <div
          onClick={handleAccepted}
          className={`p-4 w-1/3 cursor-pointer shadow-[0_5px_10px_0px_gray] ${
            isOpenAccepted ? "bg-green-500" : "bg-green-100"
          } rounded-lg shadow-sm flex items-center transition-all duration-300 hover:shadow-md`}
        >
          {/* <DashboardCustomizeOutlinedIcon
              className={`${
                isOpenAccepted ? "text-white" : "text-green-500"
              } w-10 h-10 mr-4`}
            /> */}
          <FontAwesomeIcon
            icon={faCheckCircle}
            className={`${
              isOpenAccepted ? "text-white" : "text-green-500"
            } w-7 h-7 mr-4`}
          />

          <div>
            <p
              className={`text-lg font-semibold ${
                isOpenAccepted ? "text-white" : ""
              }`}
            >
              Accepted
            </p>
            <p
              className={`text-2xl font-bold ${
                isOpenAccepted ? "text-white" : ""
              }`}
            >
              {acceptedForm.length}
            </p>
          </div>
        </div>
      </div>
      <div className=" ">
        {/* Pending Table */}
        {isOpenPending && (
          <div className="relative overflow-hidden shadow-[0_5px_10px_0px_gray] sm:rounded-lg bg-white p-5">
            <div className="h-64 pt-0 relative overflow-y-auto   ">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-200 ">
                  <tr>
                    <th className="px-6 py-2 rounded-s-lg">SN</th>
                    <th className="px-6 py-2">PF Id</th>
                    <th className="px-6 py-2">Employee Name</th>
                    <th className="px-6 py-2">Form Name</th>
                    <th className="px-6 py-2">Submission Date & Time</th>
                    <th className="px-6 py-2 rounded-e-lg">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginate(
                    filteredPendingForm,
                    currentPagePending,
                    itemsPerPage
                  ).map((item, index) => (
                    <tr
                      key={index}
                      className="odd:bg-white even:bg-gray-100 border-b"
                    >
                      <td className="px-6 py-1 text-center">
                        {(currentPagePending - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-6 py-1 text-center">
                        <strong>{item.userid}</strong>
                      </td>
                      <td className="px-6 py-1 text-center">
                        <strong>{item.username}</strong>
                      </td>
                      <td className="px-6 py-1">{item.formname}</td>
                      <td className="px-6 py-1 text-center">
                        {new Date(item.submittime).toLocaleString()}
                      </td>
                      <td className="px-6 py-1 flex gap-1">
                        <button
                          className="py-1 px-2 font-medium border border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded"
                          onClick={() =>
                            navigate(
                              `/bms/view/${encryptId(item.userid)}/${encryptId(
                                item.formid
                              )}/${encryptId(item.id)}`
                            )
                          }
                        >
                          View
                        </button>
                        <button
                          disabled={item.secondmanstatus === "Accepted"}
                          className={`${
                            item.secondmanstatus === "Accepted"
                              ? "bg-slate-300 border-slate-500 text-slate-500"
                              : "hover:bg-cyan-500 hover:text-white border-cyan-500 text-cyan-500"
                          } py-1 px-2 font-medium border   rounded`}
                          onClick={() =>
                            navigate(
                              `/bms/edit/${encryptId(item.userid)}/${encryptId(
                                item.formid
                              )}/${encryptId(item.id)}`
                            )
                          }
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPagePending}
              totalPages={totalPages(filteredPendingForm)}
              onPageChange={(page) => handlePageChange(page, "pending")}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={(e) =>
                setItemsPerPage(Number(e.target.value))
              }
            />
          </div>
        )}

        {/* Rejected Table */}
        {isOpenRejected && (
          <div className="relative overflow-hidden shadow-[0_5px_10px_0px_gray] sm:rounded-lg bg-white p-5">
            <div className="h-64 pt-0 relative overflow-y-auto   ">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-200 ">
                  <tr>
                    <th className="px-6 py-2 rounded-s-lg">SN</th>
                    <th className="px-6 py-2">PF Id</th>
                    <th className="px-6 py-2">Employee Name</th>
                    <th className="px-6 py-2">Form Name</th>
                    <th className="px-6 py-2">Submission Date & Time</th>
                    <th className="px-6 py-2 rounded-e-lg">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginate(
                    filteredRejectedForm,
                    currentPageRejected,
                    itemsPerPage
                  ).map((item, index) => (
                    <tr
                      key={index}
                      className="odd:bg-white even:bg-gray-100 border-b"
                    >
                      <td className="px-6 py-1">
                        {(currentPagePending - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-6 py-1">
                        <strong>{item.userid}</strong>
                      </td>
                      <td className="px-6 py-1">
                        <strong>{item.username}</strong>
                      </td>
                      <td className="px-6 py-1">{item.formname}</td>
                      <td className="px-6 py-1">
                        {new Date(item.submittime).toLocaleString()}
                      </td>
                      <td className="px-6 py-1 flex gap-1">
                        <button
                          className="py-1 px-2 font-medium border border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded"
                          onClick={() =>
                            navigate(
                              `/bms/view/${encryptId(item.userid)}/${encryptId(
                                item.formid
                              )}/${encryptId(item.id)}`
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

            <Pagination
              currentPage={currentPageRejected}
              totalPages={totalPages(filteredRejectedForm)}
              onPageChange={(page) => handlePageChange(page, "rejected")}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={(e) =>
                setItemsPerPage(Number(e.target.value))
              }
            />
          </div>
        )}

        {/* Accepted Table */}
        {isOpenAccepted && (
          <div className="relative overflow-hidden shadow-[0_5px_10px_0px_gray] sm:rounded-lg bg-white p-5">
            <div className="h-64 pt-0 relative overflow-y-auto   ">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-200 ">
                  <tr>
                    <th className="px-6 py-2 rounded-s-lg">SN</th>
                    <th className="px-6 py-2">PF Id</th>
                    <th className="px-6 py-2">Employee Name</th>
                    <th className="px-6 py-2">Form Name</th>
                    <th className="px-6 py-2">Submission Date & Time</th>
                    <th className="px-6 py-2 rounded-e-lg">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginate(
                    filteredAcceptedForm,
                    currentPageAccepted,
                    itemsPerPage
                  ).map((item, index) => (
                    <tr
                      key={index}
                      className="odd:bg-white even:bg-gray-100 border-b"
                    >
                      <td className="px-6 py-1">
                        {(currentPagePending - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-6 py-1">
                        <strong>{item.userid}</strong>
                      </td>
                      <td className="px-6 py-1">
                        <strong>{item.username}</strong>
                      </td>
                      <td className="px-6 py-1">{item.formname}</td>
                      <td className="px-6 py-1">
                        {new Date(item.submittime).toLocaleString()}
                      </td>
                      <td className="px-6 py-1 flex gap-1">
                        <button
                          className="py-1 px-2 font-medium border border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded"
                          onClick={() =>
                            navigate(
                              `/bms/view/${encryptId(item.userid)}/${encryptId(
                                item.formid
                              )}/${encryptId(item.id)}`
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

            <Pagination
              currentPage={currentPageAccepted}
              totalPages={totalPages(filteredAcceptedForm)}
              onPageChange={(page) => handlePageChange(page, "accepted")}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={(e) =>
                setItemsPerPage(Number(e.target.value))
              }
            />
          </div>
        )}
      </div>
      {/* <PrintComponent /> */}
    </div>
  );
};

// Pagination Component
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-b-lg shadow-md">
      <div className="flex items-center">
        <label className="mr-3 text-gray-700 font-semibold">
          Items per page:
        </label>
        <select
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        >
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`mr-2 px-4 py-2 text-white rounded-md ${
            currentPage === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition duration-200`}
        >
          Previous
        </button>
        <span className="font-semibold text-gray-700">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`ml-2 px-4 py-2 text-white rounded-md ${
            currentPage === totalPages
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition duration-200`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Bms_Dashboard;
