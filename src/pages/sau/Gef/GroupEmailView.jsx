import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AllFormsHeader from "../../../component/AllFormsHeader.jsx";
import Dynamictable from "../../../component/Dynamictable.jsx";
import Requestor from "../../../component/Requestor.jsx";
import AdminApprovalGroupEmail from "../../../component/Sau/GroupEmail/AdminApproval.jsx";
import { Base_api } from "../../../utils/api/Base_api.jsx";
import AdminApproval from "../../AdminDashboard/AdminApproval";
import { decryptId } from "../../AdminDashboard/encryption/Encrypted";
import UserSearchViewEdit from "./UserSearchViewEdit.jsx";
const GroupEmailView = ({ type }) => {
  const { userId, formId, id } = useParams();
  const [formData, setformData] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [grpMemberUserId, setGrpMemberUserId] = useState([]);

  const [grpname, setGroupName] = useState("");
  const [grpowner, setGrpowner] = useState("");
  const [purpose, setPurpose] = useState("");
  const [action, setAction] = useState("");

  const [members, setMembers] = useState([]);
  const [emails, setEmails] = useState([]);

  const [unitheaduserid, setUnitheaduserid] = useState(null);
  const [unitheadusername, setUnitheadusername] = useState("");

  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decryptedUserId = decryptId(userId);
        const decryptedFormId = decryptId(formId);
        const decryptedId = decryptId(id);
        decryptedUserId, decryptedFormId, decryptedId;

        const response = await fetch(
          `${Base_api}/api/user/viewform/${decryptedUserId}/${decryptedFormId}/${decryptedId}`
        );
        const data = await response.json();
        setformData(data);
        data;

        setGroupName(data.grpname || "");
        setGrpowner(data.grpowner || "");
        setPurpose(data.purpose || "");
        setAction(data.action || "");

        setMembers(data.grpmember || []);
        setEmails(data.mememail || []);

        setUnitheaduserid(data.unitheaduserid);
        setUnitheadusername(data.unitheadusername);
        setSearchTerm(`${data.unitheadusername} - ${data.unitheaduserid}`);
        setGrpMemberUserId(data.grpmember);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, formId, id]);
  return (
    <div>
      <div className="bg-white rounded-xl shadow-[0_5px_10px_0px_gray] my-5 py-5 w-[900px] text-[15px]">
        <div className="w-[850px] mx-6">
          <AllFormsHeader
            divname="ICT Division"
            formname="Group E-mail Form"
            dno="1005"
            vno="3.0"
            edate="08.10.2023"
            fpageno="1"
            lpageno="1"
            rdiv="ICT Division"
            rformname="GECF"
            submitdate={formData.submitdate}
            referenceValue={formData.referencevalue}
          />

          <div className="mt-4">
            <Dynamictable userid={decryptId(userId)} />
          </div>

          <Requestor />

          <div>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="border py-2 border-black">
                    <label htmlFor="group_name">Group Name</label>
                  </th>
                  <th className="border py-2 border-black">
                    <label htmlFor="owner">Owner/Custodian of the Group</label>
                  </th>
                  <th className="border py-2 border-black">
                    <label htmlFor="purpose">Purpose of the Group</label>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border py-2 border-black">
                    <div className="flex justify-center text-sm">
                      <input
                        type="text"
                        placeholder="Group Name"
                        id="group_name"
                        className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-[90%] text-sm placeholder-opacity-100 text-center"
                        value={grpname}
                        readOnly
                        // onChange={(e) => setGroupName(e.target.value)}
                      />
                    </div>
                  </td>
                  <td className="border py-2 border-black">
                    <div className="flex justify-center">
                      <input
                        type="text"
                        placeholder="Owner/Custodian..."
                        id="owner"
                        value={grpowner}
                        readOnly
                        // onChange={(e) => setGrpowner(e.target.value)}
                        className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-[90%] text-sm placeholder-opacity-100 text-center"
                      />
                    </div>
                  </td>
                  <td className="border py-2 border-black">
                    <div className="flex justify-center">
                      <input
                        type="text"
                        placeholder="Purpose"
                        id="purpose"
                        value={purpose}
                        readOnly
                        // onChange={(e) => setPurpose(e.target.value)}
                        className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-[90%] text-sm placeholder-opacity-100 text-center"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* option_Selected */}
          <div className="my-5 text-sm">
            <table className="w-full text-sm font-[500]">
              <thead>
                <tr className="text-sm">
                  <th className="border px-4 py-2 border-black">
                    Please tick (√) the options
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black px-5">
                    <input
                      type="radio"
                      id="create_confirm"
                      name="action_confirm"
                      value="Create"
                      defaultChecked={action === "Create"} // Reflect current state
                      // onChange={(e) => setAction(e.target.value)} // Update action state
                    />
                    <label htmlFor="create_confirm" className="ml-1">
                      Create
                    </label>
                    <br />
                    <input
                      type="radio"
                      id="delete_confirm"
                      name="action_confirm"
                      value="Delete"
                      defaultChecked={action === "Delete"} // Reflect current state
                      // onChange={(e) => setAction(e.target.value)}
                    />
                    <label htmlFor="delete_confirm" className="ml-1">
                      Delete
                    </label>
                    <br />
                    <input
                      type="radio"
                      id="add_member"
                      name="action_confirm"
                      value="Add Member"
                      defaultChecked={action === "Add Member"} // Reflect current state
                      // onChange={(e) => setAction(e.target.value)} // Update action state
                    />
                    <label htmlFor="add_member" className="ml-1">
                      Add member
                    </label>
                    <br />
                    <input
                      type="radio"
                      id="delete_member"
                      name="action_confirm"
                      value="Delete Member"
                      defaultChecked={action === "Delete Member"} // Reflect current state
                      // onChange={(e) => setAction(e.target.value)} // Update action state
                    />
                    <label htmlFor="delete_member" className="ml-1">
                      Delete member
                    </label>
                  </td>
                  {/* <td className="border px-4 py-2 border-black">
                  <Textarea
                    width="w-3/4"
                    placeholder="Group Members Name & Email Address"
                    rows="1"
                    margin_left="ml-10"
                  />
                </td> */}
                </tr>
              </tbody>
            </table>
          </div>
          {/* option_Selected_End */}

          {/* add_member_email */}
          <div>
            <h4 className="text-center  text-sm font-bold bg-gray-300 p-1 rounded-md mt-3">
              Group members name and email address
            </h4>

            <UserSearchViewEdit
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              grpMemberUserId={grpMemberUserId}
              setGrpMemberUserId={setGrpMemberUserId}
              type={type}
              userId={decryptId(userId)}
            />
          </div>
          {/* add_member_email_end */}

          {/* unit_head_search */}
          <div>
            <div className="mt-4  mb-4 text-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="border border-black text-sm">
                      <label htmlFor="requesting_unit">
                        Approved by (Head of Branch/Unit/Division/Department)
                      </label>
                    </th>
                    <th className="border border-black">
                      <label htmlFor="downtime_duration_desc">Status </label>
                    </th>
                    <th className="border border-black">
                      <label htmlFor="downtime_duration_desc">Comment</label>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td className="border border-black w-[50%]">
                      <div className="flex justify-center ">
                        <div className="relative ">
                          <input
                            autoComplete="off"
                            type="text"
                            id="search-input"
                            name="search"
                            className="text-[#3b3838] border-[1px] border-black p-1 my-2 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-80 text-sm placeholder-opacity-100 text-center"
                            placeholder="Search Here!"
                            value={searchTerm}
                            readOnly
                            // onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="border border-black text-center w-[25%]">
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
                    <td className="border border-black text-center w-[25%]">
                      <strong className="">{formData.unitheadcmnt}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* unit_head_search */}

          <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5 text-sm">
            To be completed by respective officials for giving Access permission
          </h4>

          <AdminApprovalGroupEmail userid={decryptId(userId)} />

          {/* Admin_Approve */}
          <div className="mt-5">
            <AdminApproval
              status={status}
              setStatus={setStatus}
              comment={comment}
              setComment={setComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupEmailView;
