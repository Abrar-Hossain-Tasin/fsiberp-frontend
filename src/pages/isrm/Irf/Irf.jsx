import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AllFormsHeader from "../../../component/AllFormsHeader.jsx";
import TitlewithTextarea from "../../../component/CRF/TitlewithTextarea.jsx";

import { faPaperclip, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import ImpactPotentialImpactSubmit from "../../../component/Isrm/Irf/ImpactPotentialImpactSubmit.jsx";
import IncidentTypeCheckboxesSubmit from "../../../component/Isrm/Irf/IncidentTypeCheckboxesSubmit.jsx";
import { Base_api, unitHeadSearch } from "../../../utils/api/Base_api.jsx";
import HandleBy from "./HandleBy.jsx";
import Witness from "./Witness.jsx";

const Irf = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { userid } = decoded;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [contactno, setContactno] = useState("");
  const [email, setEmail] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [currentUserPhone, setCurrentUserPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [submitDate, setSubmitDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [unitheaduserid, setUnitheaduserid] = useState("");
  const [unitheadusername, setUnitheadusername] = useState("");
  const [eligibleUsers, setEligibleUsers] = useState([]);
  const [userData, setUserData] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userList, setUserList] = useState([]);

  // Initialize as an array

  const [occurredDate, setOccurredDate] = useState("");
  const [occurredTime, setOccurredTime] = useState("");
  const [resolvedDate, setResolvedDate] = useState("");
  const [resolvedTime, setResolvedTime] = useState("00:00:00");
  const [priority, setPriority] = useState("");
  const [locationOfIncident, setLocationOfIncident] = useState("");
  const [incidentReportedBy, setIncidentReportedBy] = useState("");
  const [rootCauseOfIncident, setRootCauseOfIncident] = useState("");
  const [typeOfIncident, setTypeOfIncident] = useState([]);
  const [potentialImpact, setPotentialImpact] = useState([]);
  const [nameOfTheIncident, setNameOfTheIncident] = useState("");
  const [potentialImpactDescription, setPotentialImpactDescription] =
    useState("");
  const [actionTaken, setActionTaken] = useState("");
  const [prevention, setPrevention] = useState("");
  const [proposedSolution, setProposedSolution] = useState("");
  const [lessonLearned, setLessonLearned] = useState("");
  const [witnessPfIds, setWitnessPfIds] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [tempStatus, setTempStatus] = useState("");
  const [witness, setWitness] = useState([]);

  const [incidentHandledBy, setIncidentHandledBy] = useState("");
  const [handleByUserId, setHandleByUserId] = useState([]);
  const [handleWitness, setHandleWitness] = useState([]);

  const [incidentHandlingDocuments, setIncidentHandlingDocuments] =
    useState(null);
  const [impactAnalysisDocument, setImpactAnalysisDocument] = useState(null);
  const [downtimeDocumentation, setDowntimeDocumentation] = useState(null);
  const [rootCauseAnalysisDocuments, setRootCauseAnalysisDocuments] =
    useState(null);
  const [workCompletionDocument, setWorkCompletionDocument] = useState(null);

  const [downtimeDocumentationName, setDowntimeDocumentationName] =
    useState("");
  const [impactAnalysisDocumentName, setImpactAnalysisDocumentName] =
    useState("");
  const [incidentHandlingDocumentsName, setIncidentHandlingDocumentsName] =
    useState("");
  const [rootCauseAnalysisDocumentsName, setRootCauseAnalysisDocumentsName] =
    useState("");
  const [workCompletionDocumentName, setWorkCompletionDocumentName] =
    useState("");

  const [showClock, setShowClock] = useState(false);

  const handleTimeChange = (time) => {
    setOccurredTime(time);
    setShowClock(false); // Hide the clock after selecting time
  };

  const handleWitnessChange = (fetchedData) => {
    setWitness(fetchedData);
    ({ fetchedData });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    file;
    event.target.name;
    if (event.target.name === "incidentHandlingDocuments") {
      setIncidentHandlingDocuments(file ? file : "");
      setIncidentHandlingDocumentsName(file.name);
      file;
    } else if (event.target.name === "impactAnalysisDocument") {
      setImpactAnalysisDocument(file ? file : "");
      setImpactAnalysisDocumentName(file.name);
      file;
    } else if (event.target.name === "downtimeDocumentation") {
      setDowntimeDocumentation(file ? file : "");
      setDowntimeDocumentationName(file.name);
    } else if (event.target.name === "rootCauseAnalysisDocuments") {
      setRootCauseAnalysisDocuments(file ? file : "");
      setRootCauseAnalysisDocumentsName(file.name);
    } else if (event.target.name === "workCompletionDocument") {
      setWorkCompletionDocument(file ? file : "");
      setWorkCompletionDocumentName(file.name);
    }
  };

  const removeFile = (file) => {
    file;
    if (file === "incidentHandlingDocuments") {
      setIncidentHandlingDocuments("");
      setIncidentHandlingDocumentsName("");
    } else if (file === "impactAnalysisDocument") {
      setImpactAnalysisDocument("");
      setImpactAnalysisDocumentName("");
    } else if (file === "downtimeDocumentation") {
      setDowntimeDocumentation("");
      setDowntimeDocumentationName("");
    } else if (file === "rootCauseAnalysisDocuments") {
      setRootCauseAnalysisDocuments("");
      setRootCauseAnalysisDocumentsName("");
    } else if (file === "workCompletionDocument") {
      setWorkCompletionDocument("");
      setWorkCompletionDocumentName("");
    }
  };

  // incidentreport emplist start

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/incidentreport/emplist/${userid}`
        );
        const data = await response.json();
        setUserList(data); // Assuming data is an array of user objects

        // Function to find a user by userid
        const findUserById = (targetUserId) => {
          const user = userList.find((user) => user.userid === targetUserId);
          return user;
        };

        // Example usage
        const userIdToFind = incidentReportedBy; // replace with the userId you're looking for
        const foundUser = findUserById(userIdToFind);
        // ({ foundUser });
        setSearchTerm(foundUser?.username);

        setEmail(foundUser?.email);
        setContactno(foundUser?.contactno);
        // (data);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchUserList();
  }, [userid, incidentReportedBy]);
  useEffect(() => {
    // Filter and sort users based on the search term when it changes
    const results = userList
      .filter((user) => user.username.toLowerCase().includes(searchTerm))
      .sort((a, b) => a.username.localeCompare(b.username)); // Sort in ascending order
    setFilteredUsers(results);
  }, [searchTerm, userList]);

  const handleUserClick = (user) => {
    setSearchTerm(user.username);
    setUserData(user); // Set the selected user data
    // ("Selected User Data:", user); // Optional: Log the selected user data
  };
  // incidentreport emplist end

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const formData = new FormData(e.target);

      // Append selected incidents to FormData
      typeOfIncident.forEach((incident) => {
        formData.append("typeOfIncident[]", incident); // Use brackets for arrays
      });

      potentialImpact.forEach((impact) => {
        formData.append("potentialImpact[]", impact);
      });

      // Combine date and time into a single datetime string
      if (occurredDate && occurredTime) {
        const incidentOccurred = `${occurredDate} ${occurredTime}`;
        formData.append("incidentOccurred", incidentOccurred);
      }

      if (resolvedDate && resolvedTime) {
        const incidentResolved = `${resolvedDate} ${resolvedTime}`;
        formData.append("incidentResolved", incidentResolved);
      }

      // Check if priority is already appended to avoid duplicates
      if (!formData.has("priority")) {
        formData.append("priority", priority);
      }

      if (employeeData.id) {
        formData.append("incidentReportedBy", employeeData.id); // Use employee ID
      }

      // Add other data to FormData
      formData.append("workCompletionDocument", workCompletionDocument);
      formData.append("rootCauseAnalysisDocuments", rootCauseAnalysisDocuments);
      formData.append("downtimeDocumentation", downtimeDocumentation);
      formData.append("impactAnalysisDocument", impactAnalysisDocument);
      formData.append("incidentHandlingDocuments", incidentHandlingDocuments);
      formData.append("locationOfIncident", locationOfIncident);
      formData.append("rootCauseOfIncident", rootCauseOfIncident);

      formData.append("nameOfTheIncident", nameOfTheIncident);
      formData.append("potentialImpactDescription", potentialImpactDescription);
      formData.append("actionTaken", actionTaken);
      formData.append("prevention", prevention);
      formData.append("proposedSolution", proposedSolution);
      formData.append("lessonLearned", lessonLearned);
      // formData.append("incidentHandledBy", incidentHandledBy);
      formData.append("unitheaduserid", unitheaduserid);
      formData.append("unitheadusername", unitheadusername);

      // formData.append("witness", witness);
      formData.append("witness", handleWitness);
      formData.append("incidentHandledBy", handleByUserId);

      // const employeeArray = Object.values(selectedEmployees);
      // const pfIds = employeeArray
      //   .filter((witness) => witness.id)
      //   .map((witness) => witness.id);

      // // Append each ID to FormData as a separate entry
      // pfIds.forEach((id) => {
      //   formData.append("witness[]", id); // Use witness[] to indicate an array
      // });

      const response = await fetch(
        `${Base_api}/api/incidentreport/save/${userid}`,
        {
          method: "POST",
          body: formData,
        }
      );

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
        toast.error("Error submitting form.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // incident_reported_by

  const [name, setName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [employeeData, setEmployeeData] = useState({
    id: "",
    email: "",
    phone: "",
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

  //from_user_data_show

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/incidentreport/view/${userid}`
        );
        const data = await response.json();
        ({ data });
        setUsername(data.username);
        setCurrentUserEmail(data.email);
        setCurrentUserPhone(data.contactno);
        setDesignation(data.designation);
        setDepartment(data.department);
        setSubmitDate(data.submitdate);
        if (data) {
          setTempStatus(data.password);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  //from_user_data_show

  const handleInputChange = (e) => {
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
      phone: emp.contactno, // Use contactno for the phone number
    });
    setSuggestions([]); // Clear suggestions after selection
  };

  // Witness_Field
  const [nametwo, setNameTwo] = useState({ one: "", two: "", three: "" });
  const [suggestionstwo, setSuggestionsTwo] = useState({
    one: [],
    two: [],
    three: [],
  });
  const [selectedEmployees, setSelectedEmployees] = useState({
    one: { id: "", email: "", phone: "", designation: "" },
    two: { id: "", email: "", phone: "", designation: "" },
    three: { id: "", email: "", phone: "", designation: "" },
  });
  const [employeestwo, setEmployeesTwo] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          `${Base_api}/api/incidentreport/emplist/${userId}`
        );
        const data = await response.json();
        // Debugging line
        setEmployeesTwo(data);
        ({ employeestwo });
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployees();
  }, [userId]);

  const handleInputChangeTwo = (field) => (e) => {
    const inputValue = e.target.value;
    ({ field });
    setNameTwo((prev) => ({ ...prev, [field]: inputValue }));

    if (inputValue) {
      const filteredSuggestions = employeestwo.filter(
        (emp) =>
          emp.username &&
          emp.username.toLowerCase().includes(inputValue.toLowerCase())
      );

      setSuggestionsTwo((prev) => ({ ...prev, [field]: filteredSuggestions }));
    } else {
      setSuggestionsTwo((prev) => ({ ...prev, [field]: [] }));
    }
  };

  const handleSuggestionClickTwo = (field) => (emp) => {
    setNameTwo((prev) => ({ ...prev, [field]: emp.username }));
    setSelectedEmployees((prev) => ({
      ...prev,
      [field]: {
        id: emp.userid, // Ensure this is correctly set
        email: emp.email,
        phone: emp.contactno,
        designation: emp.designation,
      },
    }));
    setSuggestionsTwo((prev) => ({ ...prev, [field]: [] }));

    setWitnessPfIds([emp.userid]);
  };

  const tableRowClassName = "border border-black px-4 py-2";
  //current_date
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format to YYYY-MM-DD
    setCurrentDate(formattedDate);
  }, []);
  //current_date
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

  const handleInputChangeUnit = (e) => {
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

  const currentDate2 = new Date().toLocaleDateString();

  return (
    <div className="m-auto">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="p-5 bg-white rounded-xl shadow-[0_5px_10px_0px_gray] my-5 w-[900px]"
      >
        <AllFormsHeader
          divname="ICT Division"
          formname="INCIDENT REPORT FORM"
          dno="1006"
          vno="3.0"
          edate="08.10.2023"
          fpageno="1"
          lpageno="1"
          rdiv="ICTD"
          rformname="IRF"
        />
        <div>
          <table className="w-full text-sm font-[500] my-5">
            <tbody>
              <tr>
                <th className="w-1/12 border p-1 px-2 text-center border-black">
                  To
                </th>
                <td className="w-5/12 border p-1 px-2 text-left border-black">
                  Md. Mostafejur Rahman, FAVP & Head of Information Security
                </td>
                <th className="w-1/12 border p-1 px-2 text-center border-black">
                  <label htmlFor="from">From</label>
                </th>
                <td className="w-5/12 border p-1 px-2 text-left border-black ">
                  <div className="flex justify-center">
                    <label htmlFor="">
                      {username} - {designation} - {department}
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <th className="border p-1 px-2 text-center border-black">CC</th>
                <td className="border p-1 px-2 text-left border-black">
                  Md. Mushfiqur Rahaman, VP & HOD, ICTD
                </td>
                <th className="border p-1 px-2 text-center border-black">
                  <label htmlFor="tel">Tel</label>
                </th>
                <td className="border p-1 px-2 text-left border-black">
                  <div>{currentUserPhone}</div>
                </td>
              </tr>
              <tr>
                <th className="border p-1 px-2 text-center border-black">
                  <label htmlFor="dt">Date</label>
                </th>
                <td className="border p-1 px-2 text-left border-black">
                  <div>{currentDate2}</div>
                </td>
                <th className="border p-1 px-2 text-center border-black">
                  <label htmlFor="email">Email</label>
                </th>
                <td className="border p-1 px-2 text-left border-black">
                  <div>{currentUserEmail}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
          To be completed by respective Requestor
        </h4>
        <div>
          <table className="w-full">
            <tr>
              <th className="border  py-2 border-black">To</th>
              <td className="border  py-2 border-black ">
                Md. Mostafejur Rahman, FAVP & Head of Information Security
              </td>
              <th className="border  py-2 border-black">
                <label htmlFor="from">From</label>
              </th>
              <td className="border  py-2 border-black ">
                <div className="flex justify-center">
                  <Textarea
                    rows="1"
                    width="w-60"
                    placeholder="From"
                    id="from"
                    value={username}
                  />
                </div>
              </td>
            </tr>

            <tr>
              <th className="border  py-2 border-black">CC</th>
              <td className="border  py-2 border-black ">
                Md. Mushfiqur Rahaman, VP & HOD, ICTD
              </td>
              <th className="border  py-2 border-black">
                <label htmlFor="tel">Tel</label>
              </th>
              <td className="border  py-2 border-black ">
                <div className="flex justify-center">
                  <Textarea
                    rows="1"
                    width="w-60"
                    placeholder="tel"
                    id="tel"
                    value={contactno}
                    //   margin_left="ml-10"
                  />
                </div>
              </td>
            </tr>

            <tr>
              <th className="border  py-2 border-black">
                <label htmlFor="dt">Date</label>
              </th>
              <td className="border  p-2 border-black text-center">
                <div className="flex ">
                  <input
                    type="date"
                    className="text-[#514f4f] border-[1px] border-black  p-1    rounded-sm font-semibold placeholder-gray-300 focus:outline-[#007935]"
                    id="dt"
                    value={currentDate} // Bind the value to currentDate
                    onChange={(e) => setCurrentDate(e.target.value)} // Update state on change
                    readOnly
                  />
                </div>
              </td>
              <th className="border  py-2 border-black">
                <label htmlFor="email">Email</label>
              </th>
              <td className="border  py-2 border-black ">
                <div className="flex justify-center">
                  <input
                    type="email"
                    id="email"
                    className="text-[#514f4f] border-[1px] border-black w-60  p-1    rounded-sm font-semibold placeholder-gray-300 focus:outline-[#007935]"
                    placeholder="Email"
                    value={email}
                  />
                </div>
              </td>
            </tr>
          </table>
        </div> */}

        <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
          To be completed by respective Requestor
        </h4>
        <div className="my-5">
          <table className="w-full text-sm font-[500]">
            <tr>
              <th className="border py-2 border-black">Priority</th>
              <td className="border py-2 border-black text-center">
                <input
                  type="radio"
                  id="High"
                  name="priority"
                  value="High"
                  checked={priority === "High"}
                  onChange={(e) => setPriority(e.target.value)}
                />
                <label htmlFor="High" className="pl-1">
                  High
                </label>
              </td>
              <td className="border py-2 border-black text-center">
                <input
                  type="radio"
                  id="Medium"
                  name="priority"
                  value="Medium"
                  checked={priority === "Medium"}
                  onChange={(e) => setPriority(e.target.value)}
                />
                <label htmlFor="Medium" className="pl-1">
                  Medium
                </label>
              </td>
              <td className="border py-2 border-black text-center">
                <input
                  type="radio"
                  id="Low"
                  name="priority"
                  value="Low"
                  checked={priority === "Low"}
                  onChange={(e) => setPriority(e.target.value)}
                />
                <label htmlFor="Low" className="pl-1">
                  Low
                </label>
              </td>
            </tr>
          </table>
        </div>

        {/* Incident Reported By */}
        {/* <div className="my-5">
          <table className="relative w-full">
            <tbody>
              <tr>
                <th className="border border-black p-5 text-center" colSpan="8">
                  <h4 className="text-center font-bold bg-gray-300 p-1 rounded-md ">
                    Incident Reported By
                  </h4>
                </th>
              </tr>
              <tr>
                <td className="p-1 border border-black">Name: </td>
                <td className="p-1 border border-black relative">
                  <input
                    type="text"
                    placeholder="Search by username"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {searchTerm && filteredUsers.length > 0 && (
                    <div className="absolute left-0 right-0 bg-white shadow-lg h-52 overflow-auto">
                      {filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          onClick={() => handleUserClick(user)}
                          className="p-2 hover:bg-blue-100 cursor-pointer rounded-md transition-colors"
                        >
                          {user.username} (ID: {user.userid})
                        </div>
                      ))}
                    </div>
                  )}
                </td>
                <td className="p-1 border border-black">Employee Id: </td>
                <td className="p-1 border border-black">
                  {userData
                    ? userData.userid
                    : incidentReportedBy
                    ? incidentReportedBy
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td className="p-1 border border-black">Email:</td>
                <td className="p-1 border border-black">
                  {userData ? userData.email : email ? email : "N/A"}
                </td>
                <td className="p-1 border border-black">Phone: </td>
                <td className="p-1 border border-black">
                  {userData
                    ? userData.contactno
                    : contactno
                    ? contactno
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td colSpan={1} className="p-1 border border-black">
                  Incident Handled By
                </td>
                <td colSpan={3} className="p-1 border border-black">
                  <input
                    type="text"
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={incidentHandledBy}
                    onChange={(e) => setIncidentHandledBy(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}

        <div className="my-5">
          <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
            Particulars of Incident
          </h4>

          <div>
            <table className="w-full text-sm font-[500]">
              <tr>
                <th className="border py-2 border-black">Incident Occurred</th>
                <td className="border py-2 border-black text-center">
                  <label htmlFor="occurred_date">Date</label>
                </td>
                <td className="border py-2 border-black text-center">
                  <input
                    type="date"
                    id="occurred_date"
                    name="occurred_date"
                    onChange={(e) => setOccurredDate(e.target.value)}
                    className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out  text-sm placeholder-opacity-100"
                    required
                  />

                  {/* <input
                    type="text"
                    value={occurredTime}
                    readOnly
                    onClick={() => setShowClock(true)} // Show clock on click
                    className="border p-1 rounded-md"
                    placeholder="Select Time"
                  />
                  {showClock && <TimePicker onChange={handleTimeChange} />} */}
                </td>
                <td className="border py-2 border-black text-center">
                  <label htmlFor="occurred_time">Time</label>
                </td>
                <td className="border py-2 border-black text-center">
                  <input
                    type="time"
                    step="1"
                    id="occurred_time"
                    name="occurred_time"
                    onChange={(e) => setOccurredTime(e.target.value)}
                    className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out  text-sm placeholder-opacity-100"
                    required
                  />
                </td>
              </tr>

              <tr>
                <th className="border py-2 border-black">Incident Resolved</th>
                <td className="border py-2 border-black text-center">
                  <label htmlFor="resolved_date">Date</label>
                </td>
                <td className="border py-2 border-black text-center">
                  <input
                    type="date"
                    id="resolved_date"
                    name="resolved_date"
                    onChange={(e) => setResolvedDate(e.target.value)}
                    className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out  text-sm placeholder-opacity-100"
                    required
                  />
                </td>
                <td className="border py-2 border-black text-center">
                  <label htmlFor="resolved_time">Time</label>
                </td>
                <td className="border py-2 border-black text-center">
                  <input
                    type="time"
                    step="1"
                    id="resolved_time"
                    name="resolved_time"
                    onChange={(e) => setResolvedTime(e.target.value)}
                    className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out  text-sm placeholder-opacity-100"
                    required
                  />
                  {/* <ResolvedTime /> */}
                </td>
              </tr>
              <tr>
                <td className="border py-2 border-black text-center">
                  <strong>Location of Incident</strong>
                </td>
                <td className="border py-2 border-black p-2" colSpan={4}>
                  <input
                    type="text"
                    className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                    placeholder="Location Of Incident"
                    value={locationOfIncident}
                    onChange={(e) => setLocationOfIncident(e.target.value)}
                  />
                </td>
              </tr>
            </table>
          </div>

          {/* incident_reported_by */}
          <div className="relative mt-5">
            <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md my-5">
              Incident Reported By
            </h4>
            <table className="w-full text-sm font-[500]">
              <tbody>
                <tr>
                  <th className="border border-black py-2">
                    <label htmlFor="reported_by_name">Name</label>
                  </th>
                  <td className="border border-black text-center p-2 relative">
                    <input
                      type="text"
                      id="reported_by_name"
                      value={name || ""}
                      onChange={handleInputChange}
                      className="text-[#3b3838] w-full border-[1px] border-black text-sm p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100"
                      placeholder="Search Name"
                      autoComplete="off"
                      required
                    />
                    {suggestions.length > 0 && (
                      <ul className="absolute w-72 mx-1 box-border bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                        {suggestions.map((emp) => (
                          <li
                            key={emp.id}
                            onClick={() => handleSuggestionClick(emp)}
                            className="py-1 hover:bg-gray-100 cursor-pointer text-sm font-[500]"
                          >
                            {emp.username}-{emp.userid}
                            {/* Show username from API */}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <th className="border border-black py-2">
                    <label htmlFor="reported_by_id">Employee ID</label>
                  </th>
                  <td className="border border-black text-center p-2">
                    <input
                      type="text"
                      id="reported_by_id"
                      value={employeeData.id}
                      className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                      placeholder="ID"
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <th className="border border-black py-2">
                    <label htmlFor="reported_by_email">Email</label>
                  </th>
                  <td className="border border-black text-center p-2">
                    <input
                      type="email"
                      id="reported_by_email"
                      value={employeeData.email}
                      className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                      placeholder="Email"
                      readOnly
                    />
                  </td>
                  <th className="border border-black py-2">
                    <label htmlFor="reported_by_number">Phone Number</label>
                  </th>
                  <td className="border border-black text-center p-2">
                    <input
                      type="text"
                      id="reported_by_number"
                      value={employeeData.phone}
                      className="text-[#3b3838] border-[1px] border-black p-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out w-full text-sm placeholder-opacity-100"
                      placeholder="Number"
                      readOnly
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <HandleBy
              setHandleByUserId={setHandleByUserId}
              handleByUserId={handleByUserId}
            />
          </div>
          <div className="my-5">
            {/* <WitnessTableSubmit handleWitnessChange={handleWitnessChange} /> */}
            <Witness
              handleWitness={handleWitness}
              setHandleWitness={setHandleWitness}
            />
          </div>

          {/* witness */}
          {/* <div className="my-5">
            <table className="w-full">
              <tbody>
                <tr>
                  <th
                    className="border border-black py-2 text-center"
                    colSpan="8"
                  >
                    Witness
                  </th>
                </tr>

                {[1, 2, 3].map((num) => {
                  const field = num === 1 ? "one" : num === 2 ? "two" : "three";
                  return (
                    <tr key={num}>
                      <th className="border border-black py-2">
                        <label htmlFor={`witness_name_${num}`} className="px-2">
                          Name
                        </label>
                      </th>
                      <td className="border border-black text-center p-2 relative">
                        <textarea
                          rows="2"
                          cols="30"
                          type="text"
                          id={`witness_name_${num}`}
                          value={nametwo[field]}
                          onChange={handleInputChangeTwo(field)}
                          className="text-[#514f4f] border-[1px] border-black p-1 w-3/4 rounded-sm font-semibold placeholder-gray-300 focus:outline-[#007935]"
                          placeholder="Name"
                        />
                        {suggestionstwo[field] &&
                          suggestionstwo[field].length > 0 && (
                            <ul className="absolute bg-white border border-[#d2d2e4] mt-1 z-10 w-3/4">
                              {suggestionstwo[field].map((emp) => (
                                <li
                                  key={emp.id}
                                  onClick={() =>
                                    handleSuggestionClickTwo(field)(emp)
                                  }
                                  className="p-2 hover:bg-gray-200 cursor-pointer"
                                >
                                  {emp.username}
                                </li>
                              ))}
                            </ul>
                          )}
                      </td>
                      <th className="border border-black py-2">
                        <label
                          htmlFor={`witness_pf_id_${num}`}
                          className="px-2"
                        >
                          PF ID
                        </label>
                      </th>
                      <td className="border border-black text-center py-2">
                        <input
                          type="text"
                          id={`witness_pf_id_${num}`}
                          value={selectedEmployees[field].id} // Use 'id' for PF ID
                          className="text-[#514f4f] border-[1px] border-black p-1 w-3/4 rounded-sm font-semibold placeholder-gray-300 focus:outline-[#007935]"
                          placeholder="PF-ID"
                          readOnly
                        />
                      </td>
                      <th className="border border-black py-2">
                        <label
                          htmlFor={`witness_desig_${num}`}
                          className="px-2"
                        >
                          Designation
                        </label>
                      </th>
                      <td className="border border-black text-center py-2">
                        <input
                          type="text"
                          id={`witness_desig_${num}`}
                          value={selectedEmployees[field].designation}
                          className="text-[#514f4f] border-[1px] border-black p-1 w-3/4 rounded-sm font-semibold placeholder-gray-300 focus:outline-[#007935]"
                          placeholder="Designation"
                          readOnly
                        />
                      </td>

                      <th className="border border-black py-2">
                        <label htmlFor={`witness_phn_${num}`} className="px-2">
                          Phone
                        </label>
                      </th>
                      <td className="border border-black text-center py-2">
                        <textarea
                          rows="1"
                          cols="40"
                          type="text"
                          id={`witness_phn_${num}`}
                          value={selectedEmployees[field].phone}
                          className="text-[#514f4f] border-[1px] border-black p-1 w-3/4 rounded-sm font-semibold placeholder-gray-300 focus:outline-[#007935]"
                          placeholder="Phone"
                          readOnly
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div> */}
          {/* witness_end */}
          <div>
            <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md mt-3 mb-5">
              Provide Information
            </h4>
            <div className="border border-black p-5">
              <TitlewithTextarea
                width="w-full"
                placeholder="Name of the Incident"
                title="Name of the Incident"
                titlebottom="mb-1"
                htmlFor="Name_of_the_Incident"
                id="Name_of_the_Incident"
                name="Name_of_the_Incident"
                margin_bottom="mb-3"
                onChange={(e) => setNameOfTheIncident(e.target.value)}
              />
              <TitlewithTextarea
                width="w-full"
                placeholder="Root cause of Incident"
                title="Root cause of Incident"
                titlebottom="mb-1"
                htmlFor="Root_cause_of_Incident"
                id="Root_cause_of_Incident"
                name="Root_cause_of_Incident"
                margin_bottom="mb-3"
                onChange={(e) => setRootCauseOfIncident(e.target.value)}
              />
            </div>
            <div className="my-5">
              <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md mt-5 mb-5">
                Type of Incident
              </h4>
              <div className="border border-black">
                <IncidentTypeCheckboxesSubmit
                  typeOfIncident={typeOfIncident}
                  setTypeOfIncident={setTypeOfIncident}
                />
              </div>
            </div>
            <div className="my-5">
              <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md mt-5 mb-5">
                Impact / Potential Impact
              </h4>
              <div className="border border-black">
                <ImpactPotentialImpactSubmit
                  potentialImpact={potentialImpact}
                  setPotentialImpact={setPotentialImpact}
                />
              </div>
            </div>
            <div className="border border-black p-5">
              <TitlewithTextarea
                width="w-full"
                placeholder="Provide a brief description"
                title="Provide a brief description"
                titlebottom="mb-1"
                htmlFor="Provide_brief_description"
                id="Provide_brief_description"
                name="Provide_brief_description"
                margin_bottom="mb-3"
                onChange={(e) => setPotentialImpactDescription(e.target.value)}
              />

              <TitlewithTextarea
                width="w-full"
                strongtext="Action Taken: "
                placeholder="Provide a brief description"
                title="What Steps Have Been Taken So Far?"
                titlebottom="mb-1"
                htmlFor="Action_Taken"
                id="Action_Taken"
                name="Action_Taken"
                margin_bottom="mb-3"
                onChange={(e) => setActionTaken(e.target.value)}
              />

              <TitlewithTextarea
                width="w-full"
                strongtext="Prevention: "
                placeholder="Provide a brief description"
                title="What Action Has Been taken to prevent a reocurrence?"
                titlebottom="mb-1"
                htmlFor="Prevention"
                id="Prevention"
                name="Prevention"
                margin_bottom="mb-3"
                onChange={(e) => setPrevention(e.target.value)}
              />

              <TitlewithTextarea
                width="w-full"
                placeholder="Provide a brief description"
                title="Proposed solution for further occurrence"
                htmlFor="Provide_solution"
                id="Provide_solution"
                name="Provide_solution"
                titlebottom="mb-1"
                margin_bottom="mb-3"
                onChange={(e) => setProposedSolution(e.target.value)}
              />

              <TitlewithTextarea
                width="w-full"
                placeholder="Provide a brief description"
                title="Lesson Learned"
                htmlFor="learned"
                id="learned"
                name="learned"
                titlebottom="mb-1"
                onChange={(e) => setLessonLearned(e.target.value)}
              />
            </div>
          </div>

          {/* choose_file */}
          <div>
            <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md my-5">
              Attachment
            </h4>
            <table className="w-full text-sm font-[500]">
              <tr>
                <th className="border border-black py-2 w-1/2">
                  <label htmlFor="incidentHandlingDocuments">
                    Incident Handling Documents
                  </label>
                </th>

                <td className="border border-black py-2 text-center w-1/2">
                  {/* <input
                    type="file"
                    className="text-[#514f4f] border-[1px] border-black  p-1    rounded-sm font-semibold placeholder-gray-300 focus:outline-[#007935]"
                    id="incidentHandlingDocuments"
                    name="incidentHandlingDocuments"
                    onChange={handleFileChange}
                  /> */}
                  <div className="flex flex-col items-center gap-2 border border-slate-400 p-1">
                    <input
                      type="file"
                      id="incidentHandlingDocuments"
                      name="incidentHandlingDocuments"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />

                    <div className="w-42 p-1 flex items-center cursor-pointer text-xs rounded border font-[500] bg-slate-300 border-slate-300">
                      <label
                        htmlFor="incidentHandlingDocuments"
                        className="px-1"
                      >
                        Attachment
                      </label>
                      <label
                        htmlFor="incidentHandlingDocuments"
                        className="flex items-center cursor-pointer"
                      >
                        <FontAwesomeIcon
                          icon={faPaperclip}
                          className="w-3 h-3 cursor-pointer text-gray-600 -rotate-45"
                        />
                      </label>
                    </div>

                    {incidentHandlingDocumentsName.length > 0 && (
                      <ul className="flex flex-wrap gap-2 font-[500] text-sm">
                        <div className="flex items-center bg-[#cee6f7] p-1 rounded border border-slate-400">
                          <label className="text-xs">
                            {incidentHandlingDocumentsName}
                          </label>

                          <FontAwesomeIcon
                            onClick={() =>
                              removeFile("incidentHandlingDocuments")
                            }
                            icon={faXmark}
                            className="m-1 p-[1px] w-3 h-3 rounded cursor-pointer bg-red-400 "
                          />
                        </div>
                      </ul>
                    )}
                  </div>
                </td>
              </tr>

              <tr>
                <th className="border border-black py-2">
                  <label htmlFor="impactAnalysisDocument">
                    Impact Analysis Document
                  </label>
                </th>

                <td className="border border-black py-2 text-center">
                  {/* <input
                    type="file"
                    className="text-[#514f4f] border-[1px] border-black  p-1    rounded-sm font-semibold placeholder-gray-300 focus:outline-[#007935]"
                    id="impactAnalysisDocument"
                    name="impactAnalysisDocument"
                    onChange={handleFileChange}
                  /> */}
                  <div className="flex flex-col items-center gap-2 border border-slate-400 p-1">
                    <input
                      type="file"
                      id="impactAnalysisDocument"
                      name="impactAnalysisDocument"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />

                    <div className="w-42 p-1 flex items-center cursor-pointer text-xs rounded border font-[500] bg-slate-300 border-slate-300">
                      <label htmlFor="impactAnalysisDocument" className="px-1">
                        Attachment
                      </label>
                      <label
                        htmlFor="impactAnalysisDocument"
                        className="flex items-center cursor-pointer"
                      >
                        <FontAwesomeIcon
                          icon={faPaperclip}
                          className="w-3 h-3 cursor-pointer text-gray-600 -rotate-45"
                        />
                      </label>
                    </div>

                    {impactAnalysisDocumentName.length > 0 && (
                      <ul className="flex flex-wrap gap-2 font-[500] text-sm">
                        <div className="flex items-center bg-[#cee6f7] p-1 rounded border border-slate-400">
                          <label className="text-xs">
                            {impactAnalysisDocumentName}
                          </label>

                          <FontAwesomeIcon
                            onClick={() => removeFile("impactAnalysisDocument")}
                            icon={faXmark}
                            className="m-1 p-[1px] w-3 h-3 rounded cursor-pointer bg-red-400 "
                          />
                        </div>
                      </ul>
                    )}
                  </div>
                </td>
              </tr>

              <tr>
                <th className="border border-black py-2">
                  <label htmlFor="downtimeDocumentation">
                    Downtime Documentation
                  </label>
                </th>

                <td className="border border-black py-2 text-center">
                  {/* <input
                    type="file"
                    className="text-[#514f4f] border-[1px] border-black  p-1    rounded-sm font-semibold placeholder-gray-300 focus:outline-[#007935]"
                    id="downtimeDocumentation"
                    name="downtimeDocumentation"
                    onChange={handleFileChange}
                  /> */}
                  <div className="flex flex-col items-center gap-2 border border-slate-400 p-1">
                    <input
                      type="file"
                      id="downtimeDocumentation"
                      name="downtimeDocumentation"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />

                    <div className="w-42 p-1 flex items-center cursor-pointer text-xs rounded border font-[500] bg-slate-300 border-slate-300">
                      <label htmlFor="downtimeDocumentation" className="px-1">
                        Attachment
                      </label>
                      <label
                        htmlFor="downtimeDocumentation"
                        className="flex items-center cursor-pointer"
                      >
                        <FontAwesomeIcon
                          icon={faPaperclip}
                          className="w-3 h-3 cursor-pointer text-gray-600 -rotate-45"
                        />
                      </label>
                    </div>

                    {downtimeDocumentationName.length > 0 && (
                      <ul className="flex flex-wrap gap-2 font-[500] text-sm">
                        <div className="flex items-center bg-[#cee6f7] p-1 rounded border border-slate-400">
                          <label className="text-xs">
                            {downtimeDocumentationName}
                          </label>

                          <FontAwesomeIcon
                            onClick={() => removeFile("downtimeDocumentation")}
                            icon={faXmark}
                            className="m-1 p-[1px] w-3 h-3 rounded cursor-pointer bg-red-400 "
                          />
                        </div>
                      </ul>
                    )}
                  </div>
                </td>
              </tr>

              <tr>
                <th className="border border-black py-2">
                  {" "}
                  <label htmlFor="rootCauseAnalysisDocuments">
                    Root Cause Analysis Documents
                  </label>
                </th>

                <td className="border border-black py-2 text-center">
                  {/* <input
                    type="file"
                    className="text-[#514f4f] border-[1px] border-black  p-1    rounded-sm font-semibold placeholder-gray-300 focus:outline-[#007935]"
                    id="rootCauseAnalysisDocuments"
                    name="rootCauseAnalysisDocuments"
                    onChange={handleFileChange}
                  /> */}
                  <div className="flex flex-col items-center gap-2 border border-slate-400 p-1">
                    <input
                      type="file"
                      id="rootCauseAnalysisDocuments"
                      name="rootCauseAnalysisDocuments"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />

                    <div className="w-42 p-1 flex items-center cursor-pointer text-xs rounded border font-[500] bg-slate-300 border-slate-300">
                      <label
                        htmlFor="rootCauseAnalysisDocuments"
                        className="px-1"
                      >
                        Attachment
                      </label>
                      <label
                        htmlFor="rootCauseAnalysisDocuments"
                        className="flex items-center cursor-pointer"
                      >
                        <FontAwesomeIcon
                          icon={faPaperclip}
                          className="w-3 h-3 cursor-pointer text-gray-600 -rotate-45"
                        />
                      </label>
                    </div>

                    {downtimeDocumentationName.length > 0 && (
                      <ul className="flex flex-wrap gap-2 font-[500] text-sm">
                        <div className="flex items-center bg-[#cee6f7] p-1 rounded border border-slate-400">
                          <label className="text-xs">
                            {downtimeDocumentationName}
                          </label>

                          <FontAwesomeIcon
                            onClick={() => removeFile("downtimeDocumentation")}
                            icon={faXmark}
                            className="m-1 p-[1px] w-3 h-3 rounded cursor-pointer bg-red-400 "
                          />
                        </div>
                      </ul>
                    )}
                  </div>
                </td>
              </tr>

              <tr>
                <th className="border border-black py-2">
                  {" "}
                  <label htmlFor="workCompletionDocument">
                    Work completion document
                  </label>
                </th>

                <td className="border border-black py-2 text-center">
                  {/* <input
                    type="file"
                    className="text-[#514f4f] border-[1px] border-black  p-1    rounded-sm font-semibold placeholder-gray-300 focus:outline-[#007935]"
                    id="workCompletionDocument"
                    name="workCompletionDocument"
                    onChange={handleFileChange}
                  /> */}
                  <div className="flex flex-col items-center gap-2 border border-slate-400 p-1">
                    <input
                      type="file"
                      id="workCompletionDocument"
                      name="workCompletionDocument"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />

                    <div className="w-42 p-1 flex items-center cursor-pointer text-xs rounded border font-[500] bg-slate-300 border-slate-300">
                      <label htmlFor="workCompletionDocument" className="px-1">
                        Attachment
                      </label>
                      <label
                        htmlFor="workCompletionDocument"
                        className="flex items-center cursor-pointer"
                      >
                        <FontAwesomeIcon
                          icon={faPaperclip}
                          className="w-3 h-3 cursor-pointer text-gray-600 -rotate-45"
                        />
                      </label>
                    </div>

                    {workCompletionDocumentName.length > 0 && (
                      <ul className="flex flex-wrap gap-2 font-[500] text-sm">
                        <div className="flex items-center bg-[#cee6f7] p-1 rounded border border-slate-400">
                          <label className="text-xs">
                            {workCompletionDocumentName}
                          </label>

                          <FontAwesomeIcon
                            onClick={() => removeFile("workCompletionDocument")}
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

        {/* <div className="my-5">
          <table className="w-full">
            <tr>
              <th className="border border-black py-2 text-center">
                Type of Incident
              </th>

              <th className="border border-black py-2 text-center">
                Impact / Potential Impact
              </th>
            </tr>

            <tr>
              <td className="border border-black w-1/2 align-top">
                <IncidentTypeCheckboxesSubmit
                  typeOfIncident={typeOfIncident}
                  setTypeOfIncident={setTypeOfIncident}
                />
              </td>

              <td className="border border-black w-1/2 align-top">
                <ImpactPotentialImpactSubmit
                  potentialImpact={potentialImpact}
                  setPotentialImpact={setPotentialImpact}
                />
              </td>
            </tr>
          </table>
        </div> */}
        {/* Incident Verified By */}

        <div>
          <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md my-5">
            Incident Verified By
          </h4>

          <table className="w-full text-sm ">
            <tbody>
              <tr>
                <td
                  className={`${tableRowClassName} text-center w-3/5`}
                  colSpan={2}
                >
                  <div className="relative">
                    <input
                      autoComplete="off"
                      type="text"
                      id="search-input"
                      name="search"
                      className="text-[#3b3838] w-full border-[1px] border-black text-sm p-1 m-1 rounded-md font-semibold placeholder-gray-300 focus:outline-none focus:border-green-700 shadow-md transition duration-200 ease-in-out placeholder-opacity-100 text-center"
                      placeholder="Search Here!"
                      value={searchTerm}
                      onChange={handleInputChangeUnit}
                      required
                    />
                    {showOptions && (
                      <ul className="absolute ml-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                        {filteredOptions.map((item) => (
                          <li
                            key={item.id}
                            className="py-1 hover:bg-gray-100 cursor-pointer text-sm font-[500]"
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

              <tr>
                <td className={`${tableRowClassName} text-center w-1/2`}>
                  Status : <strong>{tempStatus}</strong>
                </td>
                <td className={`${tableRowClassName} text-center w-1/2`}>
                  Comment:
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* To Be Completed By Admin */}
        <div>
          <h4 className="text-center text-sm font-bold bg-gray-300 p-1 rounded-md my-5">
            To be completed by Admin
          </h4>
          <div className="overflow-x-auto font-[600] text-[#1b3c1c] bg-slate-200/95">
            <table className="w-full text-sm  ">
              <thead>
                <tr>
                  <th className={`${tableRowClassName} w-1/2`}>
                    Recommended by Head of ISRM Unit/CISO
                  </th>
                  <th className={`${tableRowClassName} w-1/2`}>
                    Approval by HOICTD/CTO/CIO/CITO
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={`${tableRowClassName} text-center`}>
                    Md. Mostafejur Rahman
                  </td>
                  <td className={`${tableRowClassName} text-center`}>
                    Md. Mushfiqur Rahman
                  </td>
                </tr>

                <tr>
                  <td className={`${tableRowClassName} text-center`}>
                    Status : <strong>{tempStatus}</strong>
                  </td>
                  <td className={`${tableRowClassName} text-center`}>
                    Status : <strong>{tempStatus}</strong>
                  </td>
                </tr>
                <tr>
                  <td className={`${tableRowClassName} text-center`}>
                    Comment:
                  </td>
                  <td className={`${tableRowClassName} text-center`}>
                    Comment:
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center">
          <input
            className="bg-custom-gradient hover:bg-custom-gradient-hover mb-4 mt-2 text-center w-[150px] p-2 rounded-md text-white font-bold cursor-pointer transition-all duration-300"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default Irf;
