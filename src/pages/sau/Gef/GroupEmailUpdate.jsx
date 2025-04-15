import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import AllFormsHeader from "../../../component/AllFormsHeader.jsx";
import Dynamictable from "../../../component/Dynamictable.jsx";
import Requestor from "../../../component/Requestor.jsx";
import AdminApprovalGroupEmail from "../../../component/Sau/GroupEmail/AdminApproval.jsx";
import { Base_api, unitHeadSearch } from "../../../utils/api/Base_api.jsx";
import { decryptId } from "../../AdminDashboard/encryption/Encrypted";

import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import UserSearchViewEdit from "./UserSearchViewEdit.jsx";

const GroupEmailUpdate = ({ type }) => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
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

  const [unitheaduserid, setUnitheaduserid] = useState("");
  const [unitheadusername, setUnitheadusername] = useState("");

  const [filteredOptions, setFilteredOptions] = useState([]);
  const [eligibleUsers, setEligibleUsers] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const navigate = useNavigate();

  const addMember = () => {
    setMembers([...members, ""]); // Add empty string for a new member
    setEmails([...emails, ""]); // Add empty string for a new email
  };

  const handleMemberChange = (index, field, value) => {
    if (field === "name") {
      const updatedMembers = [...members];
      updatedMembers[index] = value;
      setMembers(updatedMembers);
    } else if (field === "email") {
      const updatedEmails = [...emails];
      updatedEmails[index] = value;
      setEmails(updatedEmails);
    }
  };

  const removeMember = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    const updatedEmails = emails.filter((_, i) => i !== index);
    setMembers(updatedMembers);
    setEmails(updatedEmails);
  };

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
    try {
      const decryptedId = decryptId(id);
      const updateData = {
        grpname,
        grpowner,
        purpose,
        action,
        grpmember: grpMemberUserId,
        mememail: emails,
        unitheaduserid,
        unitheadusername,
      };
      updateData;

      const response = await fetch(
        `${Base_api}/api/grp_email/update/${decryptedId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );
      response;
      if (response.ok) {
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
        // await fetchData(); // Fetch the latest data after update
      } else {
        toast.error("Failed to update form.", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error updating form:", error);
      toast.error("An error occurred during update.", { autoClose: 2000 });
    }
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <ToastContainer />
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
                      <label htmlFor="owner">
                        Owner/Custodian of the Group
                      </label>
                    </th>
                    <th className="border py-2 border-black">
                      <label htmlFor="purpose">Purpose of the Group</label>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border py-2 border-black">
                      <div className="flex justify-center">
                        <input
                          type="text"
                          placeholder="Group Name"
                          id="group_name"
                          value={grpname}
                          onChange={(e) => setGroupName(e.target.value)}
                          className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-[90%] text-sm placeholder-opacity-100 text-center"
                          required
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
                          onChange={(e) => setGrpowner(e.target.value)}
                          className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-[90%] text-sm placeholder-opacity-100 text-center"
                          required
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
                          onChange={(e) => setPurpose(e.target.value)}
                          className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-[90%] text-sm placeholder-opacity-100 text-center"
                          required
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
                    {/* <th className="border px-4 py-2 border-black">
        Group members name and e-mail address
      </th> */}
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
                        checked={action === "Create"} // Reflect current state
                        onChange={(e) => setAction(e.target.value)} // Update action state
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
                        checked={action === "Delete"} // Reflect current state
                        onChange={(e) => setAction(e.target.value)} // Update action state
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
                        checked={action === "Add Member"} // Reflect current state
                        onChange={(e) => setAction(e.target.value)} // Update action state
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
                        checked={action === "Delete Member"} // Reflect current state
                        onChange={(e) => setAction(e.target.value)} // Update action state
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
            <div className="mt-4 mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="border border-black p-2">
                      <label htmlFor="requesting_unit">
                        Approved by (Unit head/ Department head/ Division head)
                      </label>
                    </th>
                    <th className="border border-black">
                      <label htmlFor="downtime_duration_desc">Status</label>
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
                            type="text"
                            id="search-input"
                            name="search"
                            // className="text-[#514f4f] border-[1px] border-black text-center w-80 p-1  my-1 rounded-sm font-semibold placeholder-[#514f4f] focus:outline-[#007935]"

                            className="text-[#3b3838]  text-sm border-[1px] border-black p-1 my-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-80 placeholder-opacity-100 text-center "
                            placeholder="Search Here!"
                            value={searchTerm}
                            onChange={handleInputChange}
                            autoComplete="off"
                            required
                          />
                          {showOptions && (
                            <ul className="absolute w-full text-sm font-[500] text-center bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
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
                      <strong className="">{formData.unitheadstatus}</strong>
                    </td>
                    <td className="border border-black text-center w-[25%]">
                      <strong className=""></strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* unit_head_search */}

            <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5 text-sm">
              To be completed by respective officials for giving Access
              permission
            </h4>

            <AdminApprovalGroupEmail userid={decryptId(userId)} />

            {/* Add a button to trigger the update */}
            <div className="flex justify-center">
              <input
                type="submit"
                value="Update"
                className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
              />
            </div>

            {/* The rest of your form remains unchanged */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default GroupEmailUpdate;
