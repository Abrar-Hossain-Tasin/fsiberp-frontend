import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminApproveText from "../../../component/AdminApproveText.jsx";
import AllFormsHeader from "../../../component/AllFormsHeader.jsx";
import Dynamictable from "../../../component/Dynamictable.jsx";
import AdminApprovalGroupEmail from "../../../component/Sau/GroupEmail/AdminApproval.jsx";
import { Base_api, unitHeadSearch } from "../../../utils/api/Base_api.jsx";

import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import UserSearch from "./UserSearch.jsx";

const Gef = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  const [searchTerm, setSearchTerm] = useState("");
  const [grpMemberUserId, setGrpMemberUserId] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [empList, setEmpList] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [members, setMembers] = useState([{ name: "", email: "" }]);
  const [groupName, setGroupName] = useState("");
  const [grpowner, setGrpowner] = useState("");
  const [purpose, setPurpose] = useState("");
  const [action, setAction] = useState("");
  const [unitheaduserid, setUnitheaduserid] = useState(null);
  const [unitheadusername, setUnitheadusername] = useState("");

  // Group members name and email address

  const [name, setName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [employeeData, setEmployeeData] = useState({
    id: "",
    email: "",
  });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/incidentreport/emplist/${userid}`
        );
        const data = await response.json();
        setEmployees(data);
        data;
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployees();
  }, [userid]);

  const handleInputChange2 = (e) => {
    const inputValue = e.target.value;
    setName(inputValue);

    if (inputValue) {
      const filteredSuggestions = employees.filter(
        (emp) =>
          emp.username &&
          emp.username.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (emp) => {
    setName(emp.username); // Set the name based on the username from API
    setEmployeeData({
      id: emp.userid, // Use userid for the employee ID
      email: emp.email,
    });
    setSuggestions([]); // Clear suggestions after selection
  };

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
    setUnitheaduserid(userid);
    setUnitheadusername(username);
  };

  const addMember = () => {
    setMembers([...members, { name: "", email: "" }]);
  };

  const removeMember = (index) => {
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
  };

  const handleMemberChange = (index, field, value) => {
    const newMembers = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
  };

  const validateEmail = (email) => {
    return email.endsWith("@fsiblbd.com");
  };

  // const handleEmailBlur = (index) => {
  //   const email = members[index].email;
  //   if (email && !validateEmail(email)) {
  //     toast.error("Email must end with @fsiblbd.com", { autoClose: 2000 });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const grpmember = members.map((member) => member.name);
    const mememail = members.map((member) => member.email);

    // Validate all emails before submission
    // for (const member of members) {
    //   if (!validateEmail(member.email)) {
    //     toast.error("All emails must end with @fsiblbd.com", {
    //       autoClose: 2000,
    //     });
    //     return;
    //   }
    // }

    const payload = {
      grpmember: grpMemberUserId,
      mememail,
      grpname: groupName,
      grpowner,
      purpose,
      action,
      unitheaduserid,
      unitheadusername,
    };

    try {
      const response = await fetch(`${Base_api}/api/grp_email/save/${userid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Form submitted successfully!", {
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
        toast.error("Failed to Submit form.", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="m-auto">
      <ToastContainer />
      <div className="bg-white rounded-xl shadow-[0_5px_10px_0px_gray] my-5 py-5 w-[900px] text-[15px]">
        <form onSubmit={handleSubmit}>
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
            />

            <div className="mt-4 text-sm   w-[850px]">
              <Dynamictable userid={userid} />
              <h4 className="text-center  text-sm font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
                To be completed by respective Requestor
              </h4>

              <div>
                <table className="w-full">
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
                            value={groupName}
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

              <div className="my-5">
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
                          onChange={(e) => setAction(e.target.value)}
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
                          onChange={(e) => setAction(e.target.value)}
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
                          onChange={(e) => setAction(e.target.value)}
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
                          onChange={(e) => setAction(e.target.value)}
                        />
                        <label htmlFor="delete_member" className="ml-1">
                          Delete member
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h4 className="text-center  text-sm font-bold bg-gray-300 p-1 rounded-md mt-3">
                  Group members name and email address
                </h4>
                <UserSearch
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  grpMemberUserId={grpMemberUserId}
                  setGrpMemberUserId={setGrpMemberUserId}
                />
              </div>

              <div className="mt-4 mb-4 font-[550]">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="border border-black p-2">
                        <label htmlFor="requesting_unit">
                          Approved by (Unit head/ Department head/ Division
                          head)
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

                              className="text-[#3b3838] border-[1px] border-black p-1 my-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-80 placeholder-opacity-100 text-center "
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
                    </tr>
                  </tbody>
                </table>
              </div>
              <AdminApproveText />

              <div className="mb-5">
                <div className=" overflow-x-auto font-[500] text-[#1b3c1c] bg-slate-200/95 ">
                  <table className="min-w-full border text-sm">
                    <thead className="text-sm">
                      <tr>
                        <th className="py-2 px-4 border border-black">
                          Recommended by Head of ISRM Unit/CISO
                        </th>
                        <th className="py-2 px-4 border border-black">
                          Approval by HOICTD/CTO/CIO/CITO
                        </th>
                        <th className="py-2 px-4 border border-black">
                          Implementer's Unit Head
                        </th>
                        <th className="py-2 px-4 border border-black">
                          Implemented By
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-center">
                      <tr>
                        <td className="py-2 px-4 border border-black">
                          {"Md. Mostafejur Rahman"}
                        </td>
                        <td className="py-2 px-4 border border-black">
                          {"Md. Mushfiqur Rahman"}
                        </td>
                        <td className="py-2 px-4 border border-black">
                          {"Mohammad Mamunur Rashid"}
                        </td>
                        <td className="py-2 px-4 border border-black">
                          {"System Administration Unit"}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border border-black">
                          Status: <strong>{"Pending"}</strong>
                        </td>
                        <td className="py-2 px-4 border border-black">
                          Status: <strong>{"Pending"}</strong>
                        </td>
                        <td className="py-2 px-4 border border-black">
                          Status: <strong>{"Pending"}</strong>
                        </td>
                        <td className="py-2 px-4 border border-black">
                          Status: <strong>{"Pending"}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border border-black">
                          {"Comment:"}
                        </td>
                        <td className="py-2 px-4 border border-black">
                          {"Comment:"}
                        </td>
                        <td className="py-2 px-4 border border-black">
                          {"Comment:"}
                        </td>
                        <td className="py-2 px-4 border border-black"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-center">
                <input
                  type="submit"
                  value="Submit"
                  className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Gef;
