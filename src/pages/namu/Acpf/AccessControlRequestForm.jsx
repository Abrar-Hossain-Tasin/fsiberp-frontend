import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Base_api, unitHeadSearch } from "../../../utils/api/Base_api";

import AllFormsHeader from "../../../component/AllFormsHeader";

import { faPaperclip, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import Dynamictable from "../../../component/Dynamictable";

const AccessControlRequestForm = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  const { userId, formId, id } = useParams();
  const [eligibleUsers, setEligibleUsers] = useState([]);
  const [formData, setFormData] = useState({});
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Unit Head Search Option start
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${unitHeadSearch}/${userid}`);
        const data = await response.json();
        setEligibleUsers(data);
        setFilteredOptions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (event.target.name === "joiningLetter") {
  //     setJoiningLetter(file ? file : null);
  //   } else if (event.target.name === "employeeIdCard") {
  //     setEmployeeIdCard(file ? file : null);
  //   }
  // };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files[0];
    if (event.target.name === "joiningLetter") {
      selectedFiles;
      setJoiningLetter(selectedFiles);
      selectedFiles.name;
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
      } else if (type === "employeeIdCard") {
        setEmployeeIdCard("");
        setEmployeeIdCardFiles("");
      }
    } catch (error) {
      error;
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("cardnumber", card_number);
  //   formData.append("joiningLetter", joiningLetter);
  //   formData.append("employeeIdCard", employeeIdCard);
  //   formData.append("existingaccessinfo", existingaccessinfo);
  //   formData.append("unitheaduserid", unitheaduserid);
  //   formData.append("unitheadusername", unitheadusername);

  //   // Append checked options as an array
  //   checkedOptions.forEach((option) => {
  //     if (option !== "other") {
  //       formData.append("dooraccess", option); // Use 'options[]' to indicate an array
  //     }
  //   });

  //   // Append the input value if "other" is selected
  //   if (checkedOptions.includes("other") && otherValue) {
  //     formData.append("dooraccess", ["other", otherValue]); // Append the other value as well
  //   }

  //   try {
  //     const decryptedId = decryptId(id);
  //     const response = await fetch(
  //       `${Base_api}/api/accesscontrol/update/${decryptedId}`,
  //       {
  //         method: "PUT", // Use PUT for updates
  //         body: formData,
  //       }
  //     );
  //     (response);

  //     if (response.ok) {
  //       ("Update successful");
  //       // Clear form fields or handle success as needed
  //       setCheckedOptions([]);
  //       setCard_number("");
  //       setJoiningLetter(null);
  //       setEmployeeIdCard(null);
  //       setExistingaccessinfo("");
  //     } else {
  //       const errorText = await response.text();
  //       console.error("Failed to Submit:", response.status, errorText);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("cardnumber", card_number);
    formData.append("joiningLetter", joiningLetter);
    formData.append("employeeIdCard", employeeIdCard);
    formData.append("existingaccessinfo", existingaccessinfo);
    formData.append("unitheaduserid", unitheaduserid);
    formData.append("unitheadusername", unitheadusername);

    // Append checked options
    checkedOptions.forEach((option) => {
      if (option !== "Other") {
        formData.append("dooraccess", option);
      }
    });

    // Append only the input value if "other" is selected
    if (checkedOptions.includes("Other") && otherValue.trim() !== "") {
      formData.append("dooraccess", "Other"); // Include otherValue in the dooraccess array
      formData.append("dooraccess", otherValue); // Include otherValue in the dooraccess array
    }

    for (const value of formData.values()) {
      value;
    }

    try {
      const response = await fetch(
        `${Base_api}/api/accesscontrol/save/${userid}`,
        {
          method: "POST", // Use PUT for updates
          body: formData,
        }
      );
      response;

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
      //   toast.success("Form Submitted successfully!", {
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
      // } else {
      //   ("Failed to Submit");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // dynamictable4_function
  useEffect(() => {
    fetch(`${Base_api}/api/accesscontrol/view/${userid}`)
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
    <form className="px-5 mx-5 m-auto" onSubmit={handleSubmit}>
      <ToastContainer />
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
          submitdate={formData.submitdate}
          referenceValue={formData.referenceValue}
        />
        <div className="my-2">
          <Dynamictable userid={userid} />
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
              onChange={(e) => setCard_number(e.target.value)}
              placeholder="Enter Card Number"
              autoComplete="off"
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
                <th colSpan={2} className="w-1/2 border px-4 py-2 border-black">
                  Approved by (Manager/Department Head/Unit Head)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td rowSpan={2} className="border pl-24 border-black px-5 py-2">
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
                            autoComplete="off"
                            required
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </td>
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
                        {filteredOptions.map((item, index) => (
                          <li
                            key={index}
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
                  Status :
                  <strong>
                    {formData.unitheadstatus
                      ? formData.unitheadstatus
                      : " Pending"}
                  </strong>
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
        <div className="mb-5 text-sm font-[600] text-[#1b3c1c] bg-slate-200/95 rounded mt-1">
          {/* <table className="min-w-full  border ">
            <thead className="text-sm">
              <tr>
                <th className="py-2 px-4 border border-black">
                  Recommended by Head of Network Administration & Management
                  Unit
                </th>
                <th className="py-2 px-4 border border-black">
                  Recommended by Head of GSD Unit
                </th>

                <th className="py-2 px-4 border border-black">
                  Recommended by (CISO/ Head of ISRM Unit)
                </th>
                <th className="py-2 px-4 border border-black">
                  Approved by (HOICTD/CTO/ CIO/CITO)
                </th>
                <th className="py-2 px-4 border border-black">
                  Implemented by Network Administration & Management
                </th>
                <th className="py-2 px-4 border border-black">
                  Implemented by GSD Unit
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-center">
              <tr>
                <td className="py-2 px-4 border border-black">
                  {formData.networkheadusername}
                </td>
                <td className="py-2 px-4 border border-black">
                  {formData.gsdheadusername}
                </td>
                <td className="py-2 px-4 border border-black">
                  {formData.isrmheadusername}
                </td>
                <td className="py-2 px-4 border border-black">
                  {formData.citousername}
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
              </tr>
              <tr>
                <td className="py-2 px-4 border border-black">
                  <strong>Status : </strong>
                  {formData.networkheadstatus}
                </td>
                <td className="py-2 px-4 border border-black">
                  <strong>Status : </strong>
                  {formData.gsdheadstatus}
                </td>
                <td className="py-2 px-4 border border-black">
                  <strong>Status : </strong>
                  {formData.isrmheadstatus}
                </td>
                <td className="py-2 px-4 border border-black">
                  <strong>Status : </strong> {formData.citostatus}
                </td>
                <td className="py-2 px-4 border border-black">
                  <strong>Status : </strong>
                  {formData.networkimplementedbystatus
                    ? formData.networkimplementedbystatus
                    : "Network Administration & Management"}
                </td>
                <td className="py-2 px-4 border border-black">
                  <strong>Status : </strong>
                  {formData.gsdimplementedbystatus
                    ? formData.gsdimplementedbystatus
                    : "GSD Unit"}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border border-black">
                  <strong>Comment : </strong>
                  {formData.networkheadcmnt}
                </td>
                <td className="py-2 px-4 border border-black">
                  <strong>Comment : </strong>
                  {formData.gsdheadcmnt}
                </td>
                <td className="py-2 px-4 border border-black">
                  <strong>Comment : </strong>
                  {formData.isrmheadcmnt}
                </td>
                <td className="py-2 px-4 border border-black">
                  <strong>Comment : </strong> {formData.citocmnt}
                </td>
                <td className="py-2 px-4 border border-black"></td>
                <td className="py-2 px-4 border border-black"></td>
              </tr>
            </tbody>
          </table> */}
          <table className="min-w-full border text-center">
            <thead className="text-sm">
              <tr>
                {checkedOptions.includes("Vault") ? (
                  <>
                    {/* If "Vault" is present in dooraccess */}
                    {checkedOptions.length > 1 ? (
                      // If there are additional values besides "Vault", show all columns
                      <>
                        <th className="py-2 px-4 border border-black ">
                          Recommended by (CISO/ Head of ISRM Unit)
                        </th>
                        <th className="py-2 px-4 border border-black ">
                          Approved by (HOICTD/CTO/ CIO/CITO)
                        </th>
                        <th className="py-2 px-4 border border-black ">
                          Recommended by Head of Network Administration &
                          Management Unit
                        </th>
                        <th className="py-2 px-4 border border-black ">
                          Recommended by Head of GSD Unit
                        </th>

                        <th className="py-2 px-4 border border-black ">
                          Implemented by Network Administration & Management
                        </th>
                        <th className="py-2 px-4 border border-black ">
                          Implemented by GSD Unit
                        </th>
                      </>
                    ) : (
                      // If "Vault" is the only value, show only GSD-related columns
                      <>
                        <th className="py-2 px-4 border border-black w-[25%]">
                          Recommended by (CISO/ Head of ISRM Unit)
                        </th>
                        <th className="py-2 px-4 border border-black w-[25%]">
                          Approved by (HOICTD/CTO/ CIO/CITO)
                        </th>
                        <th className="py-2 px-4 border border-black w-[25%]">
                          Recommended by Head of GSD Unit
                        </th>

                        <th className="py-2 px-4 border border-black w-[25%]">
                          Implemented by GSD Unit
                        </th>
                      </>
                    )}
                  </>
                ) : (
                  // If "Vault" is not present, show Network-related columns
                  <>
                    <th className="py-2 px-4 border border-black w-[25%]">
                      Recommended by (CISO/ Head of ISRM Unit)
                    </th>
                    <th className="py-2 px-4 border border-black w-[25%]">
                      Approved by (HOICTD/CTO/ CIO/CITO)
                    </th>
                    <th className="py-2 px-4 border border-black w-[25%]">
                      Recommended by Head of Network Administration & Management
                      Unit
                    </th>

                    <th className="py-2 px-4 border border-black w-[25%]">
                      Implemented by Network Administration & Management
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr>
                {checkedOptions.includes("Vault") ? (
                  <>
                    {/* If "Vault" is present in dooraccess */}
                    {checkedOptions.length > 1 ? (
                      // If there are additional values besides "Vault", show all columns
                      <>
                        <td className="py-2 px-4 border border-black">
                          {formData.isrmheadusername
                            ? formData.isrmheadusername
                            : "Md. Mostafejur Rahman"}
                        </td>
                        <td className="py-2 px-4 border border-black">
                          {formData.citousername
                            ? formData.citousername
                            : "Md. Mushfiqur Rahman"}
                        </td>
                        <td className="py-2 px-4 border border-black">
                          {formData.networkheadusername
                            ? formData.networkheadusername
                            : "Md. Sarfuddin Daiher Tajalli"}
                        </td>
                        <td className="py-2 px-4 border border-black">
                          {formData.gsdheadusername
                            ? formData.gsdheadusername
                            : "K.B.M. Ismail Chowdhury"}
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
                          {formData.isrmheadusername
                            ? formData.isrmheadusername
                            : "Md. Mostafejur Rahman"}
                        </td>
                        <td className="py-2 px-4 border border-black">
                          {formData.citousername
                            ? formData.citousername
                            : "Md. Mushfiqur Rahman"}
                        </td>
                        <td className="py-2 px-4 border border-black">
                          {formData.gsdheadusername
                            ? formData.gsdheadusername
                            : "K.B.M. Ismail Chowdhury"}
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
                      {formData.isrmheadusername
                        ? formData.isrmheadusername
                        : "Md. Mostafejur Rahman"}
                    </td>
                    <td className="py-2 px-4 border border-black">
                      {formData.citousername
                        ? formData.citousername
                        : "Md. Mushfiqur Rahman"}
                    </td>
                    <td className="py-2 px-4 border border-black">
                      {formData.networkheadusername
                        ? formData.networkheadusername
                        : "Md. Sarfuddin Daiher Tajalli"}
                    </td>

                    <td className="py-2 px-4 border border-black">
                      {formData.networkimplementedbyusername
                        ? formData.networkimplementedbyusername
                        : "Access Control"}
                    </td>
                  </>
                )}
              </tr>
              <tr>
                {checkedOptions.includes("Vault") ? (
                  <>
                    {/* If "Vault" is present in dooraccess */}
                    {checkedOptions.length > 1 ? (
                      // If there are additional values besides "Vault", show all columns
                      <>
                        <td className="py-2 px-4 border border-black">
                          Status :
                          <strong>
                            {formData.isrmheadstatus
                              ? isrmheadstatus
                              : "Pending"}
                          </strong>
                        </td>
                        <td className="py-2 px-4 border border-black">
                          Status :{" "}
                          <strong>
                            {formData.citostatus
                              ? formData.citostatus
                              : "Pending"}
                          </strong>
                        </td>
                        <td className="py-2 px-4 border border-black">
                          Status :
                          <strong>
                            {formData.networkheadstatus
                              ? networkheadstatus
                              : "Pending"}
                          </strong>
                        </td>
                        <td className="py-2 px-4 border border-black">
                          Status :
                          <strong>
                            {formData.gsdheadstatus ? gsdheadstatus : "Pending"}
                          </strong>
                        </td>

                        <td className="py-2 px-4 border border-black">
                          Status :
                          <strong>
                            {formData.networkimplementedbystatus
                              ? formData.networkimplementedbystatus
                              : "Pending"}
                          </strong>
                        </td>
                        <td className="py-2 px-4 border border-black">
                          Status :
                          <strong>
                            {formData.gsdimplementedbystatus
                              ? formData.gsdimplementedbystatus
                              : "Pending"}
                          </strong>
                        </td>
                      </>
                    ) : (
                      // If "Vault" is the only value, show only GSD-related columns
                      <>
                        <td className="py-2 px-4 border border-black">
                          Status :
                          <strong>
                            {formData.isrmheadstatus
                              ? formData.isrmheadstatus
                              : "Pending"}
                          </strong>
                        </td>
                        <td className="py-2 px-4 border border-black">
                          Status :{" "}
                          <strong>
                            {formData.citostatus
                              ? formData.citostatus
                              : "Pending"}
                          </strong>
                        </td>
                        <td className="py-2 px-4 border border-black">
                          Status :
                          <strong>
                            {formData.gsdheadstatus
                              ? formData.gsdheadstatus
                              : "Pending"}
                          </strong>
                        </td>

                        <td className="py-2 px-4 border border-black">
                          Status :{" "}
                          <strong>
                            {formData.gsdimplementedbystatus
                              ? formData.gsdimplementedbystatus
                              : "Pending"}
                          </strong>
                        </td>
                      </>
                    )}
                  </>
                ) : (
                  // If "Vault" is not present, show Network-related columns
                  <>
                    <td className="py-2 px-4 border border-black">
                      Status :
                      <strong>
                        {" "}
                        {formData.isrmheadstatus
                          ? formData.isrmheadstatus
                          : "Pending"}
                      </strong>
                    </td>
                    <td className="py-2 px-4 border border-black">
                      Status :{" "}
                      <strong>
                        {" "}
                        {formData.citostatus ? formData.citostatus : "Pending"}
                      </strong>
                    </td>
                    <td className="py-2 px-4 border border-black">
                      Status :
                      <strong>
                        {" "}
                        {formData.networkheadstatus
                          ? formData.networkheadstatus
                          : "Pending"}
                      </strong>
                    </td>

                    <td className="py-2 px-4 border border-black">
                      Status :
                      <strong>
                        {" "}
                        {formData.networkimplementedbystatus
                          ? formData.networkimplementedbystatus
                          : "Pending"}
                      </strong>
                    </td>
                  </>
                )}
              </tr>
              <tr>
                {checkedOptions.includes("Vault") ? (
                  <>
                    {/* If "Vault" is present in dooraccess */}
                    {checkedOptions.length > 1 ? (
                      // If there are additional values besides "Vault", show all columns
                      <>
                        <td className="py-2 px-4 border border-black">
                          Comment : <strong>{formData.isrmheadcmnt}</strong>
                        </td>
                        <td className="py-2 px-4 border border-black">
                          Comment : <strong>{formData.citocmnt}</strong>
                        </td>
                        <td className="py-2 px-4 border border-black">
                          Comment :{" "}
                          <strong> {formData.networkheadcmnt} </strong>
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
                          Comment : <strong>{formData.citocmnt}</strong>
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
                      Comment : <strong>{formData.citocmnt}</strong>
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
          <input
            type="submit"
            className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
            value="Submit"
          />
        </div>
      </div>
    </form>
  );
};

export default AccessControlRequestForm;
