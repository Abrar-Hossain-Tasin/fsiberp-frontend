import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AllFormsHeader from "../../../component/AllFormsHeader.jsx";
import Dynamictable from "../../../component/Dynamictable.jsx";
import RequestorTwo from "../../../component/OthersCopyComponent/RequestorTwo.jsx";
import Textarea from "../../../component/Textarea.jsx";

import { decryptId } from "../../AdminDashboard/encryption/Encrypted";

import { Base_api, unitHeadSearch } from "../../../utils/api/Base_api.jsx";

import { jwtDecode } from "jwt-decode";
import AdminApprovalStatusEmail from "../../../component/Email/AdminApprovalStatusEmail.jsx";

const EmailAddressCreationFormEdit = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid, emailuser } = decoded;
  const { userId, formId, id } = useParams();

  const [formData, setFormData] = useState({});
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [displayname, setDisplayname] = useState("");

  const [emailadd, setEmailAdd] = useState("");
  const [purpose, setPurpose] = useState("");
  const [action, setAction] = useState("");
  const [grpemail, setGrpEmail] = useState("");
  const [unitheaduserid, setUnitheaduserid] = useState(null);
  const [unitheadusername, setUnitheadusername] = useState("");

  const [eligibleUsers, setEligibleUsers] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const decryptedUserId = decryptId(userId);
        const decryptedFormId = decryptId(formId);
        const decryptedId = decryptId(id);

        const response = await fetch(
          `${Base_api}/api/user/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );
        const data = await response.json();
        setFormData(data);
        formData; // Check the fetched data

        // Populate form fields with existing data
        setUnitheaduserid(data.unitheaduserid);
        setUnitheadusername(data.unitheadusername);
        setSearchTerm(`${data.unitheadusername} - ${data.unitheaduserid}`);
        setDisplayname(data.displayname);
        setEmailAdd(data.emailadd);
        setPurpose(data.purpose);
        setGrpEmail(data.grpemail);
        setAction(data.action);
        setUnitheadusername(data.unitheadusername);

        // Ensure dooraccess is an array
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = {
      displayname,
      emailadd,
      purpose,
      action,
      grpemail,
      unitheaduserid,
      unitheadusername,
    };

    // if (!emailadd.endsWith("@fsiblbd.com")) {
    //   toast.error("Email Address must end with @fsiblbd.com");
    //   return;
    // }

    // if (grpemail && !grpemail.endsWith("@fsiblbd.com")) {
    //   toast.error("Group Email Address must end with @fsiblbd.com");
    //   return;
    // }

    try {
      const decryptedId = decryptId(id);
      const response = await fetch(
        `${Base_api}/api/email/update/${decryptedId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // toast.success("Form Updated successfully!");
        toast.success("Form Updated successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        toast.error("Error submitting form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="m-auto">
      <ToastContainer />
      <form onSubmit={handleUpdate}>
        <div className="bg-white rounded-xl shadow-[0_5px_10px_0px_gray] my-5 py-5 w-[900px] text-[15px]">
          <div className="w-[850px] mx-6">
            <div>
              <AllFormsHeader
                divname="ICT Division"
                formname="E-mail address Creation/Deletion/Modification Form"
                dno="1004"
                vno="3.0"
                edate="08.10.2023"
                fpageno="1"
                lpageno="1"
                rdiv="ICT Division"
                rformname="EACF"
                submitdate={formData.submitdate}
                referenceValue={formData.referencevalue}
              />
              <div className="my-4">
                <Dynamictable userid={decryptId(userId)} />

                <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5 text-sm">
                  To be completed by respective Requestor
                </h4>

                <div>
                  <table className="w-full text-sm">
                    <tr>
                      <th className="border py-2 border-black" colSpan="3">
                        Desired Email Address
                      </th>
                    </tr>
                    <tr>
                      <th className="border py-2 border-black">
                        <label htmlFor="display_name">Display Name</label>
                      </th>
                      <th className="border py-2 border-black">
                        <label htmlFor="email_address">E-mail address</label>
                      </th>
                      <th className="border py-2 border-black">
                        <label htmlFor="purpose">Purpose</label>
                      </th>
                    </tr>
                    <tr>
                      <td className="border py-2 border-black">
                        <Textarea
                          rows="1"
                          width="w-48"
                          placeholder="Display Name"
                          id="displayname"
                          name="displayname"
                          margin_left="ml-5"
                          value={displayname}
                          onTextAreaValue={(e) =>
                            setDisplayname(e.target.value)
                          }
                        />
                      </td>
                      <td className="border py-2 border-black">
                        <Textarea
                          rows="1"
                          width="w-48"
                          placeholder="Email Address"
                          id="emailadd"
                          margin_left="ml-5"
                          value={emailadd}
                          onTextAreaValue={(e) => setEmailAdd(e.target.value)}
                        />
                      </td>
                      <td className="border py-2 border-black">
                        <Textarea
                          rows="1"
                          width="w-48"
                          placeholder="Purpose"
                          id="purpose"
                          margin_left="ml-5"
                          value={purpose}
                          onTextAreaValue={(e) => setPurpose(e.target.value)}
                        />
                      </td>
                    </tr>
                  </table>

                  <div className="mt-4">
                    <label htmlFor="g_e_add" className="font-bold text-sm">
                      Group Email Address
                    </label>{" "}
                    <br />
                    <textarea
                      rows="1"
                      placeholder="Group Email Address"
                      id="g_e_add"
                      name="displayname"
                      value={grpemail}
                      className="text-[#514f4f] border-2 border-[#d2d2e4] p-1 w-full mt-2 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"
                      onChange={(e) => setGrpEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mt-4 mb-4">
                  <table className="w-full text-sm">
                    <tr>
                      <th className="border border-black py-2">
                        <label htmlFor="requesting_unit">Action</label>
                      </th>
                      <th className="border border-black">
                        <input
                          type="radio"
                          id="create"
                          value="Create"
                          name="action"
                          checked={action === "Create"}
                          onChange={(e) => setAction(e.target.value)}
                          disabled={emailuser === "1"}
                        />
                        <label htmlFor="create" className="ml-1">
                          Create
                        </label>

                        <input
                          type="radio"
                          id="modify"
                          value="Modify"
                          name="action"
                          checked={action === "Modify"}
                          className="ml-2"
                          onChange={(e) => setAction(e.target.value)}
                        />
                        <label htmlFor="modify" className="ml-1">
                          Modify
                        </label>

                        <input
                          type="radio"
                          id="delete"
                          value="Delete"
                          name="action"
                          checked={action === "Delete"}
                          className="ml-2"
                          onChange={(e) => setAction(e.target.value)}
                        />
                        <label htmlFor="delete" className="ml-1">
                          Delete
                        </label>
                      </th>
                    </tr>
                  </table>
                </div>

                <div>
                  <div className="mt-4  mb-4">
                    <table className="w-full text-sm">
                      <tr>
                        <th className="border border-black  p-1 w-2/4">
                          <label htmlFor="requesting_unit">
                            Approved by (Head of
                            Branch/Unit/Division/Department)
                          </label>
                        </th>
                        <th className="border border-black  p-1 w-1/4">
                          <label htmlFor="downtime_duration_desc">Status</label>
                        </th>
                        <th className="border border-black  p-1 w-1/4">
                          <label htmlFor="downtime_duration_desc">
                            Comment
                          </label>
                        </th>
                      </tr>

                      <tr className="">
                        <td className="border border-black py-1">
                          <div className="flex justify-center ">
                            <div className="relative ">
                              <div className="relative">
                                <input
                                  autoComplete="off"
                                  type="text"
                                  id="search-input"
                                  name="search"
                                  className="text-[#3b3838] border-[1px] border-black text-sm p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-80 placeholder-opacity-100 text-center"
                                  placeholder="Search Here!"
                                  value={searchTerm}
                                  onChange={handleInputChange}
                                  required
                                />
                                {showOptions && (
                                  <ul className="absolute w-full text-center font-[500] bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
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
                          </div>
                        </td>
                        <td className="border border-black text-center">
                          <strong
                            className={
                              formData.unitheadstatus === "Accepted"
                                ? "text-green-600" // Tailwind CSS class for green text
                                : formData.unitheadstatus === "Rejected"
                                ? "text-red-500" // Tailwind CSS class for red text
                                : ""
                            }
                          >
                            {formData.unitheadstatus}
                          </strong>
                        </td>
                        <td className="border border-black text-center">
                          <strong className="">{formData.unitheadcmnt}</strong>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <RequestorTwo text="To be completed by respective officials for giving Access permission" />

                <div>
                  <table className="w-full text-sm">
                    <tr className="text-sm">
                      <th
                        className="border px-4 py-2 border-black "
                        colSpan="2"
                      >
                        Confirmed E-mail Address
                      </th>
                    </tr>
                    <tr className="">
                      {/* <td className="border  border-black px-5">
                    <input
                      type="radio"
                      id="create_confirm"
                      name="action_confirm"
                      value="Create"
                      // checked={acpurpose.includes(" Main Door")}
                      // onChange={handleacpurposeChange}
                    />
                    <label htmlFor="create_confirm" className="ml-1">
                      Create
                    </label>
                    <br />

                    <input
                      type="radio"
                      id="modify_confirm"
                      name="action_confirm"
                      value="Modify"
                      // checked={acpurpose.includes("Cash")}
                      // onChange={handleacpurposeChange}
                    />
                    <label htmlFor="modify_confirm" className="ml-1">
                      Modify
                    </label>

                    <br />

                    <input
                      type="radio"
                      id="delete_confirm"
                      name="action_confirm"
                      value="Delete"
                      // checked={acpurpose.includes("Vault")}
                      // onChange={handleacpurposeChange}
                    />
                    <label htmlFor="delete_confirm" className="ml-1">
                      Delete
                    </label>
                    <br />
                  </td> */}

                      <td className="border  border-black px-5 w-1/2">
                        Confirmed E-mail Address :{" "}
                        <strong>Creation/Deletion/Modification</strong>
                      </td>
                      <td className="border px-4 py-2 border-black w-1/2">
                        <Textarea
                          width="w-72"
                          placeholder="Implementer will write here!"
                          rows="1"
                          margin_left="ml-10"
                          disabled
                        />
                      </td>
                    </tr>

                    <tr className="">
                      <td className="border  border-black px-5">
                        <label htmlFor="group">
                          <strong>Group Allotted:</strong>
                        </label>
                      </td>
                      <td className="border px-4 py-2 border-black">
                        <Textarea
                          width="w-72"
                          placeholder="Implementer will write here!"
                          rows="1"
                          margin_left="ml-10"
                          id="group"
                          disabled
                        />
                      </td>
                    </tr>
                  </table>
                </div>

                <div className="mb-5">
                  {/* <Dynamictable4
                userid={userid}
                fname="Recommended by Head of ISRM Unit/CISO"
                sname="Approval by HOICTD/CTO/CIO/CITO"
                tname="Recommended by (In-Charge DC/DR)"
                iby="Implemented by"
                tnameperson="Working"
                ibynameperson="Working"
                tnamestatus="Working"
                ibypersonstatus="Working"
              /> */}
                  <AdminApprovalStatusEmail />
                </div>
              </div>

              <div className="flex justify-center">
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
    </div>
  );
};

export default EmailAddressCreationFormEdit;
