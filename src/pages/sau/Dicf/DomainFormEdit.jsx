import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AllFormsHeader from "../../../component/AllFormsHeader";
import Dynamictable from "../../../component/Dynamictable.jsx";
import RadioButton from "../../../component/RadioButton/RadioButton";
import { Base_api, unitHeadSearch } from "../../../utils/api/Base_api.jsx";
import { decryptId } from "../../AdminDashboard/encryption/Encrypted";

import Requestor from "../../../component/Requestor.jsx";

import NewBranchSearch from "../../../component/DomainForm/BranchSearch/NewBranchSearch.jsx";
import PreviousBranchSearch from "../../../component/DomainForm/BranchSearch/PreviousBranchSearch.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { faPaperclip, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jwtDecode } from "jwt-decode";
import DomainAdminApproval from "../../../component/Sau/DomainId/DomainAdminApproval";

const DomainFormEdit = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid, domainuser } = decoded;
  const { userId, formId, id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const [joiningLetter, setJoiningLetter] = useState(null);
  const [files, setFiles] = useState([]);
  const [action, setAction] = useState("");

  const [previousBranchName, setPreviousBranchName] = useState(null);
  const [branchCode, setBranchCode] = useState("");

  const [newBranchName, setNewBranchName] = useState(null);
  const [newBranchCode, setNewBranchCode] = useState("");

  const [transferDate, setTransferDate] = useState(""); // State for transfer date

  // unit_head_search
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [empList, setEmpList] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [unitheadusername, setUnitheadusername] = useState("");
  const [unitheaduserid, setUnitheaduserid] = useState("");
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

  // const [transferDate, setTransferDate] = useState("");

  // File Upload
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files[0];
    setJoiningLetter(selectedFiles);
    selectedFiles.name;
    setFiles(selectedFiles.name);
    files;
  };

  const removeFile = async () => {
    setFiles("");
    try {
      const response = await fetch(
        `${Base_api}/api/domain/removefile/${decryptId(id)}`,
        {
          method: "DELETE", // Use PUT for updates
        }
      );
    } catch (error) {
      error;
    }
  };

  const handleActionChange = (e) => {
    setAction(e.target.value);
  };

  const handlePreviousBranchSelect = (branch) => {
    setPreviousBranchName(branch.branchname); // Set the selected branch
    setBranchCode(branch.branchcode);
  };

  const handleNewBranchSelect = (branch) => {
    setNewBranchName(branch.branchname); // Set the selected branch
    setNewBranchCode(branch.branchcode);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decryptedUserId = decryptId(userId);
        const decryptedFormId = decryptId(formId);
        const decryptedId = decryptId(id);
        decryptedId;

        const response = await fetch(
          `${Base_api}/api/user/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );
        const data = await response.json();
        setFormData(data);

        setJoiningLetter(data.joiningLetter);
        setNewBranchName(data.newBranchName); // Assuming you have this in your API response
        setNewBranchCode(data.newBranchCode); // Assuming you have this in your API response

        // Set previous branch details from the fetched data
        setPreviousBranchName(data.previousBranchName); // Assuming the API returns this
        setBranchCode(data.previousBranchCode); // Assuming the API returns this
        setSearchTerm(`${data.unitheadusername} - ${data.unitheaduserid}`);
        setUnitheadusername(data.unitheadusername);
        setUnitheaduserid(data.unitheaduserid);

        setJoiningLetter(data.joiningLetterDownloadUrl);

        const documentPaths = data.joiningLetterPath;
        documentPaths;

        const a = documentPaths.split("~");
        a;
        const b = a[a.length - 1];
        setFiles(b);

        setAction(data.action);
        setTransferDate(data.transferDate);
        // Ensure dooraccess is an array
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid, formId, id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/cbs-user-permission/branches`
        );
        const data = await response.json();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("joiningLetter", joiningLetter);
    formData.append("action", action);
    if (transferDate) {
      formData.append("transferDate", transferDate);
    }
    if (previousBranchName) {
      formData.append("previousBranchName", previousBranchName);
      formData.append("previousBranchCode", branchCode); // Append selected branch name
    }
    if (newBranchName) {
      formData.append("newBranchName", newBranchName);
      formData.append("newBranchCode", newBranchCode); // Append selected branch name
    }
    formData.append("unitheaduserid", unitheaduserid);
    formData.append("unitheadusername", unitheadusername);

    try {
      const decryptedId = decryptId(id);
      const response = await fetch(
        `${Base_api}/api/domain/update/${decryptedId}`,
        {
          method: "PUT", // Use PUT for updates
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
      // } else {
      //   toast.error("Error Updated form.");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="m-auto" onSubmit={handleUpdate}>
      <ToastContainer />
      <div className="bg-white rounded-xl shadow-[0_5px_10px_0px_gray] my-5 py-5 w-[900px] text-[15px]">
        <div className="mx-6 w-[850px]">
          <div>
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
              submitdate={formData.submitdate}
              referenceValue={formData.referencevalue}
            />
            <div className="mt-4">
              <Dynamictable userid={decryptId(userId)} />

              <Requestor />

              {/* <div className="mb-4">
                <input
                  type="file"
                  name="join_letter"
                  id="join_letter"
                  className="text-[#514f4f] border-[1px] border-black   p-1 rounded-sm font-semibold placeholder-[#514f4f]"
                  onChange={handleFileChange}
                />

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
            </div>

            {/* <div className="flex flex-col py-1 gap-1">
              <input
                type="file"
                name="join_letter"
                id="join_letter"
                className="text-[#514f4f] border-[1px] border-black w-72  p-1 rounded-sm font-semibold placeholder-[#514f4f]"
                onChange={handleFileChange}
              />
              {formData.joiningLetterDownloadUrl ? (
                <Link
                  to={formData.joiningLetterDownloadUrl}
                  className="p-1 w-72 flex-shrink-0 font-medium text-center text-[15px] rounded-md shadow-md bg-green-300 hover:bg-green-400 active:bg-green-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Employee Joining Letter File
                </Link>
              ) : (
                "No document has been uploaded."
              )}
            </div> */}

            {/* action */}
            <div>
              <table className="w-full text-sm font-[500]">
                <tr>
                  <td className="border border-black py-2 pl-2 text-center">
                    <strong>Action</strong>
                  </td>
                  <td className="border border-black py-2 pl-2">
                    <div className="text-center">
                      <input
                        type="radio"
                        value="Create"
                        checked={action === "Create"}
                        onChange={handleActionChange}
                        id="Create"
                        disabled={domainuser === "1"}
                      />
                      <label htmlFor="Create" className="ml-1">
                        Create
                      </label>

                      <input
                        type="radio"
                        value="Freeze"
                        checked={action === "Freeze"}
                        onChange={handleActionChange}
                        id="Freeze"
                        className="ml-3"
                      />
                      <label htmlFor="Freeze" className="ml-1">
                        Freeze
                      </label>

                      {/* <RadioButton
                      id="create"
                      name="action"
                      value="Create"
                      htmlFor="create"
                      labeltext="Create"
                      className="ml-1"
                      checked={action === "Create"}
                      onChange={handleActionChange}
                    /> */}

                      {/* <RadioButton
                      id="freeze"
                      name="action"
                      htmlFor="freeze"
                      value="Freeze"
                      labeltext="Freeze"
                      className="ml-1"
                      ml="ml-4"
                      checked={action === "Freeze"}
                      onChange={handleActionChange}
                    /> */}

                      <RadioButton
                        id="edit"
                        name="action"
                        htmlFor="edit"
                        labeltext="Edit"
                        value="Edit"
                        className="ml-1"
                        ml="ml-4"
                        checked={action === "Edit"}
                        onChange={handleActionChange}
                      />

                      <RadioButton
                        id="reset"
                        name="action"
                        htmlFor="reset"
                        labeltext="Reset"
                        value="Reset"
                        className="ml-1"
                        ml="ml-4"
                        checked={action === "Reset"}
                        onChange={handleActionChange}
                      />

                      <RadioButton
                        id="unlock"
                        name="action"
                        htmlFor="unlock"
                        labeltext="Unlock"
                        className="ml-1"
                        ml="ml-4"
                        value="Unlock"
                        checked={action === "Unlock"}
                        onChange={handleActionChange}
                      />

                      <RadioButton
                        id="transfer"
                        name="action"
                        htmlFor="transfer"
                        labeltext="Transfer"
                        className="ml-1"
                        ml="ml-4"
                        value="Transfer"
                        checked={action === "Transfer"}
                        onChange={handleActionChange}
                      />
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            {/* action */}

            <div className="my-4">
              <table className="w-full text-sm font-[500]">
                <tr>
                  <th className="border border-black py-2" colSpan="4">
                    Transfer Details
                  </th>
                </tr>

                <tr>
                  <th className="border border-black py-2">Previous Place</th>
                  <th className="border border-black py-2">
                    Previous Branch Code
                  </th>
                  <th className="border border-black py-2">Present Place</th>
                  <th className="border border-black py-2">
                    Present Branch Code
                  </th>
                </tr>

                <tr>
                  <td className="border border-black py-2 text-center ">
                    <PreviousBranchSearch
                      onBranchSelect={handlePreviousBranchSelect}
                      previousBranchName={previousBranchName}
                      required={action === "Transfer"}
                    />
                  </td>

                  <td className="border border-black py-2 text-center">
                    <input
                      className="text-[#3b3838] border-[1px] border-black text-sm p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100 text-center"
                      value={branchCode} // This will show the previous branch code
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
                      readOnly
                    />
                  </td>
                </tr>
              </table>
            </div>
            <div className="flex items-center space-x-5">
              <div className="w-full">
                <table className="w-full text-sm font-[500]">
                  <tr>
                    <th className="border border-black p-1 text-sm w-1/4 text-center">
                      Date of Join / Transfer
                    </th>
                    <td className="border border-black p-1 text-sm w-1/4 text-center">
                      <input
                        type="date"
                        id="date_of"
                        name="date_of"
                        value={transferDate}
                        onChange={(e) => setTransferDate(e.target.value)}
                        className="text-[#514f4f] border-[1px]  border-black p-1 rounded-md font-semibold placeholder-[#514f4f] focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out"
                        // Update state on chang
                        required
                      />
                    </td>
                    <th className="border border-black p-1 text-sm w-1/4 text-center ">
                      Joining Letter
                    </th>
                    <td className="border border-black p-1 text-sm w-1/4 text-center">
                      {/* <div className="flex flex-col py-1 gap-1">
                        <input
                          type="file"
                          name="join_letter"
                          id="join_letter"
                          className="text-[#514f4f] border-[1px] border-black w-72  p-1 rounded-sm font-semibold placeholder-[#514f4f]"
                          onChange={handleFileChange}
                        />
                        {formData.joiningLetterDownloadUrl ? (
                          <Link
                            to={formData.joiningLetterDownloadUrl}
                            className="p-1 w-72 text-sm flex-shrink-0 font-medium text-center text-[15px] rounded-md shadow-md bg-green-300 hover:bg-green-400 active:bg-green-500"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Employee Joining Letter File
                          </Link>
                        ) : (
                          "No document has been uploaded."
                        )}
                      </div> */}
                      <div className="flex flex-col items-center gap-2 border border-slate-400 p-1">
                        <input
                          type="file"
                          id="join_letter"
                          style={{ display: "none" }}
                          onChange={handleFileChange}
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
                                onClick={removeFile}
                                icon={faXmark}
                                className="m-1 p-[1px] w-3 h-3 rounded cursor-pointer bg-red-400 "
                              />
                            </div>
                          </ul>
                        )}
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>

            {/* unit_head_search */}
            <div className="mt-4  mb-4">
              <table className="w-full text-sm font-[500]">
                <tr>
                  <th className="border border-black w-2/4">
                    <label htmlFor="search-input">
                      Approved by (Head of Branch/Unit/Division/Department)
                    </label>
                  </th>
                  <th className="border border-black w-1/4">
                    <label htmlFor="downtime_duration_desc">Status</label>
                  </th>
                  <th className="border border-black w-1/4">
                    <label htmlFor="downtime_duration_desc">Comment</label>
                  </th>
                </tr>

                <tr className="">
                  <td className="border border-black">
                    <div className="flex justify-center ">
                      <div className="relative ">
                        <input
                          type="text"
                          id="search-input"
                          name="search"
                          className="text-[#3b3838] w-80 border-[1px] border-black text-sm p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100 text-center"
                          placeholder="Search Here!"
                          value={searchTerm}
                          onChange={handleInputChange}
                          autoComplete="off"
                          required
                        />
                        {showOptions && (
                          <ul className="absolute  text-center w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
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
                    </div>
                  </td>
                  <td className="border border-black text-center">
                    <strong className="">Pending!</strong>
                  </td>
                  <td className="border border-black text-center">
                    <strong className=""></strong>
                  </td>
                </tr>
              </table>
            </div>
            <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5 text-sm">
              To be completed by respective officials for giving Access
              permission
            </h4>
            <DomainAdminApproval />

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
                  The minimum password length at least 6 characters, combination
                  of uppercase, lowercase, numbers & may include special
                  characters.
                </li>

                <li>The maximum validity period of password will be 45 days</li>

                <li>
                  In case of wrong password for 3 times your Account will be
                  locked.
                </li>
                <li>Same passwords to be used again after at least 4 times.</li>
              </ol>
            </div>
            {/* terms and condition */}

            <div className="flex justify-center items-center mt-4 ">
              {/* <p
                className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
                onClick={handleUpdate}
              >
                Update
              </p> */}
              <input
                type="submit"
                value="Update"
                className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DomainFormEdit;

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
