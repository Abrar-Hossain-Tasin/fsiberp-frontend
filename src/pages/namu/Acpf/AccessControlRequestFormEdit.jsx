import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Base_api, unitHeadSearch } from "../../../utils/api/Base_api";

import AllFormsHeader from "../../../component/AllFormsHeader";

import { faPaperclip, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import Dynamictable from "../../../component/Dynamictable";
import { decryptId } from "../../AdminDashboard/encryption/Encrypted";
import DoorAccessViewEdit from "./DoorAccessViewEdit";

const AccessControlRequestFormEdit = ({ type }) => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  const { userId, formId, id } = useParams();
  const [eligibleUsers, setEligibleUsers] = useState([]);
  const [formData, setFormData] = useState({});
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doorAccess, setDoorAccess] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [unitheaduserid, setUnitheaduserid] = useState("");
  const [unitheadusername, setUnitheadusername] = useState("");
  const [card_number, setCard_number] = useState("");
  const [joiningLetter, setJoiningLetter] = useState(null);
  const [employeeIdCard, setEmployeeIdCard] = useState(null);
  const [existingaccessinfo, setExistingaccessinfo] = useState("");
  const [checkedOptions, setCheckedOptions] = useState([]);
  const [otherValue, setOtherValue] = useState("");
  const [selectVault, setSelectVault] = useState(null);
  const [joiningLetterFiles, setJoiningLetterFiles] = useState(null);
  const [employeeIdCardFiles, setEmployeeIdCardFiles] = useState(null);
  const navigate = useNavigate();
  const options = [
    { name: "MainDoor", label: "Main Door" },
    { name: "Cash", label: "Cash" },
    // { name: "Vault", label: "Vault" },
    { name: "Other", label: "Other" },
  ];

  // Fetch existing form data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const decryptedUserId = decryptId(userId);
        const decryptedFormId = decryptId(formId);
        const decryptedId = decryptId(id);
        // (decryptedUserId, decryptedFormId, decryptedId);

        const response = await fetch(
          `${Base_api}/api/user/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );
        const data = await response.json();
        setFormData(data);
        // (formData); // Check the fetched data

        // Populate form fields with existing data
        setUnitheaduserid(data.unitheaduserid);
        setUnitheadusername(data.unitheadusername);
        setSearchTerm(`${data.unitheadusername} - ${data.unitheaduserid}`);
        setCard_number(data.cardnumber);
        setExistingaccessinfo(data.existingaccessinfo);
        setJoiningLetter(data.joiningLetterDownloadUrl);
        setEmployeeIdCard(data.employeeIdCardDownloadUrl);

        const joiningLetterPath = data.joiningLetterPath;
        // (data.joiningLetterPath);

        const a = joiningLetterPath ? joiningLetterPath.split("~") : "";
        // (a);
        const b = a ? a[a.length - 1] : "";
        setJoiningLetterFiles(b);

        const employeeIdCardPath = data.employeeIdCardPath;
        // ({ employeeIdCardPath });
        // (data.employeeIdCardPath);

        const c = employeeIdCardPath ? employeeIdCardPath.split("~") : "";
        // (c);
        const d = c ? c[c.length - 1] : "";
        setEmployeeIdCardFiles(d);

        if (data.dooraccess[data.dooraccess.length - 2] === "Other") {
          setOtherValue(data.dooraccess[data.dooraccess.length - 1]);
        }
        // Ensure dooraccess is an array
        if (data.dooraccess) {
          setCheckedOptions(data.dooraccess);
        }
        setDoorAccess(data.dooraccess);
        // (type);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid, formId, id]);

  // Unit Head Search Option start
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${unitHeadSearch}/${userid}`);
        const data = await response.json();
        setEligibleUsers(data);
        setFilteredOptions(data);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    const filtered = eligibleUsers.filter((item) =>
      item.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
    setShowOptions(value.trim() !== "");
  };

  const handleOptionClick = (username, userid) => {
    setSearchTerm(`${username} - ${userid}`);
    setShowOptions(false);
    setUnitheaduserid(userid);
    setUnitheadusername(username);
  };
  // Unit Head Search Option End

  const handleCheckboxChange = (event) => {
    const { checked, name } = event.target;

    // if (name === "Other") {
    //   setCheckedOptions(checked ? ["Other"] : []);
    // } else {
    setCheckedOptions(
      checked
        ? [...checkedOptions, name]
        : checkedOptions.filter((option) => option !== name)
    );
    // }
    if (name === "Vault") {
      setSelectVault((prev) => !prev);
    }
  };

  const handleOtherInputChange = (event) => {
    setOtherValue(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files[0];
    if (event.target.name === "joiningLetter") {
      // (selectedFiles);
      setJoiningLetter(selectedFiles);
      // (selectedFiles.name);
      setJoiningLetterFiles(selectedFiles.name);
    } else if (event.target.name === "employeeIdCard") {
      setEmployeeIdCard(selectedFiles);
      setEmployeeIdCardFiles(selectedFiles.name);
    }
  };

  const removeFile = async (type) => {
    try {
      if (type === "joiningLetter") {
        setJoiningLetter("");
        setJoiningLetterFiles("");
        const response = await fetch(
          `${Base_api}/api/accesscontrol/removefile/${decryptId(id)}/${type}`,
          {
            method: "DELETE", // Use PUT for updates
          }
        );
      } else if (type === "employeeIdCard") {
        setEmployeeIdCard("");
        setEmployeeIdCardFiles("");
        const response = await fetch(
          `${Base_api}/api/accesscontrol/removefile/${decryptId(id)}/${type}`,
          {
            method: "DELETE", // Use PUT for updates
          }
        );
      }
    } catch (error) {
      // (error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("cardnumber", card_number);
    formData.append("joiningLetter", joiningLetter);
    formData.append("employeeIdCard", employeeIdCard);
    formData.append("existingaccessinfo", existingaccessinfo);
    formData.append("unitheaduserid", unitheaduserid);
    formData.append("unitheadusername", unitheadusername);
    formData.append("dooraccess", doorAccess);

    // Append checked options
    // checkedOptions.forEach((option) => {
    //   if (option !== "Other") {
    //     formData.append("dooraccess", option);
    //   }
    // });

    // // Append only the input value if "other" is selected
    // if (checkedOptions.includes("Other") && otherValue.trim() !== "") {
    //   formData.append("dooraccess", "Other"); // Include otherValue in the dooraccess array
    //   formData.append("dooraccess", otherValue); // Include otherValue in the dooraccess array
    // }

    for (const value of formData.values()) {
      // (value);
    }

    try {
      const decryptedId = decryptId(id);
      const response = await fetch(
        `${Base_api}/api/accesscontrol/update/${decryptedId}`,
        {
          method: "PUT", // Use PUT for updates
          body: formData,
        }
      );
      // (response);
      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response as JSON

        // Display the error message from the backend
        if (errorData.error) {
          toast.error(errorData.error, {
            autoClose: 2000,
          });
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else {
        toast.success("Form Updated successfully!", { autoClose: 2000 });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }

      // if (response.ok) {
      //   toast.success("Form Updated successfully!", {
      //     position: "top-right",
      //     autoClose: 2000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "colored",
      //   });
      //   setTimeout(() => {
      //     navigate("/dashboard");
      //   }, 2000);

      //   // Clear form fields on success
      //   // setCheckedOptions([]);
      //   // setCard_number("");
      //   // setJoiningLetter(null);
      //   // setEmployeeIdCard(null);
      //   // setExistingaccessinfo("");
      //   // (response);
      // } else {
      //   ("Failed to Submit");
      // }
    } catch (error) {
      // console.error("Error:", error);
    }
  };

  // dynamictable4_function
  useEffect(() => {
    const decryptedUserId = decryptId(userId);
    fetch(`${Base_api}/api/accesscontrol/view/${decryptedUserId}`)
      .then((response) => response.json())
      .then((data) => {
        // Log the response to inspect it
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data) return <p>No data available</p>;

  // dynamictable4_function

  return (
    <div className="px-5 mx-5">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 p-5 m-5 overflow-auto rounded-xl bg-white shadow-[0_5px_10px_0px_gray]">
          <AllFormsHeader
            divname="ICT Division"
            formname="Access Control Permission Form"
            dno="1002"
            vno="3.0"
            edate="08.10.2023"
            fpageno="1"
            lpageno="1"
            rdiv="ICTD"
            rformname="ACPF"
            headformname="Access Control Permission Form"
            submitdate={formData.submitdate}
            referenceValue={formData.referenceValue}
          />

          <div className="my-2">
            <Dynamictable userid={decryptId(userId)} />
          </div>
          <h4 className="text-center font-bold bg-gray-300 py-1 rounded-md mb-1 text-sm">
            To be completed by respective Requestor
          </h4>

          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <label htmlFor="card_number" className=" mr-1">
                <strong>Card Number:</strong>
              </label>
              <input
                className="text-[#3b3838] border-[1px]  border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out text-sm placeholder-opacity-100"
                type="text"
                id="card_number"
                name="card_number"
                value={card_number}
                placeholder="Card Number"
                onChange={(e) => setCard_number(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <div className="font-bold text-sm mb-2">
              <label htmlFor="eai" className="">
                Existing Access Information (if any) :
              </label>
            </div>
            <textarea
              id="eai"
              name="eai"
              rows="1"
              cols="40"
              value={existingaccessinfo}
              className="text-[#3b3838] border-[1px]  border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
              placeholder="Please provide, Existing Access Information"
              onChange={(e) => setExistingaccessinfo(e.target.value)}
            ></textarea>
          </div>
          <div className="">
            <table className="w-full text-sm text-center">
              <thead>
                <tr>
                  <th className="border  py-2 border-black" colSpan="2">
                    Attachment (if any)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border  border-black p-3">
                    <strong>Employee ID Card (Photocopy/Scan Copy)</strong>
                  </td>
                  <td className="border  border-black p-3">
                    <strong>Joining Report/Letter</strong>
                  </td>
                </tr>

                <tr>
                  <td className=" border  border-black p-3">
                    {/* <div className="flex flex-col gap-2">
                    <div>
                      <input
                        className="cursor-pointer border p-2 rounded border-black"
                        type="file"
                        id="employeeIdCard"
                        name="employeeIdCard"
                        onChange={handleFileChange}
                      />
                    </div>
                    <label
                      htmlFor=""
                      className="text-slate-500 text-xs font-[500]"
                    >
                      (File size must be under 250KB)
                    </label>
                    <div className="flex justify-center">
                      {formData.employeeIdCardDownloadUrl ? (
                        <Link
                          to={formData.employeeIdCardDownloadUrl}
                          className="p-[4px] w-72 text-sm flex-shrink-0 font-medium text-center text-[15px] rounded-md shadow-md bg-green-300 hover:bg-green-400 active:bg-green-500"
                          target="_blank" // Optional: opens in a new tab
                          rel="noopener noreferrer" // Security best practice
                        >
                          View Employee Id Card
                        </Link>
                      ) : (
                        "No document has been uploaded."
                      )}
                    </div>
                  </div> */}
                    <div className="flex flex-col items-center gap-1 border border-slate-400 p-1">
                      <input
                        type="file"
                        id="employeeIdCard"
                        style={{ display: "none" }}
                        name="employeeIdCard"
                        onChange={handleFileChange}
                      />
                      <div className="w-42 p-1 flex items-center cursor-pointer text-xs rounded border font-[500] bg-slate-300 border-slate-300">
                        <label htmlFor="employeeIdCard" className="px-1">
                          Attachment
                        </label>
                        <label
                          htmlFor="employeeIdCard"
                          className="flex items-center cursor-pointer"
                        >
                          <FontAwesomeIcon
                            icon={faPaperclip}
                            className="w-3 h-3 cursor-pointer text-gray-600 -rotate-45"
                          />
                        </label>
                      </div>
                      {!employeeIdCard ? (
                        <label
                          htmlFor=""
                          className="text-slate-500 text-xs font-[500]"
                        >
                          (File size must be under 250KB)
                        </label>
                      ) : (
                        ""
                      )}
                      {employeeIdCard && (
                        <ul className="flex flex-wrap gap-2 font-[500] text-sm">
                          <div className="flex items-center bg-[#cee6f7] p-1 rounded border border-slate-400">
                            <label className="text-xs">
                              {employeeIdCardFiles}
                            </label>

                            <FontAwesomeIcon
                              onClick={() => removeFile("employeeIdCard")}
                              icon={faXmark}
                              className="m-1 p-[1px] w-3 h-3 rounded cursor-pointer bg-red-400 "
                            />
                          </div>
                        </ul>
                      )}
                    </div>
                  </td>
                  <td className="w-1/2 border  border-black p-3">
                    {/* <div className="flex flex-col gap-2">
                    <div>
                      <input
                        className="cursor-pointer border p-2 rounded border-black"
                        type="file"
                        id="joiningLetter"
                        name="joiningLetter"
                        onChange={handleFileChange}
                      />
                    </div>
                    <label
                      htmlFor=""
                      className="text-slate-500 text-xs font-[500]"
                    >
                      (File size must be under 250KB)
                    </label>
                    <div className="flex justify-center">
                      {formData.joiningLetterDownloadUrl ? (
                        <Link
                          to={formData.joiningLetterDownloadUrl}
                          className="p-[4px] w-72 text-sm flex-shrink-0 font-medium text-center text-[15px] rounded-md shadow-md bg-green-300 hover:bg-green-400 active:bg-green-500"
                          target="_blank" // Optional: opens in a new tab
                          rel="noopener noreferrer" // Security best practice
                        >
                          View Joining Letter
                        </Link>
                      ) : (
                        "No document has been uploaded."
                      )}
                    </div>
                  </div> */}
                    <div className="flex flex-col items-center gap-1 border border-slate-400 p-1">
                      <input
                        type="file"
                        id="joiningLetter"
                        style={{ display: "none" }}
                        name="joiningLetter"
                        onChange={handleFileChange}
                      />
                      <div className="w-42 p-1 flex items-center cursor-pointer text-xs rounded border font-[500] bg-slate-300 border-slate-300">
                        <label htmlFor="joiningLetter" className="px-1">
                          Attachment
                        </label>
                        <label
                          htmlFor="joiningLetter"
                          className="flex items-center cursor-pointer"
                        >
                          <FontAwesomeIcon
                            icon={faPaperclip}
                            className="w-3 h-3 cursor-pointer text-gray-600 -rotate-45"
                          />
                        </label>
                      </div>
                      {!joiningLetter ? (
                        <label
                          htmlFor=""
                          className="text-slate-500 text-xs font-[500]"
                        >
                          (File size must be under 250KB)
                        </label>
                      ) : (
                        ""
                      )}
                      {joiningLetter && (
                        <ul className="flex flex-wrap gap-2 font-[500] text-sm">
                          <div className="flex items-center bg-[#cee6f7] p-1 rounded border border-slate-400">
                            <label className="text-xs">
                              {joiningLetterFiles}
                            </label>

                            <FontAwesomeIcon
                              onClick={() => removeFile("joiningLetter")}
                              icon={faXmark}
                              className="m-1 p-[1px] w-3 h-3 rounded cursor-pointer bg-red-400 "
                            />
                          </div>
                        </ul>
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-sm">
                  <th className="w-1/2 border px-4 py-2 border-black">
                    Door/Gate on which access requested:
                  </th>
                  <th
                    colSpan={2}
                    className="w-1/2 border px-4 py-2 border-black"
                  >
                    Approved by (Manager/Department Head/Unit Head)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="">
                  {/* <td rowSpan={2} className="border pl-24 border-black px-5 py-2">
                  <div className=" font-[500]">
                    {options.map((option) => (
                      <div key={option.name}>
                        <input
                          type="checkbox"
                          id={option.name}
                          name={option.name}
                          checked={checkedOptions.includes(option.name)}
                          onChange={handleCheckboxChange}
                          // disabled={
                          //   checkedOptions.includes("Other") &&
                          //   option.name !== "Other"
                          // }
                        />
                        <label htmlFor={option.name} className="mx-2">
                          {option.label}
                        </label>
                        {option.name === "Other" && (
                          <input
                            className="text-[#3b3838] border-[1px]  border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out text-sm placeholder-opacity-100"
                            id="Other"
                            type="text"
                            value={otherValue}
                            onChange={handleOtherInputChange}
                            disabled={!checkedOptions.includes("Other")}
                            placeholder="Enter other access..."
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </td> */}
                  <DoorAccessViewEdit
                    type={type}
                    doorAccess={doorAccess}
                    setDoorAccess={setDoorAccess}
                  />
                  <td colSpan={2} className="border px-4 py-2 border-black">
                    <div className="relative">
                      <input
                        autoComplete="off"
                        type="text"
                        id="search-input"
                        name="search"
                        className="text-[#3b3838] text-center border-[1px]  border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                        placeholder="Search Here!"
                        value={searchTerm}
                        onChange={handleInputChange}
                        required
                      />
                      {showOptions && (
                        <ul className="absolute w-full font-[500] bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                          {filteredOptions.map((item) => (
                            <li
                              key={item.id}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() =>
                                handleOptionClick(item.username, item.userid)
                              }
                            >
                              {item.username} - {item.userid}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </td>
                </tr>

                <tr className="">
                  <td className="border px-4 py-2 border-black text-center w-1/4">
                    Status : <strong> {formData.unitheadstatus}</strong>
                  </td>
                  <td className="border px-4 py-2 border-black text-center w-1/4">
                    Comment : <strong> {formData.unitheadcmnt}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="text-center font-bold bg-gray-300 py-1 rounded-md mt-1  text-sm">
            To be completed by Admin
          </h4>
          <div className="mb-5 text-sm font-[600] text-[#1b3c1c] bg-slate-200/95 rounded  mt-1">
            <table className="min-w-full border text-center">
              <thead className="text-sm">
                <tr>
                  {formData.dooraccess?.includes("Vault") ? (
                    <>
                      {/* If "Vault" is present in dooraccess */}
                      {formData.dooraccess.length > 1 ? (
                        // If there are additional values besides "Vault", show all columns
                        <>
                          <th className="py-2 px-2 border border-black w-1/6">
                            Recommended by (CISO/ Head of ISRM Unit)
                          </th>
                          <th className="py-2 px-2 border border-black w-1/6">
                            Approved by (HOICTD/CTO/ CIO/CITO)
                          </th>
                          <th className="py-2 px-4 border border-black">
                            Recommended by Head of Network Administration &
                            Management Unit
                          </th>
                          <th className="py-2 px-4 border border-black">
                            Recommended by Head of GSD Unit
                          </th>

                          <th className="py-2 px-4 border border-black">
                            Implemented by Network Administration & Management
                          </th>
                          <th className="py-2 px-4 border border-black">
                            Implemented by GSD Unit
                          </th>
                        </>
                      ) : (
                        // If "Vault" is the only value, show only GSD-related columns
                        <>
                          <th className="py-2 px-2 border border-black w-1/4">
                            Recommended by (CISO/ Head of ISRM Unit)
                          </th>
                          <th className="py-2 px-2 border border-black w-1/4">
                            Approved by (HOICTD/CTO/ CIO/CITO)
                          </th>
                          <th className="py-2 px-4 border border-black">
                            Recommended by Head of GSD Unit
                          </th>

                          <th className="py-2 px-4 border border-black">
                            Implemented by GSD Unit
                          </th>
                        </>
                      )}
                    </>
                  ) : (
                    // If "Vault" is not present, show Network-related columns
                    <>
                      <th className="py-2 px-2 border border-black w-1/4">
                        Recommended by (CISO/ Head of ISRM Unit)
                      </th>
                      <th className="py-2 px-2 border border-black w-1/4">
                        Approved by (HOICTD/CTO/ CIO/CITO)
                      </th>
                      <th className="py-2 px-4 border border-black">
                        Recommended by Head of Network Administration &
                        Management Unit
                      </th>

                      <th className="py-2 px-4 border border-black">
                        Implemented by Network Administration & Management
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  {formData.dooraccess?.includes("Vault") ? (
                    <>
                      {/* If "Vault" is present in dooraccess */}
                      {formData.dooraccess.length > 1 ? (
                        // If there are additional values besides "Vault", show all columns
                        <>
                          <td className="py-2 px-4 border border-black">
                            {formData.isrmheadusername}
                          </td>
                          <td className="py-2 px-4 border border-black">
                            {formData.citousername}
                          </td>
                          <td className="py-2 px-4 border border-black">
                            {formData.networkheadusername}
                          </td>
                          <td className="py-2 px-4 border border-black">
                            {formData.gsdheadusername}
                          </td>

                          <td className="py-2 px-4 border border-black">
                            {formData.networkimplementedbyusername
                              ? formData.networkimplementedbyusername
                              : "Network Administration & Management"}
                          </td>
                          <td className="py-2 px-4 border border-black">
                            {formData.gsdimplementedbyusername
                              ? formData.gsdimplementedbyusername
                              : "GSD Unit"}
                          </td>
                        </>
                      ) : (
                        // If "Vault" is the only value, show only GSD-related columns
                        <>
                          <td className="py-2 px-4 border border-black">
                            {formData.isrmheadusername}
                          </td>
                          <td className="py-2 px-4 border border-black">
                            {formData.citousername}
                          </td>
                          <td className="py-2 px-4 border border-black">
                            {formData.gsdheadusername}
                          </td>

                          <td className="py-2 px-4 border border-black">
                            {formData.gsdimplementedbyusername
                              ? formData.gsdimplementedbyusername
                              : "GSD Unit"}
                          </td>
                        </>
                      )}
                    </>
                  ) : (
                    // If "Vault" is not present, show Network-related columns
                    <>
                      <td className="py-2 px-4 border border-black">
                        {formData.isrmheadusername}
                      </td>
                      <td className="py-2 px-4 border border-black">
                        {formData.citousername}
                      </td>
                      <td className="py-2 px-4 border border-black">
                        {formData.networkheadusername}
                      </td>

                      <td className="py-2 px-4 border border-black">
                        {formData.networkimplementedbyusername
                          ? formData.networkimplementedbyusername
                          : "Network Administration & Management"}
                      </td>
                    </>
                  )}
                </tr>
                <tr>
                  {formData.dooraccess?.includes("Vault") ? (
                    <>
                      {/* If "Vault" is present in dooraccess */}
                      {formData.dooraccess.length > 1 ? (
                        // If there are additional values besides "Vault", show all columns
                        <>
                          <td className="py-2 px-4 border border-black">
                            Status :<strong>{formData.isrmheadstatus}</strong>
                          </td>
                          <td className="py-2 px-4 border border-black">
                            Status :<strong> {formData.citostatus}</strong>
                          </td>
                          <td className="py-2 px-4 border border-black">
                            Status :
                            <strong>{formData.networkheadstatus}</strong>
                          </td>
                          <td className="py-2 px-4 border border-black">
                            Status :<strong>{formData.gsdheadstatus}</strong>
                          </td>

                          <td className="py-2 px-4 border border-black">
                            Status :
                            <strong>
                              {formData.networkimplementedbystatus
                                ? formData.networkimplementedbystatus
                                : "Network Administration & Management"}
                            </strong>
                          </td>
                          <td className="py-2 px-4 border border-black">
                            Status :
                            <strong>
                              {formData.gsdimplementedbystatus
                                ? formData.gsdimplementedbystatus
                                : "GSD Unit"}
                            </strong>
                          </td>
                        </>
                      ) : (
                        // If "Vault" is the only value, show only GSD-related columns
                        <>
                          <td className="py-2 px-4 border border-black">
                            Status : <strong>{formData.isrmheadstatus}</strong>
                          </td>
                          <td className="py-2 px-4 border border-black">
                            Status : <strong> {formData.citostatus}</strong>
                          </td>
                          <td className="py-2 px-4 border border-black">
                            Status : <strong>{formData.gsdheadstatus}</strong>
                          </td>

                          <td className="py-2 px-4 border border-black">
                            Status :{" "}
                            <strong>
                              {formData.gsdimplementedbystatus
                                ? formData.gsdimplementedbystatus
                                : "GSD Unit"}
                            </strong>
                          </td>
                        </>
                      )}
                    </>
                  ) : (
                    // If "Vault" is not present, show Network-related columns
                    <>
                      <td className="py-2 px-4 border border-black">
                        Status : <strong>{formData.isrmheadstatus}</strong>
                      </td>
                      <td className="py-2 px-4 border border-black">
                        Status : <strong> {formData.citostatus}</strong>
                      </td>
                      <td className="py-2 px-4 border border-black">
                        Status : <strong>{formData.networkheadstatus}</strong>
                      </td>

                      <td className="py-2 px-4 border border-black">
                        Status :{" "}
                        <strong>
                          {formData.networkimplementedbystatus
                            ? formData.networkimplementedbystatus
                            : "Network Administration & Management"}
                        </strong>
                      </td>
                    </>
                  )}
                </tr>
                <tr>
                  {formData.dooraccess?.includes("Vault") ? (
                    <>
                      {/* If "Vault" is present in dooraccess */}
                      {formData.dooraccess.length > 1 ? (
                        // If there are additional values besides "Vault", show all columns
                        <>
                          <td className="py-2 px-4 border border-black">
                            Comment : <strong>{formData.isrmheadcmnt}</strong>
                          </td>
                          <td className="py-2 px-4 border border-black">
                            Comment : <strong> {formData.citocmnt}</strong>
                          </td>
                          <td className="py-2 px-4 border border-black">
                            Comment :{" "}
                            <strong>{formData.networkheadcmnt}</strong>
                          </td>
                          <td className="py-2 px-4 border border-black">
                            Comment : <strong>{formData.gsdheadcmnt}</strong>
                          </td>

                          <td className="py-2 px-4 border border-black"></td>
                          <td className="py-2 px-4 border border-black"></td>
                        </>
                      ) : (
                        // If "Vault" is the only value, show only GSD-related columns
                        <>
                          <td className="py-2 px-4 border border-black">
                            Comment :<strong>{formData.isrmheadcmnt}</strong>
                          </td>
                          <td className="py-2 px-4 border border-black">
                            Comment :<strong> {formData.citocmnt}</strong>
                          </td>
                          <td className="py-2 px-4 border border-black">
                            Comment :<strong>{formData.gsdheadcmnt}</strong>
                          </td>

                          <td className="py-2 px-4 border border-black"></td>
                        </>
                      )}
                    </>
                  ) : (
                    // If "Vault" is not present, show Network-related columns
                    <>
                      <td className="py-2 px-4 border border-black">
                        Comment :<strong>{formData.isrmheadcmnt}</strong>
                      </td>
                      <td className="py-2 px-4 border border-black">
                        Comment :<strong> {formData.citocmnt}</strong>
                      </td>
                      <td className="py-2 px-4 border border-black">
                        Comment :<strong>{formData.networkheadcmnt}</strong>
                      </td>

                      <td className="py-2 px-4 border border-black"></td>
                    </>
                  )}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-center items-center ">
            <button
              type="submit"
              className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccessControlRequestFormEdit;
