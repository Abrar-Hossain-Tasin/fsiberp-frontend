import { useEffect, useState } from "react";
import AllFormsHeader from "../../../component/AllFormsHeader";
import Dynamictable from "../../../component/Dynamictable";
import RequestorTwo from "../../../component/OthersCopyComponent/RequestorTwo";
import RadioButton from "../../../component/RadioButton/RadioButton";

import DomainAdminTable from "../../../component/OthersCopyComponent/DomainAdminTable";
import { Base_api, unitHeadSearch } from "../../../utils/api/Base_api.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewBranchSearch from "../../../component/DomainForm/BranchSearch/NewBranchSearch.jsx";
import PreviousBranchSearch from "../../../component/DomainForm/BranchSearch/PreviousBranchSearch.jsx";

import { faPaperclip, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const Dicf = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid, domainuser } = decoded;

  // unit_head_search
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [empList, setEmpList] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const [joiningLetter, setJoiningLetter] = useState(null);
  const [files, setFiles] = useState([]);
  const [action, setAction] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [previousBranchName, setPreviousBranchName] = useState(null);
  const [test, setTest] = useState("");

  const [newBranchName, setNewBranchName] = useState(null);
  const [newBranchCode, setNewBranchCode] = useState("");

  const [transferDate, setTransferDate] = useState(null); // State for transfer date

  const [unitheadusername, setUnitheadusername] = useState("");
  const [unitheaduserid, setUnitheaduserid] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${unitHeadSearch}/${userid}`);
        const data = await response.json();
        setEmpList(data);
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

    const filtered = empList.filter((item) =>
      item.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
    setShowOptions(value.trim() !== "");
  };

  const handleOptionClick = (username, userid) => {
    setSearchTerm(`${username} - ${userid}`);
    setShowOptions(false);
    setUnitheaduserid(userid); // Store unit head user ID
    setUnitheadusername(username); // Store unit head username
    // setUnitheaduserid(userid);
    // setUnitheadusername(username);
  };

  // unit_head_search_finish

  // const handleFileChange = (e) => {
  //   setJoiningLetter(e.target.files[0]);
  // };

  // File Upload
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files[0];
    if (selectedFiles.size / 1024 < 250) {
      selectedFiles.size / 1024;
      setJoiningLetter(selectedFiles);
      selectedFiles.name;
      setFiles(selectedFiles.name);
      files;
    } else {
      toast.error("File size must be under 250 kb", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const removeFile = () => {
    setFiles("");
    setJoiningLetter(null);
  };

  const handleActionChange = (e) => {
    setAction(e.target.value);
  };

  const handlePreviousBranchSelect = (branch) => {
    setPreviousBranchName(branch.branchname); // Set the selected branch name
    setBranchCode(branch.branchcode); // Set the selected branch code
    setTest(branch.branchcode); // Update the test state to show the branch code
  };

  const handleNewBranchSelect = (branch) => {
    setNewBranchName(branch.branchname); // Set the selected branch
    setNewBranchCode(branch.branchcode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("joiningLetter", joiningLetter);
    formData.append("action", action);
    if (transferDate) {
      formData.append("transferDate", transferDate);
    }
    formData.append("unitheadusername", unitheadusername);
    formData.append("unitheaduserid", unitheaduserid);

    if (previousBranchName) {
      formData.append("previousBranchName", previousBranchName);
      formData.append("previousBranchCode", branchCode); // Append selected branch name
    }
    if (newBranchName) {
      formData.append("newBranchName", newBranchName);
      formData.append("newBranchCode", newBranchCode); // Append selected branch name
    }

    for (const value of formData.values()) {
      value;
    }

    const apiUrl = `${Base_api}/api/domain/save/${userid}`; // Use the user ID in the URL

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

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
        toast.success("Form submitted successfully!", { autoClose: 2000 });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }

      // if (response.ok) {
      //   toast.success("Form submitted successfully!", {
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
      //   toast.error("Error submitting form.");
      //   (response);
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="m-auto">
      <form onSubmit={handleSubmit}>
        <ToastContainer />
        <div className="bg-white rounded-xl shadow-[0_5px_10px_0px_gray] my-5 py-5 w-[900px] text-[15px]">
          <div className="w-[850px] mx-6">
            <AllFormsHeader
              divname="ICT Division"
              formname="Domain ID Create/Freeze/Edit"
              dno="1010"
              vno="3.0"
              edate="08.10.2023"
              fpageno="1"
              lpageno="1"
              rdiv="ICTD"
              rformname="DIC"
            />
            <div className="mt-4">
              <Dynamictable userid={userid} />
              <RequestorTwo text="To be completed by respective Branch/Unit/Department/ Division/Zone" />

              {/* <div className="mb-4">
              <LabelwithInput
                labelhtmlfor="join_letter"
                labelname="Joining Letter ( For New Employees and Transfer From Another Branch):"
                inputtype="file"
                inputid="join_letter"
                inputname="join_letter"
                width="w-80"
                margin_top="mt-3"
                onChange={handleFileChange}
              />
            </div> */}

              <div className="mb-4">
                <table className="w-full text-sm font-[500]">
                  <tbody>
                    <tr>
                      <td className="border border-black py-2 pl-2 text-center">
                        <strong>Action</strong>
                      </td>
                      <td className="border border-black py-2 pl-2">
                        <div className="text-center">
                          <RadioButton
                            id="create"
                            name="action"
                            value="Create"
                            htmlFor="create"
                            labeltext="Create"
                            className="ml-1"
                            domainuser={domainuser}
                            onChange={handleActionChange}
                          />

                          <RadioButton
                            id="freeze"
                            name="action"
                            value="Freeze"
                            htmlFor="freeze"
                            labeltext="Freeze"
                            className="ml-1"
                            ml="ml-4"
                            onChange={handleActionChange}
                          />

                          <RadioButton
                            id="edit"
                            name="action"
                            value="Edit"
                            htmlFor="edit"
                            labeltext="Edit"
                            className="ml-1"
                            ml="ml-4"
                            onChange={handleActionChange}
                          />

                          <RadioButton
                            id="reset"
                            name="action"
                            value="Reset"
                            htmlFor="reset"
                            labeltext="Reset"
                            className="ml-1"
                            ml="ml-4"
                            onChange={handleActionChange}
                          />

                          <RadioButton
                            id="unlock"
                            name="action"
                            value="Unlock"
                            htmlFor="unlock"
                            labeltext="Unlock"
                            className="ml-1"
                            ml="ml-4"
                            onChange={handleActionChange}
                          />

                          <RadioButton
                            id="transfer"
                            name="action"
                            value="Transfer"
                            htmlFor="transfer"
                            labeltext="Transfer"
                            className="ml-1"
                            ml="ml-4"
                            onChange={handleActionChange}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="my-4">
                <table className="w-full text-sm font-[500]">
                  <thead>
                    <tr>
                      <th className="border border-black py-2" colSpan="4">
                        Transfer Details
                      </th>
                    </tr>

                    <tr>
                      <th className="border border-black py-2">
                        <label htmlFor="pre_place">Previous Place</label>
                      </th>
                      <th className="border border-black py-2">
                        <label htmlFor="pre_place">
                          Previous Branch <br /> Code
                        </label>
                      </th>
                      <th className="border border-black py-2">
                        <label htmlFor="pres_place">Present Place</label>
                      </th>
                      <th className="border border-black py-2">
                        <label htmlFor="date_of">
                          Present Branch <br /> Code
                        </label>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-black py-2 text-center">
                        <PreviousBranchSearch
                          onBranchSelect={handlePreviousBranchSelect}
                          previousBranchName={previousBranchName}
                          required={action === "Transfer"}
                        />
                      </td>

                      <td className="border border-black py-2 text-center">
                        <input
                          className="text-[#3b3838] border-[1px] border-black text-sm p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100 text-center"
                          placeholder="Branch Code"
                          value={branchCode} // Use branchCode state to show the previous branch code
                          readOnly
                        />
                      </td>

                      <td className="border border-black py-2 text-center">
                        <NewBranchSearch
                          onBranchSelect={handleNewBranchSelect}
                          newBranchName={newBranchName}
                          required={action === "Transfer"}
                        />
                      </td>

                      <td className="border border-black py-2 text-center">
                        <input
                          className="text-[#3b3838] border-[1px] border-black text-sm p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100 text-center"
                          value={newBranchCode}
                          placeholder="Branch Code"
                          readOnly
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-center font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5 text-sm">
                For New Employees and Transfer From Another Branch
              </h3>

              <div className="flex items-center gap-2">
                <div className="w-full">
                  <table className="w-full text-sm font-[500]">
                    <thead>
                      <tr>
                        <th className="border border-black p-1 text-sm w-1/4 text-center">
                          Date of Join / Transfer
                        </th>
                        <td className="border border-black p-1 text-sm w-1/4 text-center">
                          <input
                            type="date"
                            id="date_of"
                            name="date_of"
                            onChange={(e) => setTransferDate(e.target.value)}
                            className="text-[#3b3838] border-[1px] border-black text-sm p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100 text-center"
                            required
                          />
                        </td>
                        <th className="border border-black p-1 text-sm w-1/4 text-center">
                          Joining Letter
                        </th>
                        <td className="border border-black p-1 text-sm w-1/4 text-center">
                          {/* <input
                          type="file"
                          id="join_letter"
                          name="join_letter"
                          // onChange={(e) => setTransferDate(e.target.value)}
                          className="text-[#3b3838] border-[1px] border-black text-sm p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100 text-center"
                          onChange={handleFileChange}
                        /> */}
                          <div className="flex flex-col items-center gap-1 border border-slate-400 p-1">
                            <input
                              type="file"
                              id="join_letter"
                              style={{ display: "none" }}
                              onChange={handleFileChange}
                              required={
                                action === "Transfer" || action === "Create"
                              }
                            />
                            <div className="w-42 p-1 flex items-center cursor-pointer text-xs rounded border font-[500] bg-slate-300 border-slate-300">
                              <label htmlFor="join_letter" className="px-1">
                                Attachment
                              </label>
                              <label
                                htmlFor="join_letter"
                                className="flex items-center cursor-pointer"
                              >
                                <FontAwesomeIcon
                                  icon={faPaperclip}
                                  className="w-3 h-3 cursor-pointer text-gray-600 -rotate-45"
                                />
                              </label>
                            </div>
                            {files.length === 0 ? (
                              <label
                                htmlFor=""
                                className="text-slate-500 text-xs font-[500]"
                              >
                                (File size must be under 250KB)
                              </label>
                            ) : (
                              ""
                            )}
                            {files.length > 0 && (
                              <ul className="flex flex-wrap gap-2 font-[500] text-sm">
                                <div className="flex items-center bg-[#cee6f7] p-1 rounded border border-slate-400">
                                  <label className="text-xs">{files}</label>

                                  <FontAwesomeIcon
                                    onClick={() => removeFile(files)}
                                    icon={faXmark}
                                    className="m-1 p-[1px] w-3 h-3 rounded cursor-pointer bg-red-400 "
                                  />
                                </div>
                              </ul>
                            )}
                          </div>
                        </td>
                      </tr>
                    </thead>
                  </table>
                </div>

                {/* <div>
                <table className="h-[30px] border-collapse">
                  <thead>
                    <tr className="h-[30px]">
                      <th className="border border-black p-2 h-[30px]">
                        Joining Letter
                      </th>
                      <td className="border border-black p-2 h-[30px]">
                        <LabelwithInput
                          labelhtmlfor="join_letter"
                          inputtype="file"
                          inputid="join_letter"
                          inputname="join_letter"
                          width="w-80"
                        />
                      </td>
                    </tr>
                  </thead>
                </table>
              </div> */}
              </div>

              {/* unit_head_search */}
              <div className="mt-4  mb-4">
                <table className="w-full text-sm font-[500]">
                  <tbody>
                    <tr>
                      <th className="border border-black py-2 text-sm">
                        <label htmlFor="search-input">
                          Approved by (Head of Branch/Unit/Division/Department)
                        </label>
                      </th>
                      <th className="border border-black">
                        <label htmlFor="downtime_duration_desc text-sm">
                          Status
                        </label>
                      </th>
                      <th className="border border-black">
                        <label htmlFor="downtime_duration_desc text-sm">
                          Comment
                        </label>
                      </th>
                    </tr>
                    <tr className="">
                      <td className="border border-black w-[50%]">
                        <div className="flex justify-center ">
                          <div className="relative ">
                            <input
                              type="text"
                              id="search-input"
                              name="search"
                              // className="text-[#514f4f] border-2 border-[#d2d2e4] text-center w-80 p-1  my-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"

                              className="text-[#3b3838] w-80 border-[1px] border-black text-sm p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100 text-center"
                              placeholder="Search Here!"
                              value={searchTerm}
                              onChange={handleInputChange}
                              autoComplete="off"
                              required
                            />
                            {showOptions && (
                              <ul className="absolute w-full text-center bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                                {filteredOptions.map((item) => (
                                  <li
                                    key={item.id}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() =>
                                      handleOptionClick(
                                        item.username,
                                        item.userid
                                      )
                                    }
                                  >
                                    {item.username} - {item.userid}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="border border-black text-center w-[25%]">
                        <strong className="">Pending</strong>
                      </td>
                      <td className="border border-black text-center w-[25%]">
                        <strong className=""></strong>
                      </td>
                    </tr>{" "}
                  </tbody>
                </table>
              </div>
              {/* unit_head_search finish*/}

              {/* admin_panel_ict */}
              <div>
                <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5 text-sm">
                  To be completed by respective officials for giving Access
                  permission
                </h4>
                <DomainAdminTable
                  userid={userid}
                  fname="Checked By AD In charge"
                  sname="Approval by HOICTD/CTO/CIO/CITO"
                  tname="Recommended by Head of ISRM Unit/CISO"
                  iby="Implemented by"
                  tnameperson="Working"
                  ibynameperson="System Hardware Unit"
                  tnamestatus="Working"
                  ibypersonstatus="Working"
                />
              </div>
              {/* admin_panel_ict */}

              {/* terms and condition */}
              <div className="my-4 text-[16px] font-[600] text-[#421414]">
                <h2 className="text-center text-xl underline">
                  <strong>Terms and Condition</strong>
                </h2>

                <h2 className="underline">
                  <strong>Password : </strong>
                </h2>

                <ol className="list-decimal ml-4 mt-2">
                  <li>
                    The minimum password length at least 6 characters,
                    combination of uppercase, lowercase, numbers & may include
                    special characters.
                  </li>

                  <li>
                    The maximum validity period of password will be 45 days
                  </li>

                  <li>
                    In case of wrong password for 3 times your Account will be
                    locked.
                  </li>
                  <li>
                    Same passwords to be used again after at least 4 times.
                  </li>
                </ol>
              </div>
              {/* terms and condition */}
              <div className="w-full flex justify-center">
                <input
                  type="submit"
                  className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Dicf;
