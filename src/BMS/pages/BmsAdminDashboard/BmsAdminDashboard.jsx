import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bmsApiEightyOne } from "../../../utils/api/Base_api";
import { encryptId } from "../Encrypted/Encrypted";

import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { jsPDF } from "jspdf";
// import "jspdf-autotable";

// import logo from "../../assets/pdflogo.png";

import {
  faCheckCircle,
  faHourglassHalf,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";

import { decryptId } from "../Encrypted/Encrypted";

import { jwtDecode } from "jwt-decode";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { CSVLink } from "react-csv";

import logo from "../../assets/pdflogo.png";

const BmsAdminDashboard = () => {
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

  const [searchTypePending, setSearchTypePending] = useState("userid");
  const [searchTypeRejected, setSearchTypeRejected] = useState("userid");
  const [searchTypeAccepted, setSearchTypeAccepted] = useState("userid");

  const [selectRow, setSelectRow] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [searchType, setSearchType] = useState("userid");

  const [startDatePending, setStartDatePending] = useState("");
  const [endDatePending, setEndDatePending] = useState("");
  const [startDateRejected, setStartDateRejected] = useState("");
  const [endDateRejected, setEndDateRejected] = useState("");
  const [startDateAccepted, setStartDateAccepted] = useState("");
  const [endDateAccepted, setEndDateAccepted] = useState("");

  const navigate = useNavigate();

  const { userId, formId, id } = useParams();

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid, cito, divhead } = decoded;

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
        `${bmsApiEightyOne}/api/bms_dashboard/admin/${type}/${userid}`
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

  // Sort Function
  const sortDescending = (array) => {
    return array.sort((a, b) => (a.submittime < b.submittime ? 1 : -1)); // Adjust the field as needed
  };

  // Filter Functions

  // const filteredPendingForm = sortDescending(
  //   pendingForm.filter((item) => {
  //     if (searchTypePending === "userid") {
  //       return item.userid.includes(searchPending);
  //     } else if (searchTypePending === "branchcode") {
  //       return item.branchcode.includes(searchPending);
  //     }
  //     return false;
  //   })
  // );

  const filteredPendingForm = sortDescending(
    pendingForm.filter((item) => {
      const itemDate = new Date(item.submittime).toISOString().substring(0, 10);
      const start = startDatePending;
      const end = endDatePending;

      // Check if both dates are selected
      if (startDatePending && endDatePending) {
        console.log(startDatePending, itemDate, endDatePending);
        const dateCondition = itemDate >= start && itemDate <= end;

        // Check for userid or branchcode search
        const userIdCondition =
          searchTypePending === "userid"
            ? item.userid.includes(searchPending)
            : false;
        const branchCodeCondition =
          searchTypePending === "branchcode"
            ? item.branchcode.includes(searchPending)
            : false;

        // Return true if date condition is met and either userid or branchcode condition is met
        return dateCondition && (userIdCondition || branchCodeCondition);
      }

      // If dates are not selected, check only for userid or branchcode
      if (searchTypePending === "userid") {
        return item.userid.includes(searchPending);
      } else if (searchTypePending === "branchcode") {
        return item.branchcode.includes(searchPending);
      }

      return false; // Return false if no conditions are met
    })
  );

  const filteredRejectedForm = sortDescending(
    rejectedForm.filter((item) => {
      const itemDate = new Date(item.submittime).toISOString().substring(0, 10);
      const start = startDateRejected;
      const end = endDateRejected;

      // Check if both dates are selected
      if (start && end) {
        const dateCondition = itemDate >= start && itemDate <= end;

        // Check for userid or branchcode search
        const userIdCondition =
          searchTypeRejected === "userid"
            ? item.userid.includes(searchRejected)
            : false;
        const branchCodeCondition =
          searchTypeRejected === "branchcode"
            ? item.branchcode.includes(searchRejected)
            : false;

        // Return true if date condition is met and either userid or branchcode condition is met
        return dateCondition && (userIdCondition || branchCodeCondition);
      }

      // If dates are not selected, check only for userid or branchcode
      if (searchTypeRejected === "userid") {
        return item.userid.includes(searchRejected);
      } else if (searchTypeRejected === "branchcode") {
        return item.branchcode.includes(searchRejected);
      }

      return false; // Return false if no conditions are met
    })
  );

  const filteredAcceptedForm = sortDescending(
    acceptedForm.filter((item) => {
      const itemDate = new Date(item.submittime).toISOString().substring(0, 10);
      const start = startDateAccepted;
      const end = endDateAccepted;

      // Check if both dates are selected
      if (startDateAccepted && endDateAccepted) {
        console.log(startDateAccepted, itemDate, endDateAccepted);
        const dateCondition = itemDate >= start && itemDate <= end;

        // Check for userid or branchcode search
        const userIdCondition =
          searchTypeAccepted === "userid"
            ? item.userid.includes(searchAccepted)
            : false;
        const branchCodeCondition =
          searchTypeAccepted === "branchcode"
            ? item.branchcode.includes(searchAccepted)
            : false;

        // Return true if date condition is met and either userid or branchcode condition is met
        return dateCondition && (userIdCondition || branchCodeCondition);
      }

      // If dates are not selected, check only for userid or branchcode
      if (searchTypeAccepted === "userid") {
        return item.userid.includes(searchAccepted);
      } else if (searchTypeAccepted === "branchcode") {
        return item.branchcode.includes(searchAccepted);
      }

      return false; // Return false if no conditions are met
    })
  );

  const handleSelectRowChange = (event) => {
    const { value, checked } = event.target;
    const item = filteredPendingForm.find(
      (item) => item.id.toString() === value
    );

    if (checked) {
      setSelectRow((prev) => {
        const newSelection = [...prev, { id: item.id, formId: item.formid }];
        console.log(newSelection); // Log the new selection
        return newSelection;
      });
    } else {
      setSelectRow((prev) => {
        const newSelection = prev.filter((row) => row.id !== item.id);
        console.log(newSelection); // Log the new selection
        return newSelection;
      });
    }
  };

  const handleSelectAllChange = (event) => {
    if (event.target.checked) {
      const allSelected = filteredPendingForm.map((item) => ({
        id: item.id,
        formId: item.formid,
      }));
      setSelectRow(allSelected);
    } else {
      setSelectRow([]);
    }
  };

  const handleSelectedRowSubmit = async () => {
    try {
      const decryptedUserId = decryptId(userId);
      const decryptedFormId = decryptId(formId);
      const decryptedId = decryptId(id);
      const response = await fetch(
        `${bmsApiEightyOne}/api/bms/approval/${userid}/3001/1`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formUpdates: selectRow,
            status: "Accepted",
            comment: "ok",
          }),
        }
      );
      console.log({
        formUpdates: selectRow,
        status: "Accepted",
        comment: "",
      });
      const result = await response.json();
      console.log(response);
      // console.log("Submission result:", result);
      if (response.ok) {
        toast.success("Selected Form Approved!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setTimeout(() => {
          location.reload();
          navigate("/bms-admin-dashboard");
        }, 2000);
      } else {
        toast.error("Selected Form isn't Approved!");
        console.error("Error submitting form:", await response.json());
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
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
      doc.setLineWidth(1); // Set the line width to 1px
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
        "SN",
        "PF Id",
        "Employee Name",
        "Form Name",
        "Submission Date & Time",
        "Branch Code",
      ];

      let data;
      if (type === "pending") {
        data = filteredPendingForm.map((item, index) => [
          (currentPagePending - 1) * itemsPerPage + index + 1,
          item.userid,
          item.username,
          item.formname,
          new Date(item.submittime).toLocaleString(),
          item.branchcode,
        ]);
      } else if (type === "rejected") {
        data = filteredRejectedForm.map((item, index) => [
          (currentPageRejected - 1) * itemsPerPage + index + 1,
          item.userid,
          item.username,
          item.formname,
          new Date(item.submittime).toLocaleString(),
          item.branchcode,
        ]);
      } else if (type === "accepted") {
        data = filteredAcceptedForm.map((item, index) => [
          (currentPageAccepted - 1) * itemsPerPage + index + 1,
          item.userid,
          item.username,
          item.formname,
          new Date(item.submittime).toLocaleString(),
          item.branchcode,
        ]);
      }

      doc.autoTable({
        head: [headers],
        body: data,
        startY: yPosition + 10,
      });

      // Set dynamic filename based on type
      doc.save(`All-${type}.pdf`);
    };

    imgElement.onerror = () => {
      console.error("Error loading image");
    };
  };

  //CSV-Function
  const generateCSV = (type) => {
    let data;
    if (type === "accepted") {
      data = filteredAcceptedForm.map((item, index) => [
        (currentPageAccepted - 1) * itemsPerPage + index + 1,
        item.userid,
        item.username,
        item.formname,
        new Date(item.submittime).toLocaleString(),
        item.branchcode,
      ]);
    } else if (type === "pending") {
      data = filteredPendingForm.map((item, index) => [
        (currentPagePending - 1) * itemsPerPage + index + 1,
        item.userid,
        item.username,
        item.formname,
        new Date(item.submittime).toLocaleString(),
        item.branchcode,
      ]);
    } else if (type === "rejected") {
      data = filteredRejectedForm.map((item, index) => [
        (currentPageRejected - 1) * itemsPerPage + index + 1,
        item.userid,
        item.username,
        item.formname,
        new Date(item.submittime).toLocaleString(),
        item.branchcode,
      ]);
    }

    const headers = [
      "SN",
      "PF Id",
      "Employee Name",
      "Form Name",
      "Submission Date & Time",
      "Branch Code",
    ];

    return { data, headers };
  };

  // const csvData = generateCSV("accepted");
  // const csvDataPending = generateCSV("pending");

  return (
    <div className="flex flex-col w-10/12 items-center">
      <ToastContainer />
      <h1 className="font-semibold text-2xl mt-5 bg-blue-200 p-2 rounded-sm text-[#2a2828]">
        Admin Dashboard (BMS)
      </h1>
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
      <div className="">
        {/* Pending Table */}
        {isOpenPending && (
          <div className="relative overflow-hidden sm:rounded-lg bg-white p-5 shadow-[0_5px_10px_0px_gray]">
            <div className="flex justify-between">
              <div className="w-full flex justify-between">
                <div>
                  <label htmlFor="pending" className=" text-gray-700 mr-2">
                    <strong>Choose:</strong>
                  </label>
                  <select
                    name="pending"
                    id="pending"
                    value={searchTypePending}
                    onChange={(e) => setSearchTypePending(e.target.value)}
                    className="text-[#3b3838] border-[1px]  border-black p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-32 text-sm placeholder-opacity-100"
                  >
                    <option value="userid">PF Id</option>
                    <option value="branchcode">Branch Code</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="search_id"
                    className="ml-2 font-bold  text-gray-700 mr-2"
                  >
                    Search:
                  </label>
                  <input
                    type="text"
                    id="search_id"
                    placeholder="PF or Branch Code"
                    value={searchPending}
                    onChange={(e) => setSearchPending(e.target.value)}
                    className="text-[#3b3838] border-[1px]  border-black p-1 m-1 rounded-md font-semibold placeholder-gray-500 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-32 text-sm placeholder-opacity-100"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label
                    htmlFor="startDate"
                    className="font-bold text-gray-700 ml-2 mr-2"
                  >
                    From:
                  </label>
                  <input
                    type="date"
                    value={startDatePending}
                    onChange={(e) => setStartDatePending(e.target.value)}
                    className="text-[#3b3838] border-[1px]  border-black p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-32 text-sm placeholder-opacity-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="font-bold text-gray-700 ml-2 mr-2"
                  >
                    To:
                  </label>
                  <input
                    type="date"
                    value={endDatePending}
                    onChange={(e) => setEndDatePending(e.target.value)}
                    className="text-[#3b3838] border-[1px]  border-black p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-32 text-sm placeholder-opacity-100"
                  />
                </div>
              </div>
            </div>
            {divhead === "1" && (
              <div className="w-full flex justify-end pr-1">
                <button
                  onClick={handleSelectedRowSubmit}
                  className="p-1 mt-3 font-[500] text-sm border border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded "
                >
                  Approved Selected
                </button>
              </div>
            )}

            <div className="h-64 overflow-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-5">
                <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 rounded-s-lg">SN</th>
                    <th className="px-4 py-2">PF Id</th>
                    <th className="px-4 py-2">Employee Name</th>
                    <th className="px-4 py-2">Form Name</th>
                    <th className="px-4 py-2">Submission Date & Time</th>
                    <th className="px-4 py-2">Branch Code</th>
                    <th className="px-4 py-2">Action</th>

                    {userid === cito && (
                      <th className="flex gap-2 justify-center items-center py-2 px-4 rounded-e-lg">
                        <label htmlFor=""> Select All</label>
                        <input
                          type="checkbox"
                          onChange={handleSelectAllChange}
                          checked={
                            selectRow.length === filteredPendingForm.length &&
                            filteredPendingForm.length > 0
                          }
                        />
                      </th>
                    )}
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
                      <td className="px-4 py-1">
                        {(currentPagePending - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-4 py-1">
                        <strong>{item.userid}</strong>
                      </td>
                      <td className="px-4 py-1 text-center">
                        <strong>{item.username}</strong>
                      </td>
                      <td className="px-4 py-1">{item.formname}</td>
                      <td className="px-4 py-1 text-center">
                        {new Date(item.submittime).toLocaleString()}
                      </td>
                      <td className="px-4 py-1 text-center">
                        {item.branchcode}
                      </td>
                      <td className="px-4 py-1">
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
                        {item.formid === "2001" ? (
                          <button
                            disabled={item.unitheadstatus === "Accepted"}
                            className={`${
                              item.unitheadstatus === "Accepted"
                                ? "bg-slate-300 border-slate-500 text-slate-500"
                                : "hover:bg-cyan-500 hover:text-white border-cyan-500 text-cyan-500"
                            } py-1 px-2 font-medium border   rounded`}
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
                        ) : (
                          ""
                        )}
                      </td>

                      {userid === cito && (
                        <td className="px-4 py-2 text-center">
                          <input
                            type="checkbox"
                            id={`selectRow-${item.id}`} // Unique ID for each checkbox
                            value={item.id}
                            checked={selectRow.some(
                              (row) => row.id === item.id
                            )} // Check if the id is included
                            onChange={handleSelectRowChange}
                          />
                        </td>
                      )}
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

            <div className="flex justify-center gap-2">
              <button
                onClick={() => generatePDF("pending")}
                className="mt-4 py-2 px-4 bg-green-700 text-white rounded hover:font-bold hover:border-green-700 hover:bg-green-100 hover:border-2 hover:text-black"
              >
                Download PDF
              </button>

              <CSVLink
                data={generateCSV("pending").data}
                headers={generateCSV("pending").headers}
                filename={"pending-data.csv"}
              >
                <button className="mt-4 py-2 px-4 bg-yellow-700 text-white rounded hover:font-bold hover:border-yellow-700 hover:bg-yellow-100 hover:border-2 hover:text-black">
                  Download CSV (Pending)
                </button>
              </CSVLink>
            </div>
          </div>
        )}

        {/* Rejected Table */}
        {isOpenRejected && (
          <div className="relative overflow-hidden shadow-[0_5px_10px_0px_gray] sm:rounded-lg bg-white p-5">
            <div className="flex justify-between">
              <div className="w-full flex justify-between">
                <div>
                  <label htmlFor="rejected" className=" text-gray-700 mr-2">
                    <strong>Choose:</strong>
                  </label>
                  <select
                    name="rejected"
                    id="rejected"
                    value={searchTypeRejected}
                    onChange={(e) => setSearchTypeRejected(e.target.value)}
                    className="text-[#3b3838] border-[1px]  border-black p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-32 text-sm placeholder-opacity-100"
                  >
                    <option value="userid">PF Id</option>
                    <option value="branchcode">Branch Code</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="search_id"
                    className="ml-2 font-bold  text-gray-700 mr-2"
                  >
                    Search:
                  </label>
                  <input
                    type="text"
                    id="search_id"
                    placeholder="PF or Branch Code"
                    value={searchRejected}
                    onChange={(e) => setSearchRejected(e.target.value)}
                    className="text-[#3b3838] border-[1px]  border-black p-1 m-1 rounded-md font-semibold placeholder-gray-500 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-32 text-sm placeholder-opacity-100"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label
                    htmlFor="startDateRejected"
                    className="font-bold text-gray-700 ml-2 mr-2"
                  >
                    From:
                  </label>
                  <input
                    type="date"
                    value={startDateRejected}
                    onChange={(e) => setStartDateRejected(e.target.value)}
                    className="text-[#3b3838] border-[1px]  border-black p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-32 text-sm placeholder-opacity-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="endDateRejected"
                    className="font-bold text-gray-700 ml-2 mr-2"
                  >
                    To:
                  </label>
                  <input
                    id="endDateRejected"
                    type="date"
                    value={endDateRejected}
                    onChange={(e) => setEndDateRejected(e.target.value)}
                    className="text-[#3b3838] border-[1px]  border-black p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-32 text-sm placeholder-opacity-100"
                  />
                </div>
              </div>
            </div>
            <div className="h-64 pt-0 relative overflow-y-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-200">
                  <tr>
                    <th className="px-6 py-2 rounded-s-lg">SN</th>
                    <th className="px-6 py-2">PF Id</th>
                    <th className="px-6 py-2 text-center">Employee Name</th>
                    <th className="px-6 py-2">Form Name</th>
                    <th className="px-6 py-2 text-center">
                      Submission Date & Time
                    </th>
                    <th className="px-6 py-2 text-center">Branch Code</th>
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
                      <td className="px-6 py-1 text-center">
                        {(currentPageRejected - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-6 py-1">
                        <strong>{item.userid}</strong>
                      </td>
                      <td className="px-6 py-1 text-center">
                        <strong>{item.username}</strong>
                      </td>
                      <td className="px-6 py-1 text-center">{item.formname}</td>
                      <td className="px-6 py-1 text-center">
                        {new Date(item.submittime).toLocaleString()}
                      </td>
                      <td className="px-6 py-1 text-center">
                        {item.branchcode}
                      </td>
                      <td className="px-6 py-1 flex justify-center gap-1">
                        <button
                          className="py-1 px-2 font-medium border border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded"
                          onClick={() => {
                            const encryptedUserId = encryptId(item.userid);
                            const encryptedFormId = encryptId(item.formid);
                            const encryptedId = encryptId(item.id);
                            navigate(
                              `/bms/view/${encryptedUserId}/${encryptedFormId}/${encryptedId}`
                            );
                          }}
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

            <div className="flex justify-center gap-2">
              <button
                onClick={() => generatePDF("rejected")}
                className="mt-4 py-2 px-4 bg-green-700 text-white rounded hover:font-bold hover:border-green-700 hover:bg-green-100 hover:border-2 hover:text-black"
              >
                Download PDF
              </button>

              <CSVLink
                data={generateCSV("rejected").data}
                headers={generateCSV("rejected").headers}
                filename={"rejected-data.csv"}
              >
                <button className="mt-4 py-2 px-4 bg-red-700 text-white rounded hover:font-bold hover:border-red-700 hover:bg-red-100 hover:border-2 hover:text-black">
                  Download CSV (Rejected)
                </button>
              </CSVLink>
            </div>
          </div>
        )}

        {/* Accepted Table */}
        {isOpenAccepted && (
          <div className="relative overflow-hidden shadow-[0_5px_10px_0px_gray] sm:rounded-lg bg-white p-5">
            <div className="flex justify-between">
              <div className="w-full flex justify-between text-[12px]">
                <div>
                  <label htmlFor="accepted" className=" text-gray-700 mr-2">
                    <strong>Choose:</strong>
                  </label>
                  <select
                    name="accepted"
                    id="accepted"
                    value={searchTypeAccepted}
                    onChange={(e) => setSearchTypeAccepted(e.target.value)}
                    className="text-[#3b3838] border-[1px]  border-black p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-32 text-sm placeholder-opacity-100"
                  >
                    <option value="userid">PF Id</option>
                    <option value="branchcode">Branch Code</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="search_id"
                    className="ml-2 font-bold  text-gray-700 mr-2"
                  >
                    Search:
                  </label>
                  <input
                    type="text"
                    id="search_id"
                    placeholder="PF or Branch Code"
                    value={searchAccepted}
                    onChange={(e) => setSearchAccepted(e.target.value)}
                    className="text-[#3b3838] border-[1px]  border-black p-1 m-1 rounded-md font-bold placeholder-gray-500 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-28 placeholder-opacity-100"
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label
                    htmlFor="startDateAccepted"
                    className="font-bold text-gray-700 ml-2 mr-2"
                  >
                    From:
                  </label>
                  <input
                    type="date"
                    value={startDateAccepted}
                    onChange={(e) => setStartDateAccepted(e.target.value)}
                    className="text-[#3b3838] border-[1px]  border-black p-1 m-1 rounded-md font-bold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-28 placeholder-opacity-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="endDateAccepted"
                    className="font-bold text-gray-700 ml-2 mr-2"
                  >
                    To:
                  </label>
                  <input
                    id="endDateAccepted"
                    type="date"
                    value={endDateAccepted}
                    onChange={(e) => setEndDateAccepted(e.target.value)}
                    className="text-[#3b3838] border-[1px]  border-black p-1 m-1 rounded-md font-bold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-28 placeholder-opacity-100"
                  />
                </div>
              </div>
            </div>
            <div className="h-64 pt-0 relative overflow-y-auto   ">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-200">
                  <tr>
                    <th className="px-6 py-2 rounded-s-lg">SN</th>
                    <th className="px-6 py-2 text-center">PF Id</th>
                    <th className="px-6 py-2 text-center">Employee Name</th>
                    <th className="px-6 py-2">Form Name</th>
                    <th className="px-6 py-2">Submission Date & Time</th>
                    <th className="px-6 py-2 text-center">Branch Code</th>
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
                      <td className="px-6 py-1 text-center">
                        {(currentPageAccepted - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-6 py-1 text-center">
                        <strong>{item.userid}</strong>
                      </td>
                      <td className="px-6 py-1 text-center">
                        <strong>{item.username}</strong>
                      </td>
                      <td className="px-6 py-1 text-center">{item.formname}</td>
                      <td className="px-6 py-1 text-center">
                        {new Date(item.submittime).toLocaleString()}
                      </td>
                      <td className="px-6 py-1 text-center">
                        {item.branchcode}
                      </td>
                      <td className="px-6 py-1 flex gap-1 justify-center">
                        <button
                          className="py-1 px-2 font-medium border border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded"
                          onClick={() => {
                            const encryptedUserId = encryptId(item.userid);
                            const encryptedFormId = encryptId(item.formid);
                            const encryptedId = encryptId(item.id);
                            navigate(
                              `/bms/view/${encryptedUserId}/${encryptedFormId}/${encryptedId}`
                            );
                          }}
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
            <div className="flex justify-center gap-2">
              <button
                onClick={() => generatePDF("accepted")}
                className="mt-4 py-2 px-4 bg-green-700 text-white rounded hover:font-bold hover:border-green-700 hover:bg-green-100 hover:border-2 hover:text-black"
              >
                Download PDF
              </button>

              <CSVLink
                data={generateCSV("accepted").data}
                headers={generateCSV("accepted").headers}
                filename={"accepted-data.csv"}
              >
                <button className="mt-4 py-2 px-4 bg-green-700 text-white rounded hover:font-bold hover:border-green-700 hover:bg-green-100 hover:border-2 hover:text-black">
                  Download CSV (Accepted)
                </button>
              </CSVLink>
            </div>
          </div>
        )}
      </div>
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

export default BmsAdminDashboard;
