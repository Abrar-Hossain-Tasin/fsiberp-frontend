import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import AllFormsHeader from "../../../component/AllFormsHeader.jsx";
import Dynamictable from "../../../component/Dynamictable.jsx";
import RequestorTwo from "../../../component/OthersCopyComponent/RequestorTwo.jsx";
import Textarea from "../../../component/Textarea.jsx";

import { decryptId } from "../../AdminDashboard/encryption/Encrypted";

import { jwtDecode } from "jwt-decode";
import AdminApprovalStatusEmail from "../../../component/Email/AdminApprovalStatusEmail.jsx";
import { Base_api } from "../../../utils/api/Base_api.jsx";
import AdminApproval from "../../AdminDashboard/AdminApproval.jsx";

const EmailAddressCreationFormView = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid, user_roleid, unit } = decoded;

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

  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");

  const [comment2, setComment2] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [grpallot, setGrpallot] = useState("");
  const [confemail, setConfemail] = useState("");

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
        // (formData); // Check the fetched data

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
        setComment2(data.grpallot);
        setComment(data.confemail);

        // Ensure dooraccess is an array
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid, formId, id]);

  return (
    <div className="m-auto">
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
                        //   onTextAreaValue={(e) => setDisplayname(e.target.value)}
                        disabled
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
                        //   onTextAreaValue={(e) => setEmailAdd(e.target.value)}
                        disabled
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
                        //   onTextAreaValue={(e) => setPurpose(e.target.value)}
                        disabled
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
                    className="mt-2 text-[#3b3838] border-[1px] border-black text-sm p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-[1rem] placeholder-opacity-100"
                    //   onChange={(e) => setGrpEmail(e.target.value)}
                    disabled
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
                        name="action"
                        checked={action === "Create"}
                        // onChange={(e) => setAction(e.target.value)}
                      />
                      <label htmlFor="create" className="ml-1">
                        Create
                      </label>

                      <input
                        type="radio"
                        id="modify"
                        name="action"
                        checked={action === "Modify"}
                        className="ml-2"
                        // onChange={(e) => setAction(e.target.value)}
                      />
                      <label htmlFor="modify" className="ml-1">
                        Modify
                      </label>

                      <input
                        type="radio"
                        id="delete"
                        name="action"
                        checked={action === "Delete"}
                        className="ml-2"
                        // onChange={(e) => setAction(e.target.value)}
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
                      <th className="border border-black py-2 w-2/4">
                        <label htmlFor="requesting_unit">
                          Approved by (Head of Branch/Unit/Division/Department)
                        </label>
                      </th>
                      <th className="border border-black py-2 w-1/4">
                        <label htmlFor="downtime_duration_desc">Status</label>
                      </th>
                      <th className="border border-black py-2 w-1/4">
                        <label htmlFor="downtime_duration_desc">Comment</label>
                      </th>
                    </tr>

                    <tr className="">
                      <td className="border border-black py-1">
                        <div className="flex justify-center ">
                          <div className="relative ">
                            <input
                              autoComplete="off"
                              type="text"
                              id="search-input"
                              name="search"
                              className="text-[#3b3838] border-[1px] border-black text-sm p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-80 placeholder-opacity-100 text-center"
                              placeholder="Search Here!"
                              value={searchTerm}
                              // onChange={handleInputChange}
                              disabled
                            />
                          </div>
                        </div>
                      </td>
                      <td className="border border-black text-center">
                        <strong
                          className={
                            formData.unitheadstatus === "Accepted"
                              ? "text-green-600" // Tailwind CSS class for green text
                              : formData.unitheadstatus === "Rejected"
                              ? "text-red-600" // Tailwind CSS class for red text
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
                    <th className="border px-4 py-2 border-black " colSpan="2">
                      Confirmed E-mail Address
                    </th>
                  </tr>
                  <tr className="">
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
                        disabled={
                          user_roleid === 3 &&
                          unit === 11 &&
                          formData.implementedbystatus === "Pending"
                            ? false
                            : true
                        }
                        value={user_roleid === 3 ? comment : ""}
                        onTextAreaValue={(e) => setComment(e.target.value)}
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
                        disabled={
                          user_roleid === 3 &&
                          unit === 11 &&
                          formData.implementedbystatus === "Pending"
                            ? false
                            : true
                        }
                        value={user_roleid === 3 ? comment2 : ""}
                        onTextAreaValue={(e) => setComment2(e.target.value)}
                      />
                    </td>
                  </tr>
                </table>
              </div>
              <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md my-3">
                To be completed by Admin
              </h4>
              <div className="mb-5">
                <AdminApprovalStatusEmail />
              </div>
              <AdminApproval
                status={status}
                setStatus={setStatus}
                comment={comment}
                setComment={setComment}
                comment2={comment2}
                setComment2={setComment2}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailAddressCreationFormView;
